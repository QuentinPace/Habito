from app.models import db, UserProgram, environment, SCHEMA
from sqlalchemy.sql import text



def seed_user_programs():

    db.session.add_all([
        UserProgram(user_id=1, program_id=1, days_left=34),
        UserProgram(user_id=1, program_id=3, days_left=19),
        UserProgram(user_id=1, program_id=6, days_left=4),

        UserProgram(user_id=2, program_id=1, days_left=61),
        UserProgram(user_id=2, program_id=4, days_left=15),
        
        UserProgram(user_id=3, program_id=8, days_left=6),
    ])

    db.session.commit()
    

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_programs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_programs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_programs"))
        
    db.session.commit()