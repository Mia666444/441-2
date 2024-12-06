/* MiaITA1 */
let cart = [];

// Get the elements
const cartTable = document.getElementById('cart-table');
const cartTotal = document.getElementById('cart-total');

// Function to update the cart display
function updateCart() {
    // Clear the current table content
    cartTable.innerHTML = '';

    let total = 0;

    // Loop through each item in the cart and add it to the table
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = (item.price * item.quantity).toFixed(2); // Calculate total per item
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartTable.appendChild(row);

        total += item.price * item.quantity;
    });

    // Update the total price
    cartTotal.textContent = total.toFixed(2);
}

// Function to add an item to the cart
function addToCart(courseElement) {
    const courseId = courseElement.getAttribute('data-id');
    const price = parseFloat(courseElement.getAttribute('data-price'));
    const quantity = parseInt(courseElement.querySelector('.quantity-input').value);

    // Debugging: Log price and quantity to the console
    console.log("Price:", price, "Quantity:", quantity);

    // Ensure price and quantity are valid numbers
    if (isNaN(price) || isNaN(quantity) || quantity <= 0) {
        alert("Invalid price or quantity.");
        return;
    }

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === courseId);

    if (existingItem) {
        // If item exists, update quantity
        existingItem.quantity += quantity;
    } else {
        // If item is not in cart, add it
        cart.push({
            id: courseId,
            name: courseElement.querySelector('h3').textContent,
            price: price,
            quantity: quantity
        });
    }

    // Update the cart display
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCart();
}

// Function to handle checkout (you can customize this further)
function checkout() {
    alert('Proceeding to checkout with a total of $' + cartTotal.textContent);
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add').forEach(button => {
    button.addEventListener('click', () => {
        const courseElement = button.closest('.course');
        addToCart(courseElement);
    });
});






// Define global variables
var usernameCookieName = "username";
var passwordCookieName = "password";

// Get cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Set cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Check if username exists in cookies
function checkCookie() {
    var username = getCookie(usernameCookieName);
    if (username) {
        document.getElementById("login-signup-link").innerHTML = "Welcome " + username + " & Sign out";
    }
}

// Navigation bar click event
function navigationClick() {
    document.querySelectorAll("nav a").forEach(function(link) {
        link.addEventListener("click", function(event) {
            if (link.href.includes("course.html") && !getCookie(usernameCookieName)) {
                event.preventDefault();
                window.location.href = "login.html";
            }
        });
    });
}

// Register form submit event
function registerFormSubmit() {
    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        setCookie(usernameCookieName, username, 7);
        setCookie(passwordCookieName, password, 7);
        window.location.href = "login.html";
    });
}

// Login form submit event
function loginFormSubmit() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var username = document.getElementById("login-username").value;
        var password = document.getElementById("login-password").value;
        if (username === getCookie(usernameCookieName) && password === getCookie(passwordCookieName)) {
            window.location.href = "course.html";
        } else {
            alert("Incorrect username or password");
        }
    });
}

// Login page register button click event
function loginRegisterButtonClick() {
    document.querySelector("#login-form button:not([type='submit'])").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "register.html";
    });
}

// Index page navigation bar click event
function indexNavigationClick() {
    document.querySelectorAll("nav a").forEach(function(link) {
        link.addEventListener("click", function(event) {
            if (link.href.includes("course.html") && !getCookie(usernameCookieName)) {
                event.preventDefault();
                window.location.href = "login.html";
            } else if (link.href.includes("login.html")) {
                event.preventDefault();
                window.location.href = "login.html";
            }
        });
    });
}

// Index page login/signup link click event
function indexLoginSignupClick() {
    document.getElementById("login-signup-link").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "login.html";
    });
}

// Index page check login status
function indexCheckLogin() {
    checkCookie();
    indexNavigationClick();
    indexLoginSignupClick();
}

// Initialize index page
function initIndexPage() {
    indexCheckLogin();
}

// Initialize register page
function initRegisterPage() {
    registerFormSubmit();
}

// Initialize login page
function initLoginPage() {
    loginFormSubmit();
    loginRegisterButtonClick();
}

// Load different initialization functions based on the page
function initPage() {
    var path = window.location.pathname;
    if (path.includes("index.html")) {
        initIndexPage();
        checkCookie(); // Call checkCookie() for index.html
    } else if (path.includes("register.html")) {
        initRegisterPage();
        // No checkCookie() for register.html
    } else if (path.includes("login.html")) {
        initLoginPage();
        checkIfLoggedIn(); // Check if user is logged in before allowing access to other pages
    } else if (path.includes("course.html")) {
        if (!isUserLoggedIn()) {
            // If user is not logged in, redirect to login page
            window.location.href = "login.html";
            return;
        }
        navigationClick(); // Ensure navigationClick function is called for course.html
        checkCookie(); // Call checkCookie() for course.html
    } else {
        if (!isUserLoggedIn()) {
            // If user is not logged in, redirect to login page
            window.location.href = "login.html";
            return;
        }
        navigationClick(); // Ensure navigationClick function is called for other pages
        checkCookie(); // Call checkCookie() for pages other than register and login
    }
}

// Function to check if user is logged in
function isUserLoggedIn() {
    // Implement your logic to check if the user is logged in
    // This could be checking for a cookie, local storage value, or any other method you use to track login status
    var username = getCookie(usernameCookieName);
    return username ? true : false;
}

// Initialize after the page loads
window.onload = initPage;


// Index page check login status
function indexCheckLogin() {
    var username = getCookie(usernameCookieName);
    if (!username) {
        alert("Please login First");
    } else {
        checkCookie(); // If logged in, update UI
    }
    indexNavigationClick();
    indexLoginSignupClick();
}
