from .db import SCHEMA, add_prefix_for_prod, db, environment
from sqlalchemy.sql import func

class UserTask(db.Model):
    __tablename__ = "user_tasks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasks.id'), ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"))
    is_completed = db.Column(db.Boolean, nullable=False, default=False)
    

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.current_timestamp(), nullable=False)