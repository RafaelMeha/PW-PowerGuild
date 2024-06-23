class Distributor { 
    constructor(id, name, price, location) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.location = location;
    }

    generateHtml() {
        const userElement = document.createElement('div');
        userElement.classList.add('dis-item');

        const nameElement = document.createElement('div');
        nameElement.textContent = `name: ${this.name}`;
        userElement.appendChild(nameElement);

        const priceElement = document.createElement('div'); 
        priceElement.textContent = `Prie: ${this.price}`;
        userElement.appendChild(priceElement);

        const locationElement = document.createElement('div'); 
        locationElement.textContent = `Location: ${this.location}`;
        userElement.appendChild(locationElement);
        
        return userElement;
    }
}