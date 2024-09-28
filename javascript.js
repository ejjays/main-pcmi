
let lastScrollTop = 0;
let isMenuVisible = true; // State to track visibility
const bottomMenu = document.getElementById('bottom-menu');
const contentContainer = document.getElementById('content-container');
const contentFrame = document.getElementById('content-frame');
const downIcon = document.getElementById('down-icon');
const upIcon = document.getElementById('up-icon');

contentContainer.addEventListener('scroll', function() {
    let scrollTop = contentContainer.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        bottomMenu.style.transform = 'translateY(100%)'; // Hide the menu
        contentFrame.style.height = '100%'; // Full height for the iframe
        downIcon.style.display = 'block';
        upIcon.style.display = 'none';
    } else {
        // Scrolling up
        bottomMenu.style.transform = 'translateY(0)'; // Show the menu
        contentFrame.style.height = 'calc(100% - 50px)'; // Adjust iframe height based on menu
        downIcon.style.display = 'none';
        upIcon.style.display = 'block';
    }
    lastScrollTop = scrollTop;
});

function loadPage(url, width, height, activeIndex) {
    document.getElementById('loading').style.display = 'block'; // Display loading indicator
    var iframe = document.getElementById('content-frame');

    iframe.onload = function() {
        document.getElementById('loading').style.display = 'none'; // Hide loading indicator
    };
    
    iframe.src = url;
    iframe.style.width = width;
    iframe.style.height = height;
    updateActiveMenu(activeIndex);
}

function updateActiveMenu(index) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active'); // Mark active menu item
        } else {
            item.classList.remove('active');
        }
    });
}

function toggleMenu() {
    if (isMenuVisible) {
        bottomMenu.style.transform = 'translateY(100%)'; // Hide the menu
        bottomMenu.style.opacity = '0'; // Set opacity to 0 for smooth fade out
        contentFrame.style.height = '100vh'; // Set iframe to full viewport height when menu is hidden
        downIcon.style.display = 'none';
        upIcon.style.display = 'block';
    } else {
        bottomMenu.style.transform = 'translateY(0)'; // Show the menu
        bottomMenu.style.opacity = '1'; // Set opacity to 1 for smooth fade in
        contentFrame.style.height = 'calc(100vh - 50px)'; // Adjust height for menu (50px is the height of the menu)
        downIcon.style.display = 'block';
        upIcon.style.display = 'none';
    }
    isMenuVisible = !isMenuVisible; // Toggle menu visibility state
}