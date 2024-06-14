window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const itemsContainer = document.getElementById('items');
   
    try {
        if (productId === '') {
            await fetchAndDisplayProducts();
        } else {
            const response = await fetch(`/api/products/${productId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    itemsContainer.innerHTML = `No game with id: ${productId}`;
                } else {
                    throw new Error('Network response was not ok');
                }
            } else {
                const productData = await response.json();
                itemsContainer.innerHTML = '';
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
                );
                itemsContainer.innerHTML += product.generateHtml()
            }
        }
    } catch (error) {
        console.error('Error searching product:', error);
    }
}