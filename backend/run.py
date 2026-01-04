from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure database before initializing SQLAlchemy
DATABASE_URL = "postgresql://localhost/crud_db"
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy after configuration
db = SQLAlchemy(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    completed = db.Column(db.Boolean, default=False)
    bookmark = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed,
            "bookmark": self.bookmark,
            "timestamp": self.timestamp.isoformat(),
        }


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the CRUD API"}), 200

@app.route("/api/tasks", methods=["GET", "POST"])
def handle_tasks():
    if request.method == "POST":
        # Create new task
        data = request.get_json()
        if not data or "title" not in data:
            return jsonify({"error": "Title is required"}), 400

        new_task = Task(
            title=data["title"],
            description=data.get("description", ""),
            completed=data.get("completed", False),
            bookmark=data.get("bookmark", False),
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.to_dict()), 201
    else:
        # GET ALL TASKS
        tasks = Task.query.order_by(Task.id.asc())
        return jsonify([task.to_dict() for task in tasks]), 200

@app.route("/api/tasks/bookmarked", methods=["GET"])
def get_bookmarked_tasks():
    # Get all bookmarked tasks
    bookmarked_tasks = Task.query.filter_by(bookmark=True).order_by(Task.id.asc()).all()
    return jsonify([task.to_dict() for task in bookmarked_tasks]), 200

@app.route("/api/tasks/<int:task_id>", methods=["GET", "PUT", "DELETE"])
def handle_task(task_id):
    task = Task.query.get_or_404(task_id)
    
    if request.method == "GET":
        return jsonify(task.to_dict()), 200
    
    elif request.method == "PUT":
        # Update task
        data = request.get_json()
        if "title" in data:
            task.title = data["title"]
        if "description" in data:
            task.description = data["description"]
        if "completed" in data:
            task.completed = data["completed"]
        if "bookmark" in data:
            task.bookmark = data["bookmark"]
        
        db.session.commit()
        return jsonify(task.to_dict()), 200
    
    elif request.method == "DELETE":
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"}), 200

@app.route("/api/tasks/<int:task_id>/toggle-bookmark", methods=["PATCH"])
def toggle_bookmark(task_id):
    """Toggle bookmark status - sets to opposite of current value"""
    task = Task.query.get_or_404(task_id)     
    
    # Toggle bookmark to opposite value
    task.bookmark = not task.bookmark
    db.session.commit()
    
    return jsonify({
        "message": f"Bookmark {'added' if task.bookmark else 'removed'}",
        "task": task.to_dict()
    }), 200


if __name__ == "__main__":
    with app.app_context():
        # db.drop_all()
        db.create_all()
    app.run(debug=True)
