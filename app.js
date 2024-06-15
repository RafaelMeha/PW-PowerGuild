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

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});