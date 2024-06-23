window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const itemsContainer = document.getElementById('reviews'); 

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
            itemsContainer.appendChild(reviewElement);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};