document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent normal form submission
    console.log("Form submission triggered");  // Log this to check if the event is being triggered

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const distance = document.getElementById("distance").value;
    const medical = document.getElementById("medical") ? document.getElementById("medical").value : '';  // Optional field

    // Log to ensure values are captured correctly
    console.log("Form data:", { name, email, age, distance, medical });

    // Validate inputs
    if (!name || !email || !age || !distance) {
        alert("Please fill out all required fields!");
        return;
    }

    // Prepare the data to send to the server
    const participantData = {
        name,
        email,
        age,
        distance,
        medical
    };

    // Log the data being sent
    console.log("Data being sent to server:", participantData);

    // Send the data to the backend using the Fetch API
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(participantData), // Send the data as JSON
        credentials: 'same-origin'
    })
    .then((response) => response.json())  // Parse the JSON response
    .then((data) => {
        // Handle success response
        const messageDiv = document.getElementById("message");
        if (data.success) {
            messageDiv.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            document.getElementById("registration-form").reset();  // Reset form fields after successful submission
        } else {
            messageDiv.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
        }
    })
    .catch((error) => {
        // Handle error response
        const messageDiv = document.getElementById("message");
        messageDiv.innerHTML = `<div class="alert alert-danger">An error occurred: ${error}</div>`;
    });
});
