from app.models import db, UserTask, environment, SCHEMA
from sqlalchemy.sql import text


def seed_user_tasks():
    db.session.add_all([
        # user 1
        UserTask(user_id=1, task_id=1, is_completed=False),
        UserTask(user_id=1, task_id=2, is_completed=True),
        UserTask(user_id=1, task_id=3, is_completed=False),
        UserTask(user_id=1, task_id=4, is_completed=True),
        UserTask(user_id=1, task_id=5, is_completed=False),
        UserTask(user_id=1, task_id=6, is_completed=False),

        UserTask(user_id=1, task_id=12, is_completed=True),
        UserTask(user_id=1, task_id=13, is_completed=True),
        UserTask(user_id=1, task_id=14, is_completed=True),
        UserTask(user_id=1, task_id=15, is_completed=True),
        UserTask(user_id=1, task_id=16, is_completed=True),

        UserTask(user_id=1, task_id=27, is_completed=False),
        UserTask(user_id=1, task_id=28, is_completed=False),
        UserTask(user_id=1, task_id=29, is_completed=False),
        UserTask(user_id=1, task_id=30, is_completed=False),
        UserTask(user_id=1, task_id=31, is_completed=False),

        ## user 2
        UserTask(user_id=2, task_id=1, is_completed=False),
        UserTask(user_id=2, task_id=2, is_completed=False),
        UserTask(user_id=2, task_id=3, is_completed=True),
        UserTask(user_id=2, task_id=4, is_completed=True),
        UserTask(user_id=2, task_id=5, is_completed=False),
        UserTask(user_id=2, task_id=6, is_completed=False),

        UserTask(user_id=2, task_id=17, is_completed=True),
        UserTask(user_id=2, task_id=18, is_completed=False),
        UserTask(user_id=2, task_id=19, is_completed=False),
        UserTask(user_id=2, task_id=20, is_completed=True),
        UserTask(user_id=2, task_id=21, is_completed=True),

        # user 3
        UserTask(user_id=3, task_id=37, is_completed=True),
        UserTask(user_id=3, task_id=38, is_completed=True),
        UserTask(user_id=3, task_id=39, is_completed=True),
        UserTask(user_id=3, task_id=40, is_completed=False)

    ])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_tasks"))
        
    db.session.commit()