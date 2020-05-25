const { root, navbar, hamburger, linksContainer } = {
    root: document.documentElement,
    navbar: document.querySelector('#navbar-container'),
    hamburger: document.querySelector('#menu-hamb'),
    linksContainer: document.querySelector('#nav-links-container')
}

const toggleNavColor = () =>
    root.scrollTop > 100 || hamburger.className === 'cross' ? 
        navbar.classList.add('show') : navbar.classList.remove('show');

const toggleHamburgerMenu = () => {
    if(window.innerWidth < 768 || hamburger.className === 'cross') {
        navbar.classList.toggle('open');
        linksContainer.classList.toggle('show');
        hamburger.classList.toggle('cross');
        setTimeout(toggleNavColor, 300);
    }
}

export default () => {
    hamburger.addEventListener('click', toggleHamburgerMenu);
    linksContainer.addEventListener('click', toggleHamburgerMenu);
    window.onscroll = toggleNavColor;
    window.onresize = () => window.innerWidth >= 768 && hamburger.className === 'cross' ?
        toggleHamburgerMenu() : '';
}