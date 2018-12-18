//Generate hamburger menu effect

const hamburgerMenu = () => {
    let divClass = document.querySelector('#menu-hamb');
    if(divClass.className === 'cross') { 
        divClass.className = '';
        document.querySelector('#nav-mobile').setAttribute('style', 'display: none;');
        document.querySelector('#nav-mobile').className = '';
    } else {
        divClass.className = 'cross';
        document.querySelector('#nav-mobile').setAttribute('style', 'display: initial;');
        document.querySelector('#nav-mobile').className = 'menu-open';
    };
}

window.addEventListener('resize', () => {
    window.innerWidth >= 768 
    ? document.querySelector('#nav-mobile').setAttribute('style', 'display: none;')
    : document.querySelector('#menu-hamb').className = '';
});

document.querySelector('#menu-hamb').addEventListener('click', hamburgerMenu);

// Change navbar color on scroll

const navbarColor = () => {
    let navbar = document.querySelector('#navbar-container');
    document.documentElement.scrollTop > 50 
    ? navbar.setAttribute('style', 'background-color: #5394b3;') 
    : navbar.setAttribute('style', 'color: transparent');
}
window.onscroll = navbarColor;