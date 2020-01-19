const navSelector = {
    root: document.documentElement,
    navbar: document.querySelector('#navbar-container'),
    hamburger: document.querySelector('#menu-hamb'),
    navMobile: document.querySelector('#nav-mobile')
}

const toggleNavColor = () => {
    navSelector.root.scrollTop > 100 || navSelector.hamburger.className === 'cross' ? 
        navSelector.root.style.setProperty('--bg-navbar', '#111') :
        navSelector.root.style.setProperty('--bg-navbar', 'transparent');
}

const toggleHamburgerMenu = () => {
    navSelector.navbar.classList.toggle('open');
    navSelector.navMobile.classList.toggle('show');
    navSelector.hamburger.classList.toggle('cross');
    toggleNavColor();
}

navSelector.hamburger.addEventListener('click', toggleHamburgerMenu);
navSelector.navMobile.addEventListener('click', toggleHamburgerMenu);
window.onscroll = toggleNavColor;
window.onresize = () => window.innerWidth >= 768 && navSelector.hamburger.className === 'cross' ?
    toggleHamburgerMenu() : '';