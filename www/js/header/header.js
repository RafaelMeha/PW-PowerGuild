document.addEventListener('DOMContentLoaded', function () {
    fetch('header.html' && '../../header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').insertAdjacentHTML("beforeend", data);
        })
        .catch(error => console.error('Error loading header:', error));
});