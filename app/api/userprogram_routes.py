from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Program, Task, UserTask, UserProgram, db

userprogram_routes = Blueprint('userprograms', __name__)


@userprogram_routes.route('/current')
def sample () :
    return "sample userprogs"
