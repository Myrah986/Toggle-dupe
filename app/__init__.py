from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///time_tracker.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this!
    
    # Initialize extensions
    db.init_app(app)
    
    # Register blueprints
    from .routes import bp
    app.register_blueprint(bp)
    
    # Create tables (optional - better to use Flask-Migrate)
    with app.app_context():
        db.create_all()
    
    return app