class Developer { 
    constructor(id, name, location, contact_email) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.contact_email = contact_email;
    }

    generateHtml() {
        const userElement = document.createElement('div');
        userElement.classList.add('dis-item');

        const nameElement = document.createElement('div');
        nameElement.textContent = `name: ${this.name}`;
        userElement.appendChild(nameElement);

        const locationElement = document.createElement('div'); 
        locationElement.textContent = `Location: ${this.location}`;
        userElement.appendChild(locationElement);

        const contact_emailElement = document.createElement('div'); 
        contact_emailElement.textContent = `Contact Email: ${this.contact_email}`;
        userElement.appendChild(contact_emailElement);
        
        return userElement;
    }
}