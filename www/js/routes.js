const routes = {
    'home': '/',
    'products': '/html/products.html'
};

function navigateTo(routeName) {
    if (routes.hasOwnProperty(routeName)) {
        const url = routes[routeName];
        window.location.href = url;
    } else {
        console.error(`Route '${routeName}' not found`);
    }
}
