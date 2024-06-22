const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'www')));

let productsRoutes = require("./routes/productsRoute");
app.use("/api/products", productsRoutes);

let platformsRoutes = require("./routes/platformsRoute");
app.use("/api/platforms", platformsRoutes);

let productsPlatformsRoute = require("./routes/products-platformsRoute");
app.use("/api/productsplatforms", productsPlatformsRoute);

let ProductsWishlistsRoute = require("./routes/products-wishlistsRoute");
app.use("/api/productswishlists", ProductsWishlistsRoute);

let reviewRoutes = require("./routes/reviewsRoute");
app.use("/api/reviews", reviewRoutes);  

let salesProductsRoute = require("./routes/sales-productsRoute");
app.use("/api/salesproducts", salesProductsRoute);

let userRoutes = require("./routes/usersRoute");
app.use("/api/users", userRoutes);

let distributorRoute = require("./routes/disRoute");
app.use("/api/distributors", distributorRoute);

let developerRoute = require("./routes/devRoute");
app.use("/api/developers", developerRoute)

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});