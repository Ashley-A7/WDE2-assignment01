# Step 1: Use the official Python image as the base image
FROM python:3.9-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the current directory (where the Dockerfile is located) into the container at /app
COPY . /app

# Step 4: Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Expose the port that Flask runs on (default is 5000)
EXPOSE 5000

# Step 6: Set the environment variables for Flask
ENV FLASK_APP=server.py
ENV FLASK_ENV=production

# Step 7: Command to run the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
