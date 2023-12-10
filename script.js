// Function to toggle the visibility of the mobile menu
function toggleMenu() {
    // Selecting the menu and icon elements using their classes
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');

    // Toggling the 'open' class to show/hide the menu
    menu.classList.toggle('open');
    
    // Toggling the 'open' class to change the appearance of the hamburger icon
    icon.classList.toggle('open');
}
