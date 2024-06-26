window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const itemsContainer = document.getElementById('items');
    const reviewsContainer = document.getElementById('reviews');
    const addReviewForm = document.getElementById('comment-form');

    async function loadReviews(){
        try {
            const response = await fetch(`/api/reviews/product/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const reviewsData = await response.json();
            clearElement(reviewsContainer);
           
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
            console.error('Error fetching reviews:', error);
        }
    }
    
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
                    productData.category,
                    productData.fk_developers_id,
                    productData.fk_suppliers_id
                );
                const productElement = product.generateHtml();
                itemsContainer.appendChild(productElement); 
            }
            await loadReviews();
            await markWishlistCheckboxes();
            await markCartCheckboxes();
        }
    } catch (error) {
        console.error('Error searching product:', error);
    }

    addReviewForm.onsubmit = async function(event) {
        event.preventDefault();
        
        const reviewText = document.getElementById('comment-text').value.trim();
        if (reviewText === '') {
            alert('Please enter a comment before submitting.');
            return;
        }

        const newReview = {
            ratings: document.getElementById('rating-value').value,
            review_text: reviewText,
            review_date: new Date().toLocaleString('pt-PT'),
            fk_user_id: 1,
            fk_product_id: productId
        };
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReview)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await loadReviews();
            addReviewForm.reset();
            clearStarValue();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
};

function updateRatingValue(element) {
    const ratingValueElement = document.getElementById('rating-value');

    if (ratingValueElement) {
        const stars = document.querySelectorAll('.star');
        
        stars.forEach(star => {
            star.checked = false;
        });

        for (let i = 0; i < element.value; i++) {
            stars[i].checked = true;
        }

        ratingValueElement.value = element.value;
    } else {
        console.error('Element with ID "rating-value" not found.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const allStars = document.querySelectorAll('.rating .star');
    const ratingValue = document.querySelector('.rating .rating-value');

    allStars.forEach((item, idx) => {
        item.addEventListener('click', function () {
            ratingValue.value = idx + 1;

            allStars.forEach((star, i) => {
                if (i <= idx) {
                    star.checked = true;
                } else {
                    star.checked = false;
                }
            });
        });
    });
});

function clearStarValue(){
     document.getElementById('rating-value').value = '';
}

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