# Marathon Registration Flask App

This is a simple Flask app for marathon registration. The app allows participants to register by submitting a form.

## Running the Flask App with Docker

1. Clone the repository.
2. Build the Docker image:
   ```bash
   docker build -t marathon-registration .
   ```
3. Run the Docker container:
   ```bash
   docker run -p 5000:5000 marathon-registration
   ```
4. Visit `http://localhost:5000` in your web browser to access the registration form.
