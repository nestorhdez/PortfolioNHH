//Generate hamburger menu effect
function hamburgerMenu() {
    let divClass = document.querySelector('#menu-hamb');
    let navbar = document.querySelector('#navbar-container');
    let navbarMobile = document.querySelector('#nav-mobile');
    
    if(divClass.className === 'cross') { 
        divClass.className = '';
        navbarMobile.setAttribute('style', 'display: none;');
        navbarMobile.className = '';
        document.documentElement.scrollTop < 50 ? navbar.setAttribute('style', 'background-color: transparent') : '';
    } else {
        divClass.className = 'cross';
        navbarMobile.setAttribute('style', 'display: initial;');
        navbarMobile.className = 'menu-open';
        document.documentElement.scrollTop < 50 ? navbar.setAttribute('style', 'background-color: #111') : '';
    };
}

window.addEventListener('resize', () => {
    window.innerWidth >= 768 
    ? document.querySelector('#nav-mobile').setAttribute('style', 'display: none;')
    : document.querySelector('#menu-hamb').className = '';
});

document.querySelector('#menu-hamb').addEventListener('click', hamburgerMenu);

// Change navbar color on scroll
function navbarColor() {
    let navbar = document.querySelector('#navbar-container');
    document.documentElement.scrollTop > 50 
    ? navbar.setAttribute('style', 'background-color: #111;') 
    : navbar.setAttribute('style', 'background-color: transparent');
}
window.onscroll = navbarColor;