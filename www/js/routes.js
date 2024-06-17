const routes = {
    'home': '/',
    'products': '/html/products.html',
    'faq': '/html/faq.html',
    'terms': '/html/terms.html',
    'privacy': '/html/privacy.html',
    'contact': '/html/contact.html',
    'wishlist': '/html/wishlist.html',
    'ceo': '/html/ceo.html',
};

function navigateTo(routeName) {
    if (routes.hasOwnProperty(routeName)) {
        const url = routes[routeName];
        window.location.href = url;
    } else {
        console.error(`Route '${routeName}' not found`);
    }
}
