import sqlite3
from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('marathon.db')  # This creates the database file if it doesn't exist
    c = conn.cursor()
    # Create the participants table if it doesn't exist
    c.execute('''CREATE TABLE IF NOT EXISTS participants (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    age INTEGER NOT NULL,
                    distance TEXT NOT NULL,
                    medical TEXT
                )''')
    conn.commit()
    conn.close()

# Call init_db when the app starts
init_db()

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

    # Save the participant's data to SQLite
    conn = sqlite3.connect('marathon.db')
    c = conn.cursor()

    # Check if email already exists
    c.execute("SELECT * FROM participants WHERE email = ?", (email,))
    existing_participant = c.fetchone()
    if existing_participant:
        return jsonify({"error": "Email already exists"}), 400

    # Insert new participant into the database
    c.execute("INSERT INTO participants (name, email, age, distance, medical) VALUES (?, ?, ?, ?, ?)",
              (name, email, age, race_distance, medical_conditions))
    conn.commit()
    conn.close()

    # Redirect to the form page with a success message
    return redirect(url_for("index", success="Registration successful!"))

if __name__ == "__main__":
    app.run(debug=True)
