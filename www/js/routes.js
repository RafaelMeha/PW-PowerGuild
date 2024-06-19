const headerRouts = {
    'home': '/',
    'products': '/html/products.html',
    'faq': '/html/faq.html',
    'terms': '/html/terms.html',
    'privacy': '/html/privacy.html',
    'contact': '/html/contact.html',
    'wishlist': '/html/wishlist.html',
    'cart': '/html/cart.html',
    'ceo': '/html/ceo.html',
};

function navigateTo(routeName) {
    if (headerRouts.hasOwnProperty(routeName)) {
        const url = headerRouts[routeName];
        window.location.href = url;
    } else {
        console.error(`Route '${routeName}' not found`);
    }
}
