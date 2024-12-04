from .db import SCHEMA, add_prefix_for_prod, db, environment
from sqlalchemy.sql import func

class UserBadge(db.Model):
    __tablename__ = "user_badges"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    badge_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('badges.id'), ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.current_timestamp(), nullable=False)
    

    def to_dict_basic(self):
        return {
            "id": self.id,
            "badge_id": self.badge_id,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }