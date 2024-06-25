window.onload = async function() {
    const itemsContainer = document.getElementById('items');
    const testContainer = document.getElementById('test');

    try {
        const responseProducts = await fetch('/api/products');
        const responseWishlists = await fetch('/api/productswishlists');

        if (!responseProducts.ok || !responseWishlists.ok) {
            throw new Error('Network response was not ok');
        }

        const productsData = await responseProducts.json();
        const productsWishlistsData = await responseWishlists.json();

        const wishlistProductIds = productsWishlistsData
            .filter(pw => pw.fk_wishlists_id === 1)
            .map(pw => pw.fk_products_id);

        const filteredProducts = productsData.filter(product => wishlistProductIds.includes(product.id));

        if(filteredProducts.length == 1) {
            testContainer.textContent = `You have ${filteredProducts.length} game in your wishlist.`;
        } else {
            testContainer.textContent = `You have ${filteredProducts.length} games in your wishlist.`;
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

        await markWishlistCheckboxes();
        await markCartCheckboxes();
    } catch (error) {
        console.error('Error fetching products or wishlists:', error);
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

async function searchGame() {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    const searchGame = document.getElementById('search-game').value.toLowerCase();

    try {
        const responseProducts = await fetch('/api/products');
        const responseWishlists = await fetch('/api/productswishlists');

        if (!responseProducts.ok || !responseWishlists.ok) {
            throw new Error('Network response was not ok');
        }

        const productsData = await responseProducts.json();
        const productsWishlistsData = await responseWishlists.json();

        const wishlistProductIds = productsWishlistsData
            .filter(pw => pw.fk_wishlists_id === 1)
            .map(pw => pw.fk_products_id);

        const filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().startsWith(searchGame) &&
            wishlistProductIds.includes(product.id)
        );

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

        await markWishlistCheckboxes();
        await markCartCheckboxes();
    } catch (error) {
        console.error('Error fetching products or wishlists:', error);
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

async function filter(filterType, filter) {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    try {
        const responseProducts = await fetch('/api/products');
        const responseWishlists = await fetch('/api/productswishlists');
        
        if (!responseProducts.ok || !responseWishlists.ok) {
            throw new Error('Network response was not ok');
        }
        
        const productsData = await responseProducts.json();
        const productsWishlistsData = await responseWishlists.json();
        
        const wishlistProductIds = productsWishlistsData
            .filter(pw => pw.fk_wishlists_id === 1)
            .map(pw => pw.fk_products_id);
        
        let filteredProducts = [];
        
        switch (filterType) {
            case 'category':
                filteredProducts = productsData.filter(product =>
                    product.category.toLowerCase() === filter.toLowerCase() &&
                    wishlistProductIds.includes(product.id)
                );
                break;
            default:
                filteredProducts = productsData.filter(product => 
                    wishlistProductIds.includes(product.id)
                );
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
        console.error('Error fetching products or wishlists:', error);
    }
}

async function filterPlatform(platformId) {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    try {
        const responseProductsPlatforms = await fetch('/api/productsplatforms');
        const responseProducts = await fetch('/api/products');
        const responseWishlists = await fetch('/api/productswishlists');
        
        if (!responseProductsPlatforms.ok || !responseProducts.ok || !responseWishlists.ok) {
            throw new Error('Network response was not ok');
        }
        
        const productsPlatformsData = await responseProductsPlatforms.json();
        const productsData = await responseProducts.json();
        const productsWishlistsData = await responseWishlists.json();
        
        const wishlistProductIds = productsWishlistsData
            .filter(pw => pw.fk_wishlists_id === 1)
            .map(pw => pw.fk_products_id);
        
        const filteredProductIds = productsPlatformsData
            .filter(pp => pp.fk_platforms_id === platformId)
            .map(pp => pp.fk_products_id);
        
        const filteredProducts = productsData.filter(product =>
            filteredProductIds.includes(product.id) &&
            wishlistProductIds.includes(product.id)
        );
        
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
        console.error('Error fetching products, productsPlatforms, or wishlists:', error);
    }
}