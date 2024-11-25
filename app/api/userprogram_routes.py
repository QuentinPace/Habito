from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
from app.models import User, Program, Task, UserTask, UserProgram, db

userprogram_routes = Blueprint('userprograms', __name__)


@userprogram_routes.route('/current')
@login_required
def currentUsersPrograms () :

    programs = (
        db.session.query(UserProgram, Program)
        .join(Program, UserProgram.program_id == Program.id)
        .filter(UserProgram.user_id == current_user.id)
        .all()
    )



    formatted_programs = [{
        "id": user_program.id,
        "program_id": program.id,
        "creator_id": program.creator_id,
        "name": program.name,
        "description": program.description,
        "total_days": program.total_days,
        "days_left": user_program.days_left,
        "tasks": [{
            "id": user_task.id,
            # maybe include task_id as well
            "name": task.name,
            "is_completed": user_task.is_completed
            } for (user_task, task) in db.session.query(UserTask, Task)
                                            .join(Task, UserTask.task_id == Task.id)
                                            .filter(UserTask.user_id == current_user.id, Task.program_id == program.id)
                                            .all()]
    } for (user_program, program) in programs]

    print(formatted_programs)
    print("--------------------------------------")
    return jsonify({"user_programs": formatted_programs})
    
    
@userprogram_routes.route('/<int:programId>/current', methods=["POST"])
@login_required
def addProgramToCurrent (programId) :

    program_from_db = Program.query.get(programId).to_dict_basic()

    if not program_from_db: 
        return make_response(jsonify({"message": "Program couldn't be found"}), 404, {"Content-Type": "application/json"})

    already_enrolled = UserProgram.query.filter(UserProgram.program_id == programId, UserProgram.user_id == current_user.id).first()

    if already_enrolled:
        return make_response(jsonify({"message": "Already enrolled"}), 409, {"Content-Type": "application/json"})

    new_user_program = UserProgram(user_id=current_user.id, program_id=program_from_db["id"], days_left=program_from_db["total_days"])
    db.session.add(new_user_program)
    db.session.commit()

    new_tasks_from_db = Task.query.filter(Task.program_id == program_from_db["id"]).all()
    user_task_list = [UserTask(user_id=current_user.id, task_id=db_task.id, is_completed=False) for db_task in new_tasks_from_db]
    db.session.add_all(user_task_list)
    db.session.commit()

    return make_response(jsonify({"message": "successfully created"}), 200, {"Content-Type": "application/json"})

@userprogram_routes.route('/<int:programId>/current', methods=["DELETE"])
@login_required
def addProgramToCurrent (programId) :
