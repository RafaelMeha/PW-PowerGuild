window.onload = async function() {
    const itemsContainer = document.getElementById('items');

    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsData = await response.json();

        // Create Product instances and generate HTML
        productsData.forEach(productData => {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.discount,
                productData.price,
                productData.quantity,
                productData.launch_date, // Ensure to use the correct key from the API response
                productData.Type,
                productData.category,
                productData.fk_developers_id,
                productData.fk_suppliers_id
            );
            itemsContainer.innerHTML += product.generateHtml();
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
