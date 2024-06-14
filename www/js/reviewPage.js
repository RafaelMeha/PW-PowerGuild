window.onload = async function() {
    const itemsContainer = document.getElementById('reviews');
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    try {
        const response = await fetch(`/api/reviews/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const reviewsData = await response.json();

        reviewsData.forEach(reviewData => {
            const product = new Reviews(
                reviewData.id,
                reviewData.ratings,
                reviewData.review_text,
                reviewData.review_date,
                reviewData.fk_user_id,
                reviewData.fk_product_id
            );
            const productElement = product.generateHtml();
            itemsContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}