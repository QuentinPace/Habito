<<<<<<< HEAD
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Program, Task, UserTask, UserProgram, db

=======
from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
from app.models import User, Program, Task, UserTask, UserProgram, db

from .userprogram_routes import addProgramToCurrent

>>>>>>> dev
program_routes = Blueprint('programs', __name__)


@program_routes.route('/', methods=["POST"])
<<<<<<< HEAD
def postProgram () :
    print("------------in post program route---------------")
    return "sample"
=======
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
        ## connecting the newly created program and tasks to the current users usertasks and user programs

        # new_user_program = UserProgram(user_id=current_user.id, program_id=new_program_from_db["id"], days_left=new_program_from_db["total_days"])

        # db.session.add(new_user_program)
        # db.session.commit()


        # new_tasks_from_db = Task.query.filter(Task.program_id == new_program_from_db["id"]).all()

        # user_task_list = [UserTask(user_id=current_user.id, task_id=db_task.id, is_completed=False) for db_task in new_tasks_from_db]

        # db.session.add_all(user_task_list)
        # db.session.commit()
        addProgramToCurrent(new_program_from_db["id"])

    return programDetails(new_program_from_db["id"])



@program_routes.route("/<int:programId>")
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
>>>>>>> dev
