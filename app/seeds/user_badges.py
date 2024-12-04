from app.models import db, UserBadge, environment, SCHEMA
from sqlalchemy.sql import text


def seed_user_badges():
    db.session.add_all([
        UserBadge(
            user_id=1,
            badge_id=1
            ),
        UserBadge(
            user_id=1,
            badge_id=2
            ),
        UserBadge(
            user_id=1,
            badge_id=3
            ),
        UserBadge(
            user_id=1,
            badge_id=4
            ),
        UserBadge(
            user_id=1,
            badge_id=5
            ),
        UserBadge(
            user_id=1,
            badge_id=6
            ),
        UserBadge(
            user_id=1,
            badge_id=7
            ),
        UserBadge(
            user_id=1,
            badge_id=8
            ),
        UserBadge(
            user_id=1,
            badge_id=9
            ),
        UserBadge(
            user_id=2,
            badge_id=1
            ),
        UserBadge(
            user_id=2,
            badge_id=7
            ),
        UserBadge(
            user_id=3,
            badge_id=1
            )
    ])
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_badges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_badges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_badges"))
        
    db.session.commit()