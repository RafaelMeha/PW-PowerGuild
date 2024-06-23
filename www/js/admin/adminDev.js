window.onload = async function() {
    const itemsContainer = document.getElementById('developers');
    const addProductForm = document.getElementById('addUserForm');
    const searchForm = document.getElementById('searchForm');

    async function fetchAndDisplayDevelopers() {
        try {
            const response = await fetch('/api/developers');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const developersData = await response.json();
            clearElement(itemsContainer);

            developersData.forEach(developerData => {
                const distributor = new Developer(
                    developerData.id,
                    developerData.name,
                    developerData.location,
                    developerData.contact_email
                );
                const DistributorElement = distributor.generateHtml();

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.dataset.id = distributor.id;
                deleteButton.textContent = 'Delete';
                DistributorElement.appendChild(deleteButton);

                itemsContainer.appendChild(DistributorElement);
            });
            addDeleteEventListeners();
        } catch (error) {
            console.error('Error fetching distributors:', error);
        }
    }

    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    addProductForm.onsubmit = async function(event) {
        event.preventDefault();
        const newDistributor = {
            name: document.getElementById('name').value,
            location: document.getElementById('location').value,
            contact_email: document.getElementById('contact_email').value
        };
        try {
            const response = await fetch('/api/developers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDistributor)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await fetchAndDisplayDevelopers();
            addProductForm.reset();
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    function addDeleteEventListeners() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = async function() {
                const distributorId = this.getAttribute('data-id');
                try {
                    const response = await fetch(`/api/developers/${distributorId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    await fetchAndDisplayDevelopers();
                } catch (error) {
                    console.error('Error deleting review:', error);
                }
            };
        });
    }

    searchForm.onsubmit = async function(event) {
        event.preventDefault();
        const developerId = document.getElementById('searchId').value;
        try {
            if (developerId === '') {
                await fetchAndDisplayDevelopers();
            } else {
                const response = await fetch(`/api/developers/${developerId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        clearElement(itemsContainer);
                        const noGameMessage = document.createElement('div');
                        noGameMessage.textContent = `No review with id: ${developerId}`;
                        itemsContainer.appendChild(noGameMessage);
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } else {
                    const developerData = await response.json();
                    clearElement(itemsContainer);
                    const distributor = new Developer(
                        developerData.id,
                        developerData.name,
                        developerData.location,
                        developerData.contact_email,
                    );
                    const DistributorElement = distributor.generateHtml();

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'delete-btn';
                    deleteButton.dataset.id = distributor.id;
                    deleteButton.textContent = 'Delete';
                    DistributorElement.appendChild(deleteButton);
        
                    itemsContainer.appendChild(DistributorElement);
                    addDeleteEventListeners();
                }
            }
        } catch (error) {
            console.error('Error searching Distributor:', error);
        }
    };
    fetchAndDisplayDevelopers();
};