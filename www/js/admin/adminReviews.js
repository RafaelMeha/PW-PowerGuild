window.onload = async function() {
    const itemsContainer = document.getElementById('reviews');
    const addProductForm = document.getElementById('addProductForm');
    const searchForm = document.getElementById('searchForm');

    async function fetchAndDisplayReviews() {
        try {
            const response = await fetch('/api/reviews');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const reviewsData = await response.json();
            clearElement(itemsContainer);

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

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.dataset.id = review.id;
                deleteButton.textContent = 'Delete';
                reviewElement.appendChild(deleteButton);

                itemsContainer.appendChild(reviewElement);
            });
            addDeleteEventListeners();
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    addProductForm.onsubmit = async function(event) {
        event.preventDefault();
        const newReview = {
            ratings: document.getElementById('ratings').value,
            review_text: document.getElementById('description').value,
            review_date: new Date().toLocaleTimeString('pt-PT') ,
            fk_user_id: 1,
            fk_product_id: document.getElementById('product_id').value
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
            await fetchAndDisplayReviews();
            addProductForm.reset();
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    function addDeleteEventListeners() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = async function() {
                const reviewId = this.getAttribute('data-id');
                try {
                    const response = await fetch(`/api/reviews/${reviewId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    await fetchAndDisplayReviews();
                } catch (error) {
                    console.error('Error deleting review:', error);
                }
            };
        });
    }

    searchForm.onsubmit = async function(event) {
        event.preventDefault();
        const reviewsId = document.getElementById('searchId').value;
        try {
            if (reviewsId === '') {
                await fetchAndDisplayReviews();
            } else {
                const response = await fetch(`/api/reviews/${reviewsId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        clearElement(itemsContainer);
                        const noGameMessage = document.createElement('div');
                        noGameMessage.textContent = `No review with id: ${reviewsId}`;
                        itemsContainer.appendChild(noGameMessage);
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } else {
                    const reviewData = await response.json();
                    clearElement(itemsContainer);
                    const review = new Review(
                        reviewData.id,
                        reviewData.ratings,
                        reviewData.review_text,
                        reviewData.review_date,
                        reviewData.fk_user_id,
                        reviewData.fk_product_id
                    );
                    const reviewElement = review.generateHtml();

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'delete-btn';
                    deleteButton.dataset.id = review.id;
                    deleteButton.textContent = 'Delete';
                    reviewElement.appendChild(deleteButton);

                    itemsContainer.appendChild(reviewElement);
                    addDeleteEventListeners();
                }
            }
        } catch (error) {
            console.error('Error searching review:', error);
        }
    };

    fetchAndDisplayReviews();
};