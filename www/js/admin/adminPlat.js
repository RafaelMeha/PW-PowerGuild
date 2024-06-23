window.onload = async function() {
    const itemsContainer = document.getElementById('distributors');
    const addProductForm = document.getElementById('addUserForm');
    const searchForm = document.getElementById('searchForm');

    async function fetchAndDisplayPlatforms() {
        try {
            const response = await fetch('/api/platforms');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const distributorsData = await response.json();
            clearElement(itemsContainer);

            distributorsData.forEach(distributorData => {
                const distributor = new Platform(
                    distributorData.id,
                    distributorData.name,
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
        };
        try {
            const response = await fetch('/api/platforms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDistributor)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await fetchAndDisplayPlatforms();
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
                    const response = await fetch(`/api/platforms/${distributorId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    await fetchAndDisplayPlatforms();
                } catch (error) {
                    console.error('Error deleting review:', error);
                }
            };
        });
    }

    searchForm.onsubmit = async function(event) {
        event.preventDefault();
        const distributorsId = document.getElementById('searchId').value;
        try {
            if (distributorsId === '') {
                await fetchAndDisplayPlatforms();
            } else {
                const response = await fetch(`/api/platforms/${distributorsId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        clearElement(itemsContainer);
                        const noGameMessage = document.createElement('div');
                        noGameMessage.textContent = `No review with id: ${distributorsId}`;
                        itemsContainer.appendChild(noGameMessage);
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } else {
                    const distributorData = await response.json();
                    clearElement(itemsContainer);
                    const distributor = new Platform(
                        distributorData.id,
                        distributorData.name,
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
    fetchAndDisplayPlatforms();
};