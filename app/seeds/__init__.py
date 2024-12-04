from flask.cli import AppGroup
from .users import seed_users, undo_users
from .user_programs import seed_user_programs, undo_user_programs
from .user_tasks import seed_user_tasks, undo_user_tasks
from .tasks import undo_tasks, seed_tasks
from .programs import seed_programs, undo_programs
from .badges import seed_badges, undo_badges
from .user_badges import seed_user_badges, undo_user_badges

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_user_programs()
        undo_user_tasks()
        undo_user_badges()
        undo_tasks()
        undo_badges()
        undo_programs()
        undo_users()

    seed_users()
    seed_programs()
    seed_badges()
    seed_tasks()
    seed_user_badges()
    seed_user_tasks()
    seed_user_programs()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_user_programs()
    undo_user_tasks()
    undo_user_badges()
    undo_tasks()
    undo_badges()
    undo_programs()
    undo_users()
    # Add other undo functions here
