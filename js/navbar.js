//Generate hamburger menu effect
function hamburgerMenu() {
    const divClass = document.querySelector('#menu-hamb');
    const navbar = document.querySelector('#navbar-container');
    const navbarMobile = document.querySelector('#nav-mobile');
    
    if(divClass.className === 'cross') { 
        divClass.className = '';
        navbar.className = 'menu-animation-close';
        document.documentElement.scrollTop < 50 ? navbar.setAttribute('style', 'background-color: transparent') : '';
    } else {
        divClass.className = 'cross';
        navbarMobile.setAttribute('style', 'display: initial;');
        navbar.className = 'menu-animation-open';
        document.documentElement.scrollTop < 50 ? navbar.setAttribute('style', 'background-color: #111') : '';
    };
}

// Change navbar color on scroll
function navbarColor() {
    const navbar = document.querySelector('#navbar-container');
    if(document.documentElement.scrollTop > 50){
        navbar.setAttribute('style', 'background-color: #111;')
    }else {
        if(document.querySelector('#menu-hamb').className === ''){
            navbar.setAttribute('style', 'background-color: transparent');
        }
    }
}

// Change navbar depends the width of the screen
window.addEventListener('resize', () => {
    if(window.innerWidth >= 768){
        document.querySelector('#nav-mobile').setAttribute('style', 'display: none;');
        document.querySelector('#menu-hamb').className = '';
    }
});

// Set the height of the mobile navbar
setTimeout(() => {
    const navbarHeight = document.querySelector('#navbar-container').clientHeight;
    const linksContainer = document.querySelector('#nav-mobile');
    const linksHeight = linksContainer.clientHeight;
    const linksMargin = +window.getComputedStyle(linksContainer).getPropertyValue('margin-top').split('px')[0];
    document.documentElement.style.setProperty('--nav-mobile-height', `${navbarHeight + linksHeight + linksMargin}px`);
}, 500);

document.querySelector('#menu-hamb').addEventListener('click', hamburgerMenu);
document.querySelector('#nav-mobile').addEventListener('click', hamburgerMenu);
window.onscroll = navbarColor;