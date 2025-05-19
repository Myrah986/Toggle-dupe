from . import db
from datetime import datetime

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique = True)
    time_entries = db.relationship('TimeEntry', backref='project', lazy=True)
    def __repr__(self):
        return f'<Project {self.id}: {self.name}>'

class TimeEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
    description = db.Column(db.String(200))
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_time = db.Column(db.DateTime)
    query = db.session.query_property()

    def __repr__(self):
        return f'<TimeEntry {self.id}>'