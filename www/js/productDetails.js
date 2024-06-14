window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        console.error('No product ID specified in URL');
        return;
    }

    try {
        const response = await fetch(`/api/products/:${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productData = await response.json();

        // Exibir os detalhes do produto
        const productContainer = document.getElementById('products-details');
        productContainer.innerHTML = `
            <h1>${productData.name}</h1>
            <p>${productData.description}</p>
            <p>Price: $${productData.price.toFixed(2)}</p>
            <p>Discount: ${productData.discount}%</p>
            <p>Quantity: ${productData.quantity}</p>
            <p>Launch Date: ${new Date(productData.launch_date).toDateString()}</p>
            <p>Type: ${productData.Type}</p>
            <p>Category: ${productData.category}</p>
        `;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}