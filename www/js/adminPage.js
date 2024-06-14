window.onload = async function() {
    const itemsContainer = document.getElementById('items');
    const addProductForm = document.getElementById('addProductForm');

    async function fetchAndDisplayProducts() {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const productsData = await response.json();
            itemsContainer.innerHTML = '';
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
                );
                itemsContainer.innerHTML += product.generateHtml() + `<button class="delete-btn" data-id="${product.id}">Delete</button>`;
            });
            addDeleteEventListeners();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    addProductForm.onsubmit = async function(event) {
        event.preventDefault();
        const newProduct = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            discount: document.getElementById('discount').value,
            price: document.getElementById('price').value,
            quantity: document.getElementById('quantity').value,
            launch_date: document.getElementById('launchDate').value,
            Type: document.getElementById('type').value,
            category: document.getElementById('category').value,
            fk_developers_id: document.getElementById('fkDevelopersId').value,
            fk_suppliers_id: document.getElementById('fkSuppliersId').value
        };
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await fetchAndDisplayProducts();
            addProductForm.reset();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    function addDeleteEventListeners() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = async function() {
                const productId = this.getAttribute('data-id');
                try {
                    const response = await fetch(`/api/products/${productId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    await fetchAndDisplayProducts();
                } catch (error) {
                    console.error('Error deleting product:', error);
                }
            };
        });
    }

    fetchAndDisplayProducts();
};
