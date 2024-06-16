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

        const reviewDateElement = document.createElement('div');
        reviewDateElement.textContent = `${this.review_date}`;
        reviewElement.appendChild(reviewDateElement);

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('review-rating');
        descriptionElement.textContent = `Rating: ${this.ratings}`;
        reviewElement.appendChild(descriptionElement);

        const userIdElement = document.createElement('div'); 
        userIdElement.textContent = `User ID: ${this.fk_user_id}`;
        reviewElement.appendChild(userIdElement);

        const reviewTextElement = document.createElement('div'); 
        descriptionElement.classList.add('review-text');
        reviewTextElement.textContent = `${this.review_text}`;
        reviewElement.appendChild(reviewTextElement);


        return reviewElement;
    }
}