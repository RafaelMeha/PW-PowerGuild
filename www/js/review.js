
class Reviews {
    constructor(id, ratings, review_text, review_date, fk_user_id, fk_product_id ) {
        this.id = id;
        this.ratings = ratings;
        this.review_text = review_text;
        this.review_date = review_date;
        this.fk_user_id = fk_user_id;
        this.fk_product_id = fk_product_id;
    }

    generateHtml() {
        const productElement = document.createElement('li');
        productElement.classList.add('product-item');

        const descriptionElement = document.createElement('div');
        descriptionElement.textContent = `Ratings: ${this.ratings}`;
        productElement.appendChild(descriptionElement);

        const discountElement = document.createElement('div');
        discountElement.textContent = `Review Text: ${this.review_text}`;
        productElement.appendChild(discountElement);

        const nameElement = document.createElement('div');   
        nameElement.textContent = this.review_date;
        productElement.appendChild(nameElement);

        const priceElement = document.createElement('div');
        priceElement.textContent = `Price: ${this.fk_user_id}`;
        productElement.appendChild(priceElement);

        const quantityElement = document.createElement('div');
        quantityElement.textContent = `Quantity: ${this.fk_product_id}`;
        productElement.appendChild(quantityElement);

        productElement.appendChild(productElement);
        return productElement;
    }
}

