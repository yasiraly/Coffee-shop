const firebaseConfig = {
    apiKey: "AIzaSyBeNeMgX24-LQaw6Bbd_-BeM-UuWcLIkr4",
    authDomain: "cofee-shop-3a43a.firebaseapp.com",
    projectId: "cofee-shop-3a43a",
    storageBucket: "cofee-shop-3a43a.appspot.com",
    messagingSenderId: "483052120628",
    appId: "1:483052120628:web:67bdae92d8064eeea87861"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function () {
    displayCartSummary();
    document.getElementById('confirmOrderButton').addEventListener('click', confirmOrder);
});

let totalPrice = 0;

function displayCartSummary() {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart items:', cartItems);

    // Calculate subtotal
    let productsSubtotal = 0;
    cartItems.forEach(item => {
        productsSubtotal += item.price * item.quantity;
    });

    // Set subtotal in the summary section
    document.getElementById('productsSubtotal').textContent = `Rs ${productsSubtotal.toFixed(2)}`;

    // Set shipping fee (if applicable, adjust as per your logic)
    const shippingFee = 100; // Example shipping fee
    document.getElementById('shippingFee').textContent = `Rs ${shippingFee.toFixed(2)}`;

    // Calculate total price
    totalPrice = productsSubtotal + shippingFee;
    document.getElementById('totalPrice').textContent = `Rs ${totalPrice.toFixed(2)}`;

    // Default total price to 0 if cart is empty
    if (cartItems.length === 0) {
        totalPrice = 0;
        document.getElementById('totalPrice').textContent = `Rs ${totalPrice.toFixed(2)}`;
    }
}

function confirmOrder(e) {
    e.preventDefault();

    // Validate billing details form
    if (!validateBillingForm()) {
        return;
    }

    console.log('Confirm Order button clicked');

    // Get billing details
    const firstName = document.getElementById('form7Example1').value;
    const lastName = document.getElementById('form7Example2').value;
    const address = document.getElementById('form7Example4').value;
    const email = document.getElementById('form7Example5').value;
    const phone = document.getElementById('form7Example6').value;
    const additionalInfo = document.getElementById('form7Example7').value;

    console.log('Billing details:', { firstName, lastName, address, email, phone, additionalInfo });

    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart items:', cartItems);

    // Calculate order totals
    let productsSubtotal = 0;
    cartItems.forEach(item => {
        productsSubtotal += item.price * item.quantity;
    });
    const shippingFee = 100; // Example shipping fee
    const totalPrice = productsSubtotal + shippingFee;

    // Create order details object
    const orderDetails = {
        customerName: `${firstName} ${lastName}`,
        address: address,
        email: email,
        phone: phone,
        additionalInfo: additionalInfo,
        products: cartItems,
        shippingFee: shippingFee,
        productsSubtotal: productsSubtotal,
        totalPrice: totalPrice,
    };

    console.log('Order details:', orderDetails);
    
    if (!navigator.onLine) {
        alert('No internet connection. Please check your network and try again.');
        return;
    }
    // Save order details to Firestore
    db.collection('orders').add(orderDetails).then(() => {
        console.log('Order confirmed and saved to Firestore');
        if (db.status === 0) {
            alert()
        }
        // Send email confirmation using Formspree
        sendEmailConfirmation(email, orderDetails);
        // Clear the cart in localStorage
        localStorage.removeItem('cart');
        // Redirect to a confirmation page or show a success message
        alert("Your order confirmed successfully!")
        window.location.href = 'shop.html'; // Adjust as per your setup
    }).catch(error => {
        console.error('Error saving order to Firestore: ', error);
    });
}

function validateBillingForm() {
    const firstName = document.getElementById('form7Example1').value.trim();
    const lastName = document.getElementById('form7Example2').value.trim();
    const address = document.getElementById('form7Example4').value.trim();
    const email = document.getElementById('form7Example5').value.trim();
    const phone = document.getElementById('form7Example6').value.trim();

    if (!firstName || !lastName || !address || !email || !phone) {
        alert('Please fill in all billing details.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

function sendEmailConfirmation(email, orderDetails) {
    const formData = {
        to: email,
        subject: 'Order Confirmation',
        message: `Dear ${orderDetails.customerName}, your order has been confirmed.`,
        orderDetails: orderDetails // Optionally include order details in email
    };

    console.log('Form Data:', formData);

    fetch('https://formspree.io/f/xldrrqng', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => {
        console.log('Response:', response);
        if (!response.ok) {
            alert('Network error')
            console.error('Failed to send confirmation email');
            throw new Error('Failed to send confirmation email');
        }
        else {
            alert('Confirmation email sent successfully');
        }
    }).catch(error => {
        console.error('Error sending confirmation email:', error);
        alert('Error sending confirmation email');
    });
}

