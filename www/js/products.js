class Product {
    constructor(id, name, description, discount, price, quantity, launchDate, type, category, fkDevelopersId, fkSuppliersId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.discount = discount;
        this.price = price;
        this.quantity = quantity;
        this.launchDate = new Date(launchDate);
        this.type = type;
        this.category = category;
        this.fkDevelopersId = fkDevelopersId;
        this.fkSuppliersId = fkSuppliersId;
    }

    // Method to generate HTML for the product
    generateHtml() {
        return `
            <li class="product-item">
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p>Price: $${this.price.toFixed(2)}</p>
                <p>Discount: ${this.discount}%</p>
                <p>Quantity: ${this.quantity}</p>
                <p>Launch Date: ${this.launchDate.toDateString()}</p>
                <p>Type: ${this.type}</p>
                <p>Category: ${this.category}</p>
            </li>
        `;
    }
}
