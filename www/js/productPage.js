window.onload = async function() {
    const itemsContainer = document.getElementById('items')

    try {
        const response = await fetch('/api/products')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const productsData = await response.json()

        productsData.forEach(productData => {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.discount,
                productData.price,
                productData.quantity,
                productData.launch_date,
                productData.Type,
                productData.category,
                productData.fk_developers_id,
                productData.fk_suppliers_id
            )
            const productElement = product.generateHtml()
            itemsContainer.appendChild(productElement);
        })
    } catch (error) {
        console.error('Error fetching products:', error)
    }
}

async function filter(filterType, filter) {
    const itemsContainer = document.getElementById('items')
    itemsContainer.innerHTML = ''

    try {
        const response = await fetch('/api/products')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const productsData = await response.json()

       switch(filterType) {
        case 'category':
            var shooterProducts = productsData.filter(product  => product.category.toLowerCase() == filter.toLowerCase())
            break
       }

        shooterProducts.forEach(productData => {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.discount,
                productData.price,
                productData.quantity,
                productData.launchDate,
                productData.category,
                productData.fkDevelopersId,
                productData.fkSuppliersId,
                productData.image,
                productData.genre
            )
            itemsContainer.innerHTML += product.generateHtml()
        })
    } catch (error) {
        console.error('Error fetching products:', error)
    }
}
async function searchGame() {
    const itemsContainer = document.getElementById('items')
    itemsContainer.innerHTML = ''

    const searchGame = document.getElementById('search-game').value.toLowerCase()

    try {
        const response = await fetch('/api/products')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const productsData = await response.json()

        const shooterProducts = productsData.filter(x => x.name.toLowerCase().includes(searchGame))

        shooterProducts.forEach(productData => {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.discount,
                productData.price,
                productData.quantity,
                productData.launchDate,
                productData.category,
                productData.fkDevelopersId,
                productData.fkSuppliersId,
                productData.image,
                productData.genre
            )
            itemsContainer.innerHTML += product.generateHtml()
        })
    } catch (error) {
        console.error('Error fetching products:', error)
    }
};