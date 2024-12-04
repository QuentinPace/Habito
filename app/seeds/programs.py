from app.models import db, Program, environment, SCHEMA
from sqlalchemy.sql import text


def seed_programs():
    db.session.add_all([
        Program(
        name="75 Hard",
        description="The 75 Hard Challenge is a rigorous 75-day mental toughness program designed to push individuals beyond their limits, emphasizing discipline, resilience, and self-control. Developed by entrepreneur Andy Frisella, the program consists of five daily non-negotiable tasks: complete two 45-minute workouts (one must be outdoors), drink a gallon of water, read 10 pages of a self-development book, follow a strict diet (no cheat meals or alcohol), and take a progress photo. The challenge isn’t about weight loss but cultivating mental grit and consistency. Missing even one task requires starting over from day one. Though demanding, 75 Hard is celebrated for fostering personal growth and transforming lives through its intense focus on accountability and perseverance.",
        total_days=75,
        score=5000
        ),

        Program(
        name="75 Soft",
        description="The 75 Soft Challenge is a more flexible version of the intense 75 Hard program, designed to build discipline and improve overall well-being without the extreme restrictions. The challenge lasts for 75 days and consists of five daily tasks aimed at improving physical and mental health. Participants must follow a healthy diet, though they are allowed one cheat meal per week. They must complete a 30-minute workout each day, drink at least 3 liters of water, read 10 pages of a self-improvement or educational book, and ensure they get 7-9 hours of sleep. The 75 Soft Challenge emphasizes consistency and balance rather than perfection, making it a more accessible option for those looking to build better habits without the all-or-nothing mentality of 75 Hard.",
        total_days=75,
        score=4000
        ),

        Program(
        name="21 Day Mindfulness Challenge",
        description="The 21 Day Mindfulness Challenge is designed to help individuals cultivate a more mindful and focused approach to daily life. Over the course of 21 days, participants engage in practices that promote mental clarity, reduce stress, and improve emotional well-being. The program includes daily meditation, gratitude journaling, limiting distractions, and practicing mindfulness throughout the day. Each day builds on the previous, helping participants establish a deeper connection with their thoughts and emotions. The challenge emphasizes reflection and presence over intense physical exertion, focusing on inner peace and mental clarity.",
        total_days=21,
        score=1500
        ),

        Program(
        name="30 Day Creative Challenge",
        description="The 30 Day Creative Challenge is designed to help individuals tap into their creative potential and develop a consistent creative practice. Over the course of 30 days, participants engage in different creative activities such as drawing, writing, photography, or any other form of artistic expression. The program encourages participants to step outside their comfort zones, try new things, and explore their creative limits. Each day, they focus on creating something new, fostering creativity, and building a creative habit that can continue beyond the challenge. It’s a great way to reconnect with one's artistic side and develop a personal outlet for self-expression.",
        total_days=30,
        creator_id=3,
        score=2000
        ),

        Program(
        name="14 Day Flexibility Challenge",
        description="The 14 Day Flexibility Challenge is designed to improve flexibility and mobility over the course of two weeks. This challenge focuses on stretching and movement exercises that target all major muscle groups. Participants commit to a daily routine of stretching exercises, which progressively increase in difficulty to help improve range of motion and reduce stiffness. The program is suitable for all fitness levels and is intended to help individuals feel more flexible, agile, and pain-free in their everyday activities.",
        total_days=14,
        score=1000
        ),

        Program(
        name="60 Day Fitness Transformation",
        description="The 60 Day Fitness Transformation is an intense physical challenge designed to push your limits and transform your body. Over the course of two months, participants follow a rigorous workout routine, combining strength training, cardio, and flexibility exercises. The challenge also includes strict nutritional guidelines, focusing on clean, whole foods to fuel the body and maximize results. With daily check-ins on progress and consistency, this challenge encourages perseverance and dedication to achieving physical transformation.",
        total_days=60,
        creator_id=1,
        score=3500
        ),

        Program(
        name="30 Day Journaling Challenge",
        description="The 30 Day Journaling Challenge encourages daily reflection and self-expression through writing. Participants are tasked with writing for at least 10 minutes every day, using prompts or free writing to reflect on their thoughts, goals, and emotions. The purpose of the challenge is to cultivate a habit of self-reflection and mindfulness, helping participants gain clarity, improve emotional health, and organize their thoughts. By the end of the 30 days, participants should have established a consistent journaling practice.",
        total_days=30,
        score=2000
        ),

        Program(
        name="10,000 Steps a Day Challenge",
        description="The 10,000 Steps a Day Challenge encourages participants to walk a minimum of 10,000 steps every day for 30 days. This challenge promotes overall physical activity and cardiovascular health while helping participants develop consistency in their fitness routine. Whether it’s through walking, hiking, or casual strolling, the goal is to integrate more movement into daily life, improve energy levels, and enhance physical fitness. Participants may use fitness trackers or mobile apps to track their steps and progress.",
        total_days=30,
        score=4000
        ),

        Program(
        name="30 Day Self-Improvement Challenge",
        description="The 30 Day Self-Improvement Challenge is focused on personal growth through consistent daily actions. Over the course of 30 days, participants work on improving themselves in various areas of life, including physical health, mental well-being, and personal productivity. The challenge involves setting small, achievable goals each day, such as reading, exercising, or learning a new skill. The purpose of this challenge is to develop a habit of self-improvement and create lasting positive change in personal habits and mindset.",
        total_days=30,
        score=2500
        )





        
    ])
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_programs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.programs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM programs"))
        
    db.session.commit()