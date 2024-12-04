from .db import SCHEMA, add_prefix_for_prod, db, environment
from sqlalchemy.sql import func

class Badge(db.Model):
    __tablename__ = "badges"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    program_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('programs.id'), ondelete="CASCADE"), unique=True)
    icon_url = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.current_timestamp(), nullable=False)
    
    user_badges = db.relationship("UserBadge", backref="badges", cascade="all, delete-orphan")

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "icon_url": self.icon_url,
            "program_id": self.program_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }