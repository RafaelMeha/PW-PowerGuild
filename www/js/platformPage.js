// window.onload = async function() {
//     const itemsContainer = document.getElementById('platforms');

//     try {
//         const response = await fetch('/api/platforms');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const platformsData = await response.json();

//         platformsData.forEach(platformData => {
//             const platform = new Platform(
//                 platformData.id,
//                 platformData.name
//             );
//             const platformElement = platform.generateHtml();
//             itemsContainer.appendChild(platformElement);
//         });
//     } catch (error) {
//         console.error('Error fetching platforms:', error);
//     }
// };