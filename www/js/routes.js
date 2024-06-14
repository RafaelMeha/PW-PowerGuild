const routes = {
    'home': '/',
    'shop': '/html/products.html',
    'community': '/html/Menu/community.html',
    'faq': '/html/Settings/faq.html',
    'terms': '/html/Settings/terms.html',
    'privacy': '/html/Settings/privacy.html',
    'contact': '/html/Settings/contact.html',
    'ceo': '/html/ceo.html',
    'profile': '/html/Menu/profile.html'
};

function navigateTo(routeName) {
    if (routes.hasOwnProperty(routeName)) {
        const url = routes[routeName];
        window.location.href = url;
    } else {
        console.error(`Route '${routeName}' not found`);
    }
}