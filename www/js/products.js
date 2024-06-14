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

    generateHtml() {
        return `
            <li class="product-item">
                <h2><a href="productDetail.html?id=${this.id}">${this.name}</a></h2>
                <p>${this.description}</p>
                <div class="price-discount">
                    <p>$${this.price.toFixed(2)}</p>
                    <span>/</span>
                    <p class="discount">${this.discount}%</p>
                </div>
                <p>Quantity: ${this.quantity}</p>
                <p>Launch Date: ${this.launchDate.toDateString()}</p>
                <p>Type: ${this.type}</p>
                <p>Category: ${this.category}</p>
            </li>
        `;
    }
}