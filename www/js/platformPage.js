// window.onload = async function() {
//     const itemsContainer = document.get('items');

//     try {
//         const response = await fetch('/api/platforms');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const platformsData = await response.json();

//         platformsData.forEach(platformData => {
//             const platform = new Platform(
//                 platformData.fk_platforms_id,
//                 platformData.fk_products_id
//             );
//             const platformElement = platform.generateHtml();
//             itemsContainer.appendChild(platformElement);
//         });
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }
// };