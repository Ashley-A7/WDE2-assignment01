from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

mongo_uri = "mongodb://localhost:27017/marathon" 
client = MongoClient(mongo_uri)
db = client["marathon"]  
participants_collection = db["participants"]  

@app.route("/")
def index():
    return "Flask Marathon Registration Backend is Running!"

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    age = data.get("age")

    if not name or not email or not age:
        return jsonify({"error": "Name, email, and age are required"}), 400

    if participants_collection.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    participant = {
        "name": name,
        "email": email,
        "age": age
    }
    result = participants_collection.insert_one(participant)

    return jsonify({
        "message": "Registration successful",
        "participant": {
            "_id": str(result.inserted_id),
            "name": name,
            "email": email,
            "age": age
        }
    }), 201

@app.route("/participants", methods=["GET"])
def get_participants():
    participants = participants_collection.find()
    participants_list = []
    for participant in participants:
        participant["_id"] = str(participant["_id"]) 
        participants_list.append(participant)
    return jsonify(participants_list)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
