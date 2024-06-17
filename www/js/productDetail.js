window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const itemsContainer = document.getElementById('items');
    const reviewsContainer = document.getElementById('reviews')
    

    try {
        if (productId === '') {
            await fetchAndDisplayProducts();
        } else {
            const response = await fetch(`/api/products/${productId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    clearElement(itemsContainer);
                    const noGameMessage = document.createElement('div');
                    noGameMessage.textContent = `No game with id: ${productId}`;
                    itemsContainer.appendChild(noGameMessage);
                } else {
                    throw new Error('Network response was not ok');
                }
            } else {
                const productData = await response.json();
                clearElement(itemsContainer);
                const product = new Product(
                    productData.id,
                    productData.name,
                    productData.description,
                    productData.discount,
                    productData.price,
                    productData.quantity,
                    productData.launch_date,
                    productData.Type,
                    productData.category,
                    productData.fk_developers_id,
                    productData.fk_suppliers_id
                );
                const productElement = product.generateHtml();
                itemsContainer.appendChild(productElement);
            }
        }
    } catch (error) {
        console.error('Error searching product:', error);
    }
    try {
        const response = await fetch(`/api/reviews/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const reviewsData = await response.json();

        reviewsData.forEach(reviewData => {
            const review = new Review( 
                reviewData.id,
                reviewData.ratings,
                reviewData.review_text,
                reviewData.review_date,
                reviewData.fk_user_id,
                reviewData.fk_product_id
            );
            const reviewElement = review.generateHtml(); 
            reviewsContainer.appendChild(reviewElement);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }

};

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
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