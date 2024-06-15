class Platform {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    generateHtml() {
        const platforms = document.createElement('h3')
        platforms.textContent = `Platform: ${this.name}`
        
        return platforms
    }
}