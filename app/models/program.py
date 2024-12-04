from .db import SCHEMA, add_prefix_for_prod, db, environment
from sqlalchemy.sql import func

class Program(db.Model):
    __tablename__ = "programs"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    total_days = db.Column(db.Integer, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"))
    score = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.current_timestamp(), nullable=False)
    
    tasks = db.relationship("Task", backref="programs", cascade="all, delete-orphan")
    user_programs = db.relationship("UserProgram", backref="programs", cascade="all, delete-orphan")
    badges = db.relationship("Badge", backref="programs", cascade="all, delete-orphan", uselist=False)

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "score": self.score,
            "description": self.description,
            "total_days": self.total_days,
            "creator_id": self.creator_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
