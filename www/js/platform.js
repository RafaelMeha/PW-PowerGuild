class Platform {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    generateHtml() {
        const userElement = document.createElement('div');
        userElement.classList.add('dis-item');

        const nameElement = document.createElement('div');
        nameElement.textContent = `name: ${this.name}`;
        userElement.appendChild(nameElement);
        
        return userElement;
    }
}