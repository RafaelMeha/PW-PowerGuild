window.onload = async function() {
    const itemsContainer = document.getElementById('users');
    const addProductForm = document.getElementById('addUserForm');
    const searchForm = document.getElementById('searchForm');

    async function fetchAndDisplayUsers() {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const usersData = await response.json();
            clearElement(itemsContainer);

            usersData.forEach(userData => {
                const user = new User(
                    userData.id,
                    userData.name,
                    userData.email,
                    userData.pwd
                );
                const userElement = user.generateHtml();

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.dataset.id = user.id;
                deleteButton.textContent = 'Delete';
                userElement.appendChild(deleteButton);

                itemsContainer.appendChild(userElement);
            });
            addDeleteEventListeners();
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    addProductForm.onsubmit = async function(event) {
        event.preventDefault();
        const newUser = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            pwd: document.getElementById('password').value
        };
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await fetchAndDisplayUsers();
            addProductForm.reset();
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    function addDeleteEventListeners() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = async function() {
                const userId = this.getAttribute('data-id');
                try {
                    const response = await fetch(`/api/users/${userId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    await fetchAndDisplayUsers();
                } catch (error) {
                    console.error('Error deleting review:', error);
                }
            };
        });
    }

    searchForm.onsubmit = async function(event) {
        event.preventDefault();
        const usersId = document.getElementById('searchId').value;
        try {
            if (usersId === '') {
                await fetchAndDisplayUsers();
            } else {
                const response = await fetch(`/api/users/${usersId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        clearElement(itemsContainer);
                        const noGameMessage = document.createElement('div');
                        noGameMessage.textContent = `No review with id: ${usersId}`;
                        itemsContainer.appendChild(noGameMessage);
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } else {
                    const userData = await response.json();
                    clearElement(itemsContainer);
                    const user = new User(
                        userData.id,
                        userData.name,
                        userData.email,
                        userData.pwd,
                    );
                    const userElement = user.generateHtml();

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'delete-btn';
                    deleteButton.dataset.id = user.id;
                    deleteButton.textContent = 'Delete';
                    userElement.appendChild(deleteButton);

                    itemsContainer.appendChild(userElement);
                    addDeleteEventListeners();
                }
            }
        } catch (error) {
            console.error('Error searching user:', error);
        }
    };
    fetchAndDisplayUsers();
};