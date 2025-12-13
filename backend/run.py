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

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed,
            "bookmark": self.bookmark,
        }


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        #  Get data from request
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
        tasks = Task.query.all()
        return jsonify([task.to_dict() for task in tasks]), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
