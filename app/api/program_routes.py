from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Program, Task, UserTask, UserProgram, db

program_routes = Blueprint('programs', __name__)


@program_routes.route('/', methods=["POST"])
def postProgram () :
    print("------------in post program route---------------")
    return "sample"