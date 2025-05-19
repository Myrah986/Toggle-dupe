from flask import Blueprint, render_template, request, redirect, url_for
from .models import db, Project, TimeEntry
from datetime import datetime

# Create Blueprint instead of using 'app' directly
bp = Blueprint('main', __name__)


# Main Pages
@bp.route('/')
def home():
    return render_template('home.html')

@bp.route('/focus-timer')
def focus_timer():
    return render_template('focus_timer.html')

@bp.route('/task-manager')
def task_manager():
    active_entries = TimeEntry.query.filter_by(end_time=None).all()
    entries = TimeEntry.query.filter(TimeEntry.end_time.isnot(None)).all()
    return render_template('task_manager.html', active_entries=active_entries, entries=entries)

# Keep all your existing functional routes:
@bp.route('/start', methods=['POST'])
def start_timer():
    project_name = request.form['project']
    project = Project.query.filter_by(name=project_name).first()
    if not project:
        project = Project(name=project_name)
        db.session.add(project)
        db.session.commit()

    entry = TimeEntry(project_id=project.id, description = request.form['description'], start_time=datetime.utcnow())
    db.session.add(entry)
    db.session.commit()
    return redirect(url_for('main.task_manager'))

@bp.route('/stop/<int:entry_id>')
def stop_timer(entry_id):
    entry = TimeEntry.query.get(entry_id)
    entry.end_time = datetime.utcnow()
    db.session.commit()
    return redirect(url_for('main.task_manager'))

@bp.route('/delete/<int:entry_id>', methods=['POST'])
def delete_entry(entry_id):
    entry = TimeEntry.query.get_or_404(entry_id)
    db.session.delete(entry)
    db.session.commit()
    return redirect(url_for('main.task_manager'))