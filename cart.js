function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartDetails = document.getElementById('cartDetails');
    let subtotal = 0;
    let shippingFee = 100;
    let totalAmount;

    cartDetails.innerHTML = '';

    if (cartItems.length === 0) {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = 'Cart is empty.';
        cartDetails.appendChild(li);

        let backToShopLink = document.createElement('a');
        backToShopLink.textContent = 'Back to Shop';
        backToShopLink.href = 'shop.html';
        backToShopLink.classList.add('btn', 'proceedToCheckOut');
        cartDetails.appendChild(backToShopLink);

        subtotal = 0;
        totalAmount = 0;

        // Show alert that cart is empty

    } else {
        cartItems.forEach((item, index) => {
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `
               <div class="globalFlex cartitemflex">
                    <div class="cartProductDetails globalFlex">
                        <div class="cartItemImg">
                            <img src="${item.image_url}" alt="${item.name}">
                        </div>
                        <p>${item.name} - $${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="removeCartBtn">
                        <button class="btn btn-primary btn-block font-weight-bold py-3 removeBtn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            cartDetails.appendChild(li);

            subtotal += item.price * item.quantity;
            totalAmount = subtotal + shippingFee;
        });
    }

    document.getElementById('subtotal').textContent = `Rs ${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `Rs ${shippingFee}`;
    document.getElementById('total').textContent = `Rs ${totalAmount.toFixed(2)}`;

    console.log('Cart items displayed:', cartItems);
}

function removeItemFromCart(itemIndex) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(itemIndex, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Updated cart in localStorage:', cart);

    displayCartItems();
}

document.addEventListener('DOMContentLoaded', function () {
    // Display cart items when the page loads
    displayCartItems();

    let cartDetails = document.getElementById('cartDetails');

    cartDetails.addEventListener('click', function (event) {
        if (event.target.classList.contains('removeBtn')) {
            let itemIndex = event.target.getAttribute('data-index');
            console.log('Removing item with index:', itemIndex);
            removeItemFromCart(itemIndex);
        }
    });

});


let proceedToCheckOutBtn = document.getElementById("sendMessageButton")
proceedToCheckOutBtn.addEventListener('click', () => {
    if (JSON.parse(localStorage.getItem('cart')).length === 0) {
        alert('Your cart is empty. Please add items to proceed.');
    }
    else {
        proceedToCheckOutBtn.href = "proceedToCheckout.html"
    }
})

