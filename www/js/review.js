class Review { 
        constructor(id, ratings, review_text, review_date, fk_user_id, fk_product_id ) {
        this.id = id;
        this.ratings = ratings;
        this.review_text = review_text;
        this.review_date = review_date;
        this.fk_user_id = fk_user_id;
        this.fk_product_id = fk_product_id;
    }

    generateHtml() {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review-item');

        const descriptionElement = document.createElement('div');
        descriptionElement.textContent = `Ratings: ${this.ratings}`;
        reviewElement.appendChild(descriptionElement);

        const reviewTextElement = document.createElement('div'); 
        reviewTextElement.textContent = `Review Text: ${this.review_text}`;
        reviewElement.appendChild(reviewTextElement);

        const reviewDateElement = document.createElement('div'); 
        reviewDateElement.textContent = `Review Date: ${this.review_date}`;
        reviewElement.appendChild(reviewDateElement);

        const userIdElement = document.createElement('div'); 
        userIdElement.textContent = `User ID: ${this.fk_user_id}`;
        reviewElement.appendChild(userIdElement);

        return reviewElement;
    }
}