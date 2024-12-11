document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in (via localStorage)
    const username = localStorage.getItem('username');

    // If the user is not logged in, redirect them to the login page
    if (!username) {
        // User is not logged in, redirect to login page
        alert("You must log in to access the content.");
        window.location.href = 'login.html'; // Redirect to login page if not logged in
    } else {
        // If logged in, show the logout button
        document.getElementById('logout-button').style.display = 'block';
    }

    // Handle logout functionality
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Remove user info from localStorage
            localStorage.removeItem('username');
            
            // Redirect to login page after logout
            window.location.href = 'login.html'; // Redirect to login page after logout
        });
    }
});
