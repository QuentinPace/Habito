from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Program, Task, UserTask, UserProgram, db

db_routes = Blueprint('db', __name__)


@db_routes.route('/delete_program/<int:programId>')
def delete_program(programId):
    print("-------------inside db test route-------------")

    programs_before = len(Program.query.all())
    tasks_before = len(Task.query.all())
    user_tasks_before = len(UserTask.query.all())
    user_programs_before = len(UserProgram.query.all())

    program_to_delete = Program.query.get(programId)
    db.session.delete(program_to_delete)
    db.session.commit()

    programs_after = len(Program.query.all())
    tasks_after = len(Task.query.all())
    user_tasks_after = len(UserTask.query.all())
    user_programs_after = len(UserProgram.query.all())

    return jsonify({
        "before": {
            "programs_before": programs_before,
            "tasks_before": tasks_before,
            "user_tasks_before": user_tasks_before,
            "user_programs_before": user_programs_before
        },
        "after": {
            "programs_after": programs_after,
            "tasks_after": tasks_after,
            "user_tasks_after": user_tasks_after,
            "user_programs_after": user_programs_after
        }
    })

@db_routes.route('/delete_user_program/<int:userProgramId>')
@login_required
def delete_user_program(userProgramId):
    pass


# @db_routes.route('/delete_user/<int:userId>')
# @login_required
# def delete_user(userId):
    
#     user = User.query.get(id)
#     return user.to_dict()