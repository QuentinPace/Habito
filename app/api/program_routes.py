from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Program, Task, UserTask, UserProgram, db

program_routes = Blueprint('programs', __name__)


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
        ## connecting the newly created program and tasks to the current users usertasks and user programs

        new_user_program = UserProgram(user_id=current_user.id, program_id=new_program_from_db["id"], days_left=new_program_from_db["total_days"])

        db.session.add(new_user_program)
        db.session.commit()


        new_tasks_from_db = Task.query.filter(Task.program_id == new_program_from_db["id"]).all()

        user_task_list = [UserTask(user_id=current_user.id, task_id=db_task.id, is_completed=False) for db_task in new_tasks_from_db]

        db.session.add_all(user_task_list)
        db.session.commit()








    return jsonify(new_program_from_db)

