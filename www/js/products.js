class Product {
    constructor(id, name, description, discount, price, quantity, launch_date, category, fk_developers_id, fk_suppliers_id) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.discount = discount;
        this.price = price;
        this.quantity = quantity;
        this.launch_date = launch_date;
        this.category = category;
        this.fk_developers_id = fk_developers_id;
        this.fk_suppliers_id = fk_suppliers_id;
    }

    generateHtml() {
        const productElement = document.createElement('li');
        productElement.classList.add('product-item');

        const productLink = document.createElement('a');
        productLink.href = `http://localhost:3000/html/productDetail.html?id=${this.id}`;
        productLink.style.textDecoration = 'none';
        productLink.style.color = 'inherit';
        productLink.style.display = 'block';

        const nameElement = document.createElement('h3');   
        nameElement.textContent = this.name;
        productLink.appendChild(nameElement);

        const descriptionElement = document.createElement('div');
        descriptionElement.textContent = `Description: ${this.description}`;
        productLink.appendChild(descriptionElement);

        const discountElement = document.createElement('div');
        discountElement.textContent = `Discount: ${this.discount}`;
        productLink.appendChild(discountElement);

        const priceElement = document.createElement('div');
        priceElement.textContent = `Price: ${this.price}`;
        productLink.appendChild(priceElement);

        const quantityElement = document.createElement('div');
        quantityElement.textContent = `Quantity: ${this.quantity}`;
        productLink.appendChild(quantityElement);

        const launchDateElement = document.createElement('div');
        launchDateElement.textContent = `Launch Date: ${this.launch_date}`;
        productLink.appendChild(launchDateElement);

        const categoryElement = document.createElement('div');
        categoryElement.textContent = `Category: ${this.category}`;
        productLink.appendChild(categoryElement);

        const developerIdElement = document.createElement('div');
        developerIdElement.textContent = `Developer ID: ${this.fk_developers_id}`;
        productLink.appendChild(developerIdElement);

        const supplierIdElement = document.createElement('div');
        supplierIdElement.textContent = `Supplier ID: ${this.fk_suppliers_id}`;
        productLink.appendChild(supplierIdElement);

        productElement.appendChild(productLink);
        return productElement;
    }
}