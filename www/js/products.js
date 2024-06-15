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
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');

        const productLink = document.createElement('a');
        productLink.className = 'game-link';
        productLink.href = `http://localhost:3000/html/productDetail.html?id=${this.id}`;
        productLink.style.textDecoration = 'none';
        productLink.style.color = 'inherit';
        productLink.style.display = 'flex';
        productLink.style.alignItems = 'center';
        productLink.style.justifyContent = 'center';
        productLink.style.flexWrap = 'wrap';

        const nameElement = document.createElement('h2');       
        nameElement.textContent = this.name;
        nameElement.style.textAlign = 'center';
        nameElement.style.width = '100%';
        productLink.appendChild(nameElement);

        const imgElement = document.createElement('img');
        imgElement.src = `../assets/games/game.jpg`; 
        imgElement.alt = this.name;
        imgElement.classList.add('product-image');
        imgElement.style.marginRight = '20px';
        productLink.appendChild(imgElement);

        const infoContainer = document.createElement('div');

        const descriptionElement = document.createElement('div');
        descriptionElement.textContent = `Description: ${this.description}`;
        descriptionElement.style.marginTop = '5px'
        infoContainer.appendChild(descriptionElement);

        const discountElement = document.createElement('div');
        discountElement.textContent = `Discount: ${this.discount}`;
        discountElement.style.marginTop = '5px'
        infoContainer.appendChild(discountElement);

        const priceElement = document.createElement('div');
        priceElement.textContent = `Price: ${this.price}`;
        priceElement.style.marginTop = '5px'
        infoContainer.appendChild(priceElement);

        const quantityElement = document.createElement('div');
        quantityElement.textContent = `Quantity: ${this.quantity}`;
        quantityElement.style.marginTop = '5px'
        infoContainer.appendChild(quantityElement);

        const launchDateElement = document.createElement('div');
        launchDateElement.textContent = `Launch Date: ${this.launch_date}`;
        launchDateElement.style.marginTop = '5px'
        infoContainer.appendChild(launchDateElement);

        const typeElement = document.createElement('div');
        typeElement.style.marginTop = '5px'
        typeElement.textContent = `Type: ${this.type}`;
        infoContainer.appendChild(typeElement);

        const categoryElement = document.createElement('div');
        categoryElement.textContent = `Category: ${this.category}`;
        categoryElement.style.marginTop = '5px'
        infoContainer.appendChild(categoryElement);

        const developerIdElement = document.createElement('div');
        developerIdElement.textContent = `Developer ID: ${this.fk_developers_id}`;
        developerIdElement.style.marginTop = '5px'
        infoContainer.appendChild(developerIdElement);

        const supplierIdElement = document.createElement('div');
        supplierIdElement.textContent = `Supplier ID: ${this.fk_suppliers_id}`;
        supplierIdElement.style.marginTop = '5px'
        infoContainer.appendChild(supplierIdElement);

        productLink.appendChild(infoContainer);
        productElement.appendChild(productLink);
        return productElement;
    }
}
