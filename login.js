// login.js - Handle form submission and redirection

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the username and password values
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // (Optional) Add your form validation logic here (check if fields are empty)
        if (username && password) {
            // Optional: Check user credentials or perform any necessary validation

            // Redirect to home.html if credentials are correct
            window.location.href = 'index.html'; // Replace with the correct URL for your home page
        } else {
            alert('Please fill in both fields');
        }
    });
});
