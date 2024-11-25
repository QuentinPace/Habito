from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
from app.models import User, Program, Task, UserTask, UserProgram, db

usertasks_routes = Blueprint('usertasks', __name__)


@usertasks_routes.route('/<int:userTaskId>', methods=["PATCH"])
@login_required
def updateUserTask (userTaskId) :

    is_completed_str = request.args.get('is_completed', "true").strip()
    is_completed = False if is_completed_str != "true" else True

    user_task = UserTask.query.get(userTaskId)

    if not user_task:
        return make_response(jsonify({"message": "UserTask couldn't be found"}), 404, {"Content-Type": "application/json"})

    if user_task.user_id != current_user.id:
         return make_response(jsonify({"message": "Authorization required"}), 401, {"Content-Type": "application/json"})

    user_task.is_completed = is_completed

    db.session.commit()

    return make_response(jsonify({"message": "Successfully updated"}), 200, {"Content-Type": "application/json"})