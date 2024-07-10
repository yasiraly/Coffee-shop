const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Example products data
const products = [
    {

        id: 1,
        name: "Americano",
        description: "A smooth and bold espresso-based coffee diluted with hot water.",
        price: 350,
        "image_url": "/productImgs/Americano.jpg"
    },
    {

        id: 2,
        name: "Black Coffee",
        description: "Pure and intense, brewed coffee without any additives or milk.",
        price: 400,
        "image_url": "/productImgs/black_coffee.jpg"
    },
    {

        id: 3,
        name: "Coffee Mocha",
        description: "Rich espresso blended with steamed milk and chocolate syrup, topped with whipped cream.",
        price: 550,
        "image_url": "/productImgs/coffee_mocha.jpg"
    },
    {

        id: 4,
        name: "Cappucino",
        description: "A classic Italian coffee made with equal parts of espresso, steamed milk, and milk foam.",
        price: 450,
        "image_url": "/productImgs/cappucino.jpeg"
    },
    {

        id: 5,
        name: "Cortado",
        description: "A balanced coffee drink consisting of equal parts espresso and steamed milk.",
        price: 300,
        "image_url": "/productImgs/cortado.jpeg"
    },
    {

        id: 6,
        name: "Espresso",
        description: "A concentrated coffee brewed by forcing hot water through finely-ground coffee beans.",
        price: 500,
        "image_url": "/productImgs/expresso.png"
    },
    {

        id: 7,
        name: "Flat White Coffee",
        description: "A velvety smooth coffee made with espresso and lightly steamed milk, no foam.",
        price: 300,
        "image_url": "/productImgs/flat_white.jpg"
    },
    {

        id: 8,
        name: "Iced Coffee",
        description: "Chilled coffee served over ice cubes, often with milk and sweeteners.",
        price: 380,
        "image_url": "/productImgs/iced_coffee.jpg"
    },
    {

        id: 9,
        name: "Latte",
        description: "Espresso with steamed milk, topped with a small amount of milk foam.",
        price: 550,
        "image_url": "/productImgs/latte.png"
    },
    {

        id: 10,
        name: "Turkish Coffee",
        description: "Strong and aromatic coffee brewed with finely ground coffee beans and sugar, served unfiltered.",
        price: 350,
        "image_url": "/productImgs/turkish_coffee.jpg"
    },
];

// Example orders data
const orders = [];

// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Example endpoint in your Express server
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p.id == productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});


// Add a new order
app.post('/api/orders', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.status(201).json(order);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
