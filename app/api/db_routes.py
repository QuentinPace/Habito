import os
from flask import Blueprint, jsonify, make_response
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

@db_routes.route(f"/{os.environ.get('DAILY_ROUTE_KEY')}")
def daily_db_update():

    all_tasks = db.session.query(UserTask, Task).join(Task, UserTask.task_id == Task.id).all() # noqa: E712
    failed_program_ids = []
    for (user_task, task) in all_tasks:
        if not user_task.is_completed:
            if (task.program_id, user_task.user_id) not in failed_program_ids: #pushing the failed programs into a list
                failed_program_ids.append((task.program_id, user_task.user_id))
        else:
            user_task.is_completed = False # marking the next days tasks as incomplete
        db.session.commit()

    for (program_id, user_id) in failed_program_ids: # deleting all the items from the database that corresponds with that failed program
        failed_program_from_db = UserProgram.query.filter(UserProgram.program_id == program_id, UserProgram.user_id == user_id).first()

        user_tasks_from_db = db.session.query(UserTask, Task).join(Task, UserTask.task_id == Task.id).filter(UserTask.user_id == user_id, Task.program_id == program_id).all()

        for (user_task, task) in user_tasks_from_db:
            db.session.delete(user_task)

        db.session.delete(failed_program_from_db)
        db.session.commit()

    
    completed_user_programs = UserProgram.query.all() # grabbing the rest of the user_programs
    finished_programs = []
    for user_program in completed_user_programs:
        if user_program.days_left == 0: # if its the last day of the program delete the program and corresponding items
            finished_programs.append(user_program.to_dict_basic())
            user_tasks_from_db = db.session.query(UserTask, Task).join(Task, UserTask.task_id == Task.id).filter(UserTask.user_id == user_program.user_id, Task.program_id == user_program.program_id).all()
            
            for (user_task, task) in user_tasks_from_db:
                db.session.delete(user_task)
            db.session.delete(user_program)
        else:
            user_program.days_left -= 1 # update the days_left to 1 less if every task is complete
        db.session.commit()

        
    

        
    return make_response(jsonify({
        "failed_programs":  "yuh",
        "completed_programs": finished_programs}), 200, {"Content-Type": "application/json"})


# @db_routes.route('/delete_user/<int:userId>')
# @login_required
# def delete_user(userId):
    
#     user = User.query.get(id)
#     return user.to_dict()