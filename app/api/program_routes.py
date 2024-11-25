from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
from app.models import User, Program, Task, UserTask, UserProgram, db

from .userprogram_routes import addProgramToCurrent

program_routes = Blueprint('programs', __name__)


@program_routes.route("/<int:programId>/tasks/<int:taskId>", methods=["DELETE"])
@login_required
def deleteTaskFromProgram(programId, taskId):

    target_program = Program.query.get(programId)

    if not target_program:
        return make_response(jsonify({"message": "Program couldn't be found"}), 404, {"Content-Type": "application/json"})
    # elif target_program.creator_id != current_user.id:
    #     return make_response(jsonify({"message": "Authorization required"}), 401, {"Content-Type": "application/json"})

    target_task = Task.query.get(taskId)

    if not target_task:
        return make_response(jsonify({"message": "Task couldn't be found"}), 404, {"Content-Type": "application/json"})

    user_tasks = UserTask.query.filter(UserTask.task_id == target_task.id).all()

    for user_task in user_tasks:
        db.session.delete(user_task)

    db.session.delete(target_task)
    db.session.commit()
        
    return make_response(jsonify({"message": "succesfully deleted"}), 200, {"Content-Type": "application/json"})



@program_routes.route("/<int:programId>/tasks", methods=["POST"])
@login_required
def addTaskToProgram(programId):

    target_program = Program.query.get(programId)

    if not target_program:
        return make_response(jsonify({"message": "Program couldn't be found"}), 404, {"Content-Type": "application/json"})
    elif target_program.creator_id != current_user.id:
        return make_response(jsonify({"message": "Authorization required"}), 401, {"Content-Type": "application/json"})

    new_task = Task(program_id=target_program.id, name=request.json["name"])
    db.session.add(new_task)
    db.session.commit()

    enrolled_user_ids = [ user_id for (user_id,) in UserProgram.query.with_entities(UserProgram.user_id).filter(UserProgram.program_id == programId).all()]

    for user_id in enrolled_user_ids:
        new_user_task = UserTask(is_completed=False, user_id=user_id, task_id=new_task.id)
        db.session.add(new_user_task)

    db.session.commit()
        

    return make_response(jsonify(new_task.to_dict_basic()), 200, {"Content-Type": "application/json"})



@program_routes.route('/', methods=["POST"])
@login_required
def postProgram () :
    print("------------in post program route---------------")
    data = request.json

    new_program = Program(
        name=data["name"],
        description=data["description"],
        total_days=data["total_days"],
        creator_id=current_user.id
    )
    db.session.add(new_program)
    db.session.commit()

    new_program_from_db = (Program.query
    .filter(Program.name == data["name"],
            Program.description == data["description"],
            Program.total_days == data["total_days"],
            Program.creator_id == current_user.id)
    .order_by(Program.id.desc())
    .first()
    ).to_dict_basic()

    task_list = [Task(name=task["name"], program_id=new_program_from_db["id"]) for task in list(data["tasks"])] # creating a list of Task instances from request body

    db.session.add_all(task_list)
    db.session.commit()

    ## at this point it created the program and tasks in the programs table and the tasks table

    if data["enroll"]:

        addProgramToCurrent(new_program_from_db["id"])

    return programDetails(new_program_from_db["id"])



@program_routes.route('/<int:programId>', methods=["PATCH"])
@login_required
def editProgram (programId) :
    data = request.json

    target_program = Program.query.get(programId)

    if not target_program:
        return make_response(jsonify({"message": "Program couldn't be found"}), 404, {"Content-Type": "application/json"})
    elif target_program.creator_id != current_user.id:
        return make_response(jsonify({"message": "Authorization required"}), 401, {"Content-Type": "application/json"})

    for key in data: # no validation yet
        if key == "name":
            target_program.name = data["name"]
        elif key == "description":
            target_program.description = data["description"]
        elif key == "total_days":
            target_program.total_days = data["total_days"]
    db.session.commit()

    return make_response(jsonify({"message": "successfully updated"}), 200, {"Content-Type": "application/json"})


@program_routes.route("/<int:programId>", methods=["GET"])
@login_required
def programDetails(programId) :
    target_program = Program.query.get(programId)

    ## conditionals if not found here
    if not target_program: 
        return make_response(jsonify({"message": "Program couldn't be found"}), 404, {"Content-Type": "application/json"})

    final_body = target_program.to_dict_basic()
    db_tasks = Task.query.filter(Task.program_id == target_program.id).all()

    final_body["tasks"] = [task.to_dict_basic() for task in db_tasks]

    target_user_program = UserProgram.query.filter(UserProgram.program_id == target_program.id, UserProgram.user_id == current_user.id).first()
    
    if target_user_program:
        final_body["is_enrolled"] = True
        final_body["days_left"] = target_user_program.days_left
    else:
        final_body["is_enrolled"] = False


    return make_response(jsonify(final_body), 200, {"Content-Type": "application/json"})




