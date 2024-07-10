let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 6;

async function fetchProducts() {
    try {
        let response = await fetch("http://localhost:3000/api/products");
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
function displayProductName(products) {
    let productNameFilters = document.getElementById('regionFilters');
    let productname = getUniqueIds(products); 
    productname.forEach(id => {
        let li = document.createElement('li');
        let button = document.createElement('button');
        button.textContent = id;
        button.onclick = () => {
            productNameFilters.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('filterBorderBottom');
            });
            button.classList.add('filterBorderBottom');
            filterProductNames(id);
        };
        li.appendChild(button);
        productNameFilters.appendChild(li);
    });
}


function getUniqueIds(products) {
    return [...new Set(products.map(product => product.name))];
}

function filterProductNames(name) {
    filteredProducts = allProducts.filter(product => product.name === name);
    currentPage = 1;
    displayPage(currentPage);
}

function clearFilters() {
    filteredProducts = [...allProducts];
    currentPage = 1;
    displayPage(currentPage);

    // Remove .filterBorderBottom class from all buttons
    let productNameFilters = document.getElementById('regionFilters');
    productNameFilters.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('filterBorderBottom');
    });
}


function displayProducts(products) {
    let shopRightContent = document.querySelector('.shopRightContent');
    shopRightContent.innerHTML = '';

    products.forEach(product => {
        let card = document.createElement('div');
        card.classList.add('card');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.classList.add('shopCards');

        let cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top');
        cardImg.src = product.image_url;

        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerHTML = product.name;

        let productPrice = document.createElement('h5');
        productPrice.classList.add('card-title');
        productPrice.innerHTML = `Rs <u>${product.price}</u>`;

        let cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerHTML = product.description;

        let addtocart = document.createElement('button');
        addtocart.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block', 'addToCartButton');
        addtocart.textContent = 'add to cart';

        cardBody.appendChild(cardImg);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(cardText);
        cardBody.appendChild(addtocart);

        card.appendChild(cardBody);
        shopRightContent.appendChild(card);

        addtocart.addEventListener('click', () => {
            window.location.href = `singleProductPage.html?id=${product.id}`;
        });
    });
}

// Your existing JavaScript code...

function displayPage(page) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
    displayProducts(productsToDisplay);

    // Update pagination controls visibility and state
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    prevButton.style.display = 'block';
    nextButton.style.display = 'block';
    pageInfo.style.display = 'block';

    prevButton.disabled = page === 1;
    nextButton.disabled = endIndex >= filteredProducts.length;

    pageInfo.textContent = `Page ${page} of ${Math.ceil(filteredProducts.length / productsPerPage)}`;
}

document.addEventListener('DOMContentLoaded', init);

async function init() {
    showLoader();
    allProducts = await fetchProducts();
    filteredProducts = [...allProducts];
    displayPage(currentPage);
    displayProductName(allProducts);
    hideLoader();
}

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', init);

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        showLoader();
        currentPage--;
        displayPage(currentPage);
        hideLoader();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if ((currentPage * productsPerPage) < filteredProducts.length) {
        showLoader();
        currentPage++;
        displayPage(currentPage);
        hideLoader();
    }
});

document.getElementById('clearFiltersBtn').addEventListener('click', () => {
    showLoader();
    clearFilters();
    hideLoader();
});
