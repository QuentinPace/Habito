from .db import SCHEMA, add_prefix_for_prod, db, environment
from sqlalchemy.sql import func

class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    

    id = db.Column(db.Integer, primary_key=True)
    program_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('programs.id'), ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(), nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.current_timestamp(), nullable=False)

    user_tasks = db.relationship("UserTask", backref="tasks", cascade="all, delete-orphan")

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "program_id": self.program_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }