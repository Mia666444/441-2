// enquiry.js - Handle form submission and show success message

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enquiry-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const course = document.getElementById('course').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // (Optional) Add validation if needed, e.g., check if fields are empty
        if (name && email && course) {
            // Simulate successful registration (you can replace this with actual server-side logic)
            alert("Registration successful! You have registered for " + course + ".");

            // Optionally, clear the form fields
            form.reset();

            // Optionally, redirect to another page after successful submission
            // window.location.href = 'thank-you.html'; // Uncomment this line to redirect
        } else {
            alert("Please fill in all required fields.");
        }
    });
});
