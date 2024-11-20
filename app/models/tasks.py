from .db import SCHEMA, add_prefix_for_prod, db, environment
from sqlalchemy.sql import func

class Taks(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    

    id = db.Column(db.Integer, primary_key=True)
    program_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('programs.id'), ondelete="CASCADE"))
    name = db.Column(db.String(), nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.current_timestamp(), nullable=False)