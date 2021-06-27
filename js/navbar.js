import { switchTheme } from './theme.js';

const { root, navbar, hamburger, linksContainer, toggle } = {
    root: document.documentElement,
    navbar: document.querySelector('#navbar-container'),
    hamburger: document.querySelector('#menu-hamb'),
    linksContainer: document.querySelector('#nav-links-container'),
    toggle: document.getElementById('theme-switcher')
}

const toggleNavColor = () => {
    const scrollOrMobile = root.scrollTop > 100 || hamburger.className === 'cross';
    const isLightTheme = !toggle.checked;

    if(scrollOrMobile) {
        navbar.classList.add('show');
        navbar.classList.remove('transparent');
    } else {
        isLightTheme
            ? navbar.classList.add('transparent')
            : navbar.classList.remove('transparent');

        navbar.classList.remove('show');
    }
}

const toggleHamburgerMenu = () => {
    if(window.innerWidth < 768 || hamburger.className === 'cross') {
        navbar.classList.toggle('open');
        linksContainer.classList.toggle('show');
        hamburger.classList.toggle('cross');
        setTimeout(toggleNavColor, 300);
    }
}

(() => {
    toggleNavColor();
    hamburger.addEventListener('click', toggleHamburgerMenu);
    linksContainer.addEventListener('click', toggleHamburgerMenu);
    window.onscroll = toggleNavColor;
    window.onresize = () => window.innerWidth >= 768 && hamburger.className === 'cross' ?
        toggleHamburgerMenu() : '';

    // Theme logic
    switchTheme();
    toggle.addEventListener('change', () => {
        switchTheme();
        toggleNavColor();
    });
})();