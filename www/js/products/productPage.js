window.onload = async function() {
    const itemsContainer = document.getElementById('items');

    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsData = await response.json();

        productsData.forEach(productData => {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.discount,
                productData.price,
                productData.quantity,
                productData.launch_date,
                productData.category,
                productData.fk_developers_id,
                productData.fk_suppliers_id
            );
            const productElement = product.generateProductHtml();
            itemsContainer.appendChild(productElement);
        });

        await markWishlistCheckboxes();
        await markCartCheckboxes();
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    try {
        const response = await fetch('/api/platforms');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const platformsData = await response.json();

        platformsData.forEach(platformData => {
            new Platform(
                platformData.id,
                platformData.name
            );
        });
    } catch (error) {
        console.error('Error fetching platforms:', error);
    }

    try {
        const response = await fetch('/api/productsplatforms');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsPlatformsData = await response.json();

        productsPlatformsData.forEach(productPlatformData => {
            new ProductsPlatforms(
                productPlatformData.id,
                productPlatformData.fk_platforms_id,
                productPlatformData.fk_products_id
            );
        });
    } catch (error) {
        console.error('Error fetching productsPlatforms:', error);
    }

    try {
        const response = await fetch('/api/productswishlists');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsWishlistsData = await response.json();

        productsWishlistsData.forEach(productWishlistData => {
            new ProductsWishlists(
                productWishlistData.fk_products_id,
                productWishlistData.fk_wishlists_id
            );
        });
    } catch (error) {
        console.error('Error fetching wishlists:', error);
    }

    try {
        const response = await fetch('/api/salesproducts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const salesProductsData = await response.json();

        salesProductsData.forEach(saleProductData => {
            new SalesProducts(
                saleProductData.id,
                saleProductData.quantity,
                saleProductData.price,
                saleProductData.fk_products_id
            );
        });
    } catch (error) {
        console.error('Error fetching sales_products:', error);
    }
};

async function filter(filterType, filter) {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsData = await response.json();

        let filteredProducts = [];
        
        switch (filterType) {
            case 'category':
                filteredProducts = productsData.filter(product => product.category.toLowerCase() === filter.toLowerCase());
                break;
            default:
                filteredProducts = productsData;
                break;
        }

        filteredProducts.forEach(productData => {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.discount,
                productData.price,
                productData.quantity,
                productData.launch_date,
                productData.category,
                productData.fk_developers_id,
                productData.fk_suppliers_id
            );
            const productElement = product.generateProductHtml();
            itemsContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function searchGame() {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    const searchGame = document.getElementById('search-game').value.toLowerCase();

    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsData = await response.json();

        const filteredProducts = productsData.filter(product => product.name.toLowerCase().startsWith(searchGame));

        filteredProducts.forEach(productData => {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.discount,
                productData.price,
                productData.quantity,
                productData.launchDate,
                productData.category,
                productData.fkDevelopersId,
                productData.fkSuppliersId,
                productData.image,
                productData.genre
            );
            const productElement = product.generateProductHtml();
            itemsContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function filterPlatform(platformId) {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    try {
        const responseProductsPlatforms = await fetch('/api/productsplatforms');
        const responseProducts = await fetch('/api/products');
        if (!responseProductsPlatforms.ok || !responseProducts.ok) {
            throw new Error('Network response was not ok');
        }

        const productsPlatformsData = await responseProductsPlatforms.json();
        const productsData = await responseProducts.json();

        const filteredProductIds = productsPlatformsData
            .filter(pp => pp.fk_platforms_id === platformId)
            .map(pp => pp.fk_products_id);

        const filteredProducts = productsData.filter(product => filteredProductIds.includes(product.id));

        filteredProducts.forEach(productData => {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.discount,
                productData.price,
                productData.quantity,
                productData.launch_date,
                productData.category,
                productData.fk_developers_id,
                productData.fk_suppliers_id
            );
            const productElement = product.generateProductHtml();
            itemsContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error fetching products or productsPlatforms:', error);
    }
}

async function addToProductsWishlist(productId) {
    const newProductsWishlists = {
        fk_products_id: productId,
        fk_wishlists_id: 1
    }
    try {
        const response = await fetch('/api/productswishlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProductsWishlists)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('New entry added to products_wishlists:', result);
    } catch (error) {
        console.error('Error adding new entry to products_wishlists:', error);
    }
}

async function deleteToProductsWishlist(productId) {
    try {
        const response = await fetch(`/api/productswishlists/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log(`Product with fk_products_id ${productId} removed from products_wishlists`);

    } catch (error) {
        console.error('Error removing product from products_wishlists:', error);
    }
}

async function markWishlistCheckboxes() {
    try {
        const response = await fetch('/api/productswishlists');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsWishlistsData = await response.json();

        const wishlistProductIds = productsWishlistsData
            .filter(pw => pw.fk_wishlists_id === 1)
            .map(pw => pw.fk_products_id);

        document.querySelectorAll('.wishlist-checkbox').forEach(checkbox => {
            const productId = parseInt(checkbox.dataset.productId, 10);
            if (wishlistProductIds.includes(productId)) {
                checkbox.checked = true;
            }
        });
    } catch (error) {
        console.error('Error fetching wishlist data:', error);
    }
}

async function markCartCheckboxes() {
    try {
        const response = await fetch('/api/salesproducts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const salesProductsData = await response.json();

        const saleProductIds = salesProductsData.map(sp => sp.fk_products_id);

        document.querySelectorAll('.sales').forEach(checkbox => {
            const productId = parseInt(checkbox.dataset.productId, 10);
            if (saleProductIds.includes(productId)) {
                checkbox.checked = true;
            }
        });
    } catch (error) {
        console.error('Error fetching sales products data:', error);
    }
}

async function addToCart(quantity, price, fk_products_id) {
    const newSalesProduct = {
        quantity: quantity,
        price: price,
        fk_products_id: fk_products_id
    }
    try {
        const response = await fetch('/api/salesproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSalesProduct)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('New entry added to sales_products:', result);
    } catch (error) {
        console.error('Error adding new entry to sales_products:', error);
    }
}

async function deleteToCart(productId) {
    try {
        const response = await fetch(`/api/salesproducts/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log(`Product with fk_products_id ${productId} removed from sales_products`);

    } catch (error) {
        console.error('Error removing product from sales_products:', error);
    }
}