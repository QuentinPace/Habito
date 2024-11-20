from .db import SCHEMA, add_prefix_for_prod, db, environment
from sqlalchemy.sql import func

class UserProgram(db.Model):
    __tablename__ = "user_programs"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"))
    program_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('programs.id'), ondelete="CASCADE"))

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.current_timestamp(), nullable=False)