/* MiaITA1 */
// Cart items with price and quantity
let cart = [
    {name: "BSBMPG666", price: 10, quantity: 0},
    {name: "BSBMPG777", price: 15, quantity: 0},
    {name: "BSBMPG888", price: 20, quantity: 0},
    {name: "BSBMPG999", price: 25, quantity: 0},
    {name: "BSBMPG111", price: 30, quantity: 0}
];

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
            <td>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <input type="number" value="${item.quantity}" min="0" id="quantity-${index}" onchange="updateQuantity(${index}, this.value)">
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td id="item-total-${index}">$${itemTotal}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartTable.appendChild(row);

        total += item.price * item.quantity;
    });

    // Update the total price
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to update quantity based on input
function updateQuantity(index, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
        alert("Invalid quantity!");
        return;
    }

    // Update quantity in the cart
    cart[index].quantity = quantity;

    // Recalculate the total and update the display
    updateCart();
}

// Function to change quantity (increment or decrement)
function changeQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;

    // Ensure quantity is not negative
    if (newQuantity >= 0) {
        cart[index].quantity = newQuantity;
    }

    // Update cart
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove product from cart
    updateCart(); // Update cart display
}

// Initialize cart display
updateCart();
