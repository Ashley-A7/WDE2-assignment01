# Marathon Registration System

This is a simple backend service for managing marathon participant registrations. The system provides REST APIs for registering participants and retrieving participant information, built using Flask and MongoDB.

## Features

- Participant registration with name, email, and age
- Duplicate email check to prevent multiple registrations
- Retrieve list of all registered participants
- Containerized application using Docker

## Tech Stack

- Python 3.x
- Flask (Web Framework)
- MongoDB (Database)
- Docker (Containerization)

## Prerequisites

- Python 3.x
- MongoDB
- Docker (optional)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Make sure MongoDB is running locally on port 27017 or update the `mongo_uri` in `server.py` with your MongoDB connection string.

## Running the Application

### Running Locally

```bash
python server.py
```

The server will start on `http://localhost:5000`

### Running with Docker

1. Build the Docker image:

```bash
docker build -t marathon-registration .
```

2. Run the container:

```bash
docker run -p 5000:5000 marathon-registration
```

## API Endpoints

### 1. Health Check

- **URL:** `/`
- **Method:** `GET`
- **Response:** Confirms if the server is running

### 2. Register Participant

- **URL:** `/register`
- **Method:** `POST`
- **Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

- **Success Response:** HTTP 201

```json
{
  "message": "Registration successful",
  "participant": {
    "_id": "participant_id",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25
  }
}
```

### 3. Get All Participants

- **URL:** `/participants`
- **Method:** `GET`
- **Response:** List of all registered participants

## Error Handling

- The API returns appropriate error messages for:
  - Missing required fields
  - Duplicate email registrations
  - Invalid requests

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
