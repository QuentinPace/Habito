from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    streak = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer, nullable=False)
    profile_picture = db.Column(db.String())

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.current_timestamp(), nullable=False)

    programs = db.relationship("Program", backref="users", cascade="all, delete-orphan")
    user_programs = db.relationship("UserProgram", backref="users", cascade="all, delete-orphan")
    user_tasks = db.relationship("UserTask", backref="users", cascade="all, delete-orphan")
    user_badges = db.relationship("UserBadge", backref="users", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'username': self.username,
    #         'email': self.email
    #     }
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "hashed_password": self.hashed_password,
            "streak": self.streak,
            "score": self.score,
            "profile_picture": self.profile_picture,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "hashed_password": self.hashed_password,
            "streak": self.streak,
            "score": self.score,
            "profile_picture": self.profile_picture,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
