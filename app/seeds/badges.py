from app.models import db, Badge, environment, SCHEMA
from sqlalchemy.sql import text


def seed_badges():
    db.session.add_all([
        Badge(
            name="Iron Will",
            description="Completed 75 Strong.",
            icon_url="placeholder-for-aws",
            program_id=1
            ),
        Badge(
            name="Resilient Spirit",
            description="Completed 75 Soft.",
            icon_url="placeholder-for-aws",
            program_id=2
            ),
        Badge(
            name="Mindfull Mastery",
            description="Completed the 21 Day Mindfulness Challenge.",
            icon_url="placeholder-for-aws",
            program_id=3
            ),
        Badge(
            name="Creative Spark",
            description="Completed the 30 Day Creative Challenge.",
            icon_url="placeholder-for-aws",
            program_id=4
            ),
        Badge(
            name="Limber Legend",
            description="Completed the 14 Day Flexibility Challenge.",
            icon_url="placeholder-for-aws",
            program_id=5
            ),
        Badge(
            name="Body Breakthrough",
            description="Completed the 60 Day Fitness Transformation.",
            icon_url="placeholder-for-aws",
            program_id=6
            ),
        Badge(
            name="Storyteller",
            description="Completed the 30 Day Journaling Challenge.",
            icon_url="placeholder-for-aws",
            program_id=7
            ),
        Badge(
            name="Trailblazer",
            description="Complted the 10,000 Steps a Day Challenge.",
            icon_url="placeholder-for-aws",
            program_id=8
            ),
        Badge(
            name="Growth Seeker",
            description="Complted the 30 Day Self-Improvement Challenge.",
            icon_url="placeholder-for-aws",
            program_id=9
            )
        
    ])
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_badges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.badges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM badges"))
        
    db.session.commit()