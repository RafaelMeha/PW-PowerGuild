class Platform {
    constructor(fk_platforms_id, fk_products_id) {
        this.fk_platforms_id = fk_platforms_id;
        this.fk_products_id = fk_products_id;
    }

    generateHtml() {
        const platformsElement = document.createElement('div');
        platformsElement.textContent = `Platforms: ${this.platforms}`;
        productLink.appendChild(platformsElement);
    }
}