document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');

    // Check if the user is already logged in (via localStorage)
    const username = localStorage.getItem('username');

    // If the user is logged in, show a welcome message or user info
    if (username) {
        alert("You are already logged in as " + username);
        window.location.href = 'home.html'; // Redirect to home or dashboard page
    }

    // If the form is submitted, check the credentials and log the user in
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the form data
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // (Optional) Add validation logic here (check if fields are empty)
        if (username && password) {
            // Store the username in localStorage (simulating login state)
            localStorage.setItem('username', username);

            // Redirect the user to the home page or cart page
            window.location.href = 'home.html'; // Change to your desired page after login
        } else {
            alert('Please fill in both fields');
        }
    });

    // If there's a logout button, remove the user info from localStorage
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('username');
            window.location.href = 'login.html'; // Redirect to login page after logout
        });
    }
});
