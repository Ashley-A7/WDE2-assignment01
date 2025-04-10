// script.js

// jQuery code to handle form submission and send data to the backend
$("#registration-form").on("submit", function (event) {
    event.preventDefault();
  
    const name = $("#name").val();
    const email = $("#email").val();
    const age = $("#age").val();
    const phone = $("#phone").val();
    const distance = $("#distance").val();
    const medical = $("#medical").val();
  
    // Validate inputs
    if (!name || !email || !age || !phone || !distance) {
      alert("Please fill out all required fields!");
      return;
    }
  
    // Prepare the data to send to the server
    const participantData = {
      name,
      email,
      age,
      phone,
      distance,
      medical
    };
  
    // Send the data to the backend using AJAX (Flask server URL)
    $.ajax({
      url: 'http://localhost:5000/register',  // Flask backend URL
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(participantData),
      success: function (response) {
        // Show success message
        $('#message').html(`<div class="alert alert-success">Registration successful! Welcome ${response.participant.name}!</div>`);
      },
      error: function (error) {
        // Show error message
        $('#message').html(`<div class="alert alert-danger">Error: ${error.responseJSON.error}</div>`);
      }
    });
  });
  