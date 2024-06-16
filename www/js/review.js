class Review {
    constructor(id, ratings, reviewText, reviewDate, fkUserId, fkProductId) {
        this.id = id;
        this.ratings = ratings;
        this.reviewText = reviewText;
        this.reviewDate = reviewDate;
        this.fkUserId = fkUserId;
        this.fkProductId = fkProductId;
    }

    generateHtml() {
        const reviewElement = document.createElement('li');
        reviewElement.classList.add('review');

        const reviewTextElement = document.createElement('div');
        reviewTextElement.classList.add('review-text');
        reviewTextElement.textContent = this.reviewText;
        reviewElement.appendChild(reviewTextElement);

        const reviewDateElement = document.createElement('div');
        reviewDateElement.classList.add('review-date');
        reviewDateElement.textContent = this.reviewDate;
        reviewElement.appendChild(reviewDateElement);

        const reviewRatingElement = document.createElement('div');
        reviewRatingElement.classList.add('review-rating');
        reviewRatingElement.innerHTML = this.generateStarRating(this.ratings);
        reviewElement.appendChild(reviewRatingElement);

        return reviewElement;
    }

    generateStarRating(rating) {
        const fullStar = '<span class="star">&#9733;</span>';
        const emptyStar = '<span class="star">&#9734;</span>';
        const starRating = fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
        return starRating;
    }
}
