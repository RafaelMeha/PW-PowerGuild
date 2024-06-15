const routes = {
    'home': '/',
    'products': '/html/products.html',
    'faq': '/html/products.html',
    'terms': '/html/terms.html',
    'privacy': '/html/privacy.html',
    'contact': '/html/contact.html',
    'ceo': '/html/cep.html',
};

function navigateTo(routeName) {
    if (routes.hasOwnProperty(routeName)) {
        const url = routes[routeName];
        window.location.href = url;
    } else {
        console.error(`Route '${routeName}' not found`);
    }
}
