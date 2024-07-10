document.addEventListener('DOMContentLoaded', async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            throw new Error('Product ID not found in URL parameters');
        }

        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        showLoader();
        const product = await response.json();

        // Update DOM with product details
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = `Price: Rs ${product.price}`;
        document.getElementById('productImage').src = product.image_url;
        document.getElementById('productImage').alt = product.name;

        hideLoader();

        // Add to Cart button functionality
        document.getElementById('addtocart').addEventListener('click', () => {
            let quantity = parseInt(document.getElementById('QualityInput').value);
            addToCart(product, quantity);
        });

    } catch (error) {
        console.error('Error fetching product:', error);
    }
});


function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = { ...product, quantity }; // Add quantity to the product object
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    // Redirect to cart page
    window.location.href = 'cart.html';
}

let increaseQuantityBtn = document.getElementById('increaseQuantityBtn');
let decreaseQuantityBtn = document.getElementById('decreaseQuantityBtn');

increaseQuantityBtn.addEventListener('click', () => {
    let QualityInput = document.getElementById('QualityInput');
    let currentValue = parseInt(QualityInput.value);
    let increaseValue = currentValue + 1;
    QualityInput.value = increaseValue;
});

decreaseQuantityBtn.addEventListener('click', () => {
    let QualityInput = document.getElementById('QualityInput');
    let currentValue = parseInt(QualityInput.value);
    let decrease = currentValue - 1;
    if (decrease > 0) {
        QualityInput.value = decrease;
    }
});