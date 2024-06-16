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

        const reviewHeaderElement = document.createElement('div');
        reviewHeaderElement.classList.add('review-header');

        const reviewRatingElement = document.createElement('div');
        reviewRatingElement.classList.add('review-rating');
        this.generateStarRating(this.ratings, reviewRatingElement);
        reviewHeaderElement.appendChild(reviewRatingElement);

        const reviewDateElement = document.createElement('div');
        reviewDateElement.classList.add('review-date');
        reviewDateElement.textContent = this.reviewDate;
        reviewHeaderElement.appendChild(reviewDateElement);

        reviewElement.appendChild(reviewHeaderElement);

        const reviewTextElement = document.createElement('div');
        reviewTextElement.classList.add('review-text');
        reviewTextElement.textContent = this.reviewText;
        reviewElement.appendChild(reviewTextElement);

        return reviewElement;
    }

    generateStarRating(rating, parentElement) {
        const fullStarPath = '../assets/icons/fullStar.png';
        const emptyStarPath = '../assets/icons/emptyStar.png';

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('img');
            star.classList.add('star');
            star.src = i < rating ? fullStarPath : emptyStarPath;
            parentElement.appendChild(star);
        }
    }
}