// Register form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from being submitted normally

        // Get the username and password values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Optional: Add validation logic here (check if fields are empty)
        if (username && password) {
            // Store the user data (e.g., in localStorage)
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            // Redirect to the login page
            window.location.href = 'login.html'; // Replace with your actual login page URL
        } else {
            alert('Please fill in both fields');
        }
    });
});
