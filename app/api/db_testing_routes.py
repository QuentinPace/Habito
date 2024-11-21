from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Program, Task, UserTask, UserProgram, db

db_routes = Blueprint('db', __name__)


@db_routes.route('/delete_program/<int:programId>')
def delete_program(programId):

    program_to_delete = Program.query.get(programId)
    db.session.delete(program_to_delete)
    print("----------------------------------")
    db.session.commit()
    return "successfull"

@db_routes.route('/delete_user_program/<int:userProgramId>')
@login_required
def delete_user_program(userProgramId):
    pass


# @db_routes.route('/delete_user/<int:userId>')
# @login_required
# def delete_user(userId):
    
#     user = User.query.get(id)
#     return user.to_dict()