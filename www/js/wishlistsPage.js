window.onload = async function() {
    const itemsContainer = document.getElementById('items');

    try {
        const responseProducts = await fetch('/api/products');
        const responseWishlists = await fetch('/api/productswishlists');

        if (!responseProducts.ok || !responseWishlists.ok) {
            throw new Error('Network response was not ok');
        }

        const productsData = await responseProducts.json();
        const productsWishlistsData = await responseWishlists.json();

        const wishlistProductIds = productsWishlistsData.map(pw => pw.fk_products_id);
        const filteredProducts = productsData.filter(product => wishlistProductIds.includes(product.id));

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
            const productElement = product.generateHtml();
            itemsContainer.appendChild(productElement);
        });

        await markWishlistCheckboxes();
    } catch (error) {
        console.error('Error fetching products or wishlists:', error);
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
            const productElement = product.generateHtml();
            itemsContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}   

async function markWishlistCheckboxes() {
    try {
        const response = await fetch('/api/productswishlists');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsWishlistsData = await response.json();

        const wishlistProductIds = productsWishlistsData.map(pw => pw.fk_products_id);

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