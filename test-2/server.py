from flask import Flask, render_template, request, redirect, url_for, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# Updated MongoDB URI to use container name as host
mongo_uri = "mongodb://mongo:27017/marathon"
client = MongoClient(mongo_uri)
db = client["marathon"]
participants_collection = db["participants"]

@app.route("/", methods=["GET", "POST"])
def index():
    success_message = request.args.get("success")
    return render_template("registration-form.html", success_message=success_message)

@app.route("/register", methods=["POST"])
def register():
    name = request.form.get("name")
    email = request.form.get("email")
    age = request.form.get("age")
    race_distance = request.form.get("distance")
    medical_conditions = request.form.get("medical")

    if not name or not email or not age or not race_distance:
        return jsonify({"error": "Name, email, age, and race distance are required"}), 400

    # Check if email already exists in the database
    if participants_collection.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    # Save the participant's data to MongoDB
    participant = {
        "name": name,
        "email": email,
        "age": age,
        "distance": race_distance,
        "medical": medical_conditions
    }
    result = participants_collection.insert_one(participant)

    # Redirect to the form page with a success message
    return redirect(url_for("index", success="Registration successful!"))

if __name__ == "__main__":
    app.run(debug=True)
