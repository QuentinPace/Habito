from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
from app.models import User, Program, Task, UserTask, UserProgram, db

usertasks_routes = Blueprint('usertasks', __name__)


@usertasks_routes.route('/<int:userTaskId>', methods=["PATCH"])
@login_required
def updateUserTask (userTaskId) :
    print("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

    is_completed_str = request.args.get('is_completed', "true").strip()
    is_completed = False if is_completed_str != "true" else True

    user_task = UserTask.query.get(userTaskId)  # havent double checked also need to troubleshoot if update task is better usinhg task.id or user_task.id for route

    if user_task.user_id != current_user.id:
         return make_response(jsonify({"message": "Authorization required"}), 401, {"Content-Type": "application/json"})

    user_task.is_completed = is_completed

    db.session.commit()
    

    return make_response(jsonify({"usertaskId": userTaskId, "UserTask": user_task.to_dict_basic(), "query is_compled res": is_completed}), 200, {"Content-Type": "application/json"})