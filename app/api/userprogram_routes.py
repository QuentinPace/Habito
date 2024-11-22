from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Program, Task, UserTask, UserProgram, db

userprogram_routes = Blueprint('userprograms', __name__)


@userprogram_routes.route('/current')
def currentUsersPrograms () :
    # programs = Program.query(Program.name, UserProgram.user_id).join(Program.children).all()
    programs = (
        db.session.query(UserProgram, Program)
        .join(Program, UserProgram.program_id == Program.id)
        .filter(UserProgram.user_id == 1) # hardcoded userid (1) 
        .all()
    )# working but not formatted
    formatted_programs = [{
        "id": user_program.id,
        "program_id": program.id,
        "creator_id": program.creator_id,
        "name": program.name,
        "description": program.description,
        "total-days": program.total_days,
        "days_left": user_program.days_left,
        "tasks": [{
            "id": user_task.id,
            "name": task.name,
            "is_completed": user_task.is_completed
            } for (user_task, task) in db.session.query(UserTask, Task)
                                            .join(Task, UserTask.task_id == Task.id)
                                            .filter(UserTask.user_id == 1, Task.program_id == program.id) ## hardcoded user.id (1)
                                            .all()]
    } for (user_program, program) in programs]

    print(formatted_programs)
    print("--------------------------------------")
    return jsonify(formatted_programs)
    
