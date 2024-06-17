window.onload = async function() {
    const itemsContainer = document.getElementById('items');
    const testContainer = document.getElementById('test');

    try {
        const responseProducts = await fetch('/api/products');
        const responseSalesProducts = await fetch('/api/salesproducts');

        if (!responseProducts.ok || !responseSalesProducts.ok) {
            throw new Error('Network response was not ok');
        }

        const productsData = await responseProducts.json();
        const salesProductsData = await responseSalesProducts.json();

        const saleProductIds = salesProductsData.map(sp => sp.fk_products_id);

        const filteredProducts = productsData.filter(product => saleProductIds.includes(product.id));

        if(filteredProducts.length == 1) {
            testContainer.textContent = `Você tem ${filteredProducts.length} jogo no seu carrinho.`;
        } else {
            testContainer.textContent = `Você tem ${filteredProducts.length} jogos no seu carrinho.`;
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
            const productElement = product.generateHtml();
            itemsContainer.appendChild(productElement);
        });
        
        await markCartCheckboxes();
        await markWishlistCheckboxes();
    } catch (error) {
        console.error('Error fetching products or sales products:', error);
    }
}

async function searchGame() {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    const searchGame = document.getElementById('search-game').value.toLowerCase();

    try {
        const responseProducts = await fetch('/api/products');
        const responseSales = await fetch('/api/salesproducts');

        if (!responseProducts.ok || !responseSales.ok) {
            throw new Error('Network response was not ok');
        }

        const productsData = await responseProducts.json();
        const salesProductsData = await responseSales.json();

        const salesProductIds = salesProductsData.map(pw => pw.fk_products_id);

        const filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().startsWith(searchGame) &&
            salesProductIds.includes(product.id)
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
            const productElement = product.generateHtml();
            itemsContainer.appendChild(productElement);
        });

        await markWishlistCheckboxes();
        await markCartCheckboxes();
    } catch (error) {
        console.error('Error fetching products or wishlists:', error);
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