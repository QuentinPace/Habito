from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text



def seed_users():
    db.session.add_all([
        Task(name="One 45 minute workout outdoors", program_id=1),
        Task(name="Another 45 minute workout outdoors or indoors", program_id=1),
        Task(name="Drank a gallon of water", program_id=1),
        Task(name="Read 10 pages of a self-improvement or educational book", program_id=1),
        Task(name="Took a progress photo", program_id=1),
        Task(name="Followed a healthy, strict diet", program_id=1),

        Task(name="Followed a healthy diet (one cheat meal per week allowed)", program_id=2),
        Task(name="Completed a 30-minute workout", program_id=2),
        Task(name="Drank 3 liters of water", program_id=2),
        Task(name="Read 10 pages of a self-improvement or educational book", program_id=2),
        Task(name="Got 7-9 hours of sleep", program_id=2),

        Task(name="Completed a 15-minute daily meditation", program_id=3),
        Task(name="Wrote in a gratitude journal for 10 minutes", program_id=3),
        Task(name="Limited screen time to 2 hours for non-essential use", program_id=3),
        Task(name="Practiced mindfulness in daily activities (e.g., eating, walking)", program_id=3),
        Task(name="Spent 10 minutes reflecting on thoughts and emotions", program_id=3),

        Task(name="Created something new (e.g., drawing, writing, photography)", program_id=4),
        Task(name="Spent at least 30 minutes on a creative activity", program_id=4),
        Task(name="Tried a new creative technique or medium", program_id=4),
        Task(name="Wrote down ideas for future creative projects", program_id=4),
        Task(name="Reflected on the day's creative process in a journal", program_id=4),

        Task(name="Completed a 15-minute full-body stretch session", program_id=5),
        Task(name="Focused on deep stretches for flexibility improvement", program_id=5),
        Task(name="Held each stretch for 30 seconds or more", program_id=5),
        Task(name="Incorporated foam rolling or yoga poses", program_id=5),
        Task(name="Reflected on progress and mobility gains", program_id=5),

        Task(name="Completed a 45-minute workout (strength, cardio, or both)", program_id=6),
        Task(name="Followed a strict fitness-focused diet plan", program_id=6),
        Task(name="Incorporated both weight training and cardio into the routine", program_id=6),
        Task(name="Drank at least 2 liters of water", program_id=6),
        Task(name="Tracked fitness progress and performance improvements", program_id=6),

        Task(name="Wrote in a journal for at least 10 minutes", program_id=7),
        Task(name="Reflected on personal thoughts, goals, or emotions", program_id=7),
        Task(name="Used a journaling prompt or free writing", program_id=7),
        Task(name="Reviewed past entries to track progress", program_id=7),
        Task(name="Focused on gratitude and positive reflection", program_id=7),

        Task(name="Walked at least 10,000 steps", program_id=8),
        Task(name="Used a fitness tracker to monitor steps", program_id=8),
        Task(name="Incorporated walking into daily routine (e.g., walking to work, taking the stairs)", program_id=8),
        Task(name="Took breaks to stretch and walk throughout the day", program_id=8),

        Task(name="Set and accomplished a daily self-improvement goal", program_id=9),
        Task(name="Engaged in physical activity for at least 30 minutes", program_id=9),
        Task(name="Read or learned something new for 20 minutes", program_id=9),
        Task(name="Reflected on personal growth and progress", program_id=9),
        Task(name="Focused on building a positive, productive habit", program_id=9)

    ])
    

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()