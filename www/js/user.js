class User { 
    constructor(id, name, email, pwd) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.pwd = pwd;
    }

    generateHtml() {
        const userElement = document.createElement('div');
        userElement.classList.add('user-item');

        const nameElement = document.createElement('div');
        nameElement.textContent = `name: ${this.name}`;
        userElement.appendChild(nameElement);

        const emailElement = document.createElement('div'); 
        emailElement.textContent = `Email: ${this.email}`;
        userElement.appendChild(emailElement);

        const passwordElement = document.createElement('div'); 
        passwordElement.textContent = `Password: ${this.pwd}`;
        userElement.appendChild(passwordElement);
        
        return userElement;
    }
}