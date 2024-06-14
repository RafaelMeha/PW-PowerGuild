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
                    clearElement(itemsContainer);
                    const noGameMessage = document.createElement('div');
                    noGameMessage.textContent = `No game with id: ${productId}`;
                    itemsContainer.appendChild(noGameMessage);
                } else {
                    throw new Error('Network response was not ok');
                }
            } else {
                const productData = await response.json();
                clearElement(itemsContainer);
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
                const productElement = product.generateHtml();
                itemsContainer.appendChild(productElement);
            }
        }
    } catch (error) {
        console.error('Error searching product:', error);
    }
};

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}