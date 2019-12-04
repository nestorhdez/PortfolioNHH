//Generate hamburger menu effect
function hamburgerMenu() {
    let divClass = document.querySelector('#menu-hamb');
    let navbar = document.querySelector('#navbar-container');
    let navbarMobile = document.querySelector('#nav-mobile');
    
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

window.addEventListener('resize', () => {
    if(window.innerWidth >= 768){
        document.querySelector('#nav-mobile').setAttribute('style', 'display: none;');
        document.querySelector('#menu-hamb').className = '';
    }
});

// Change navbar color on scroll
function navbarColor() {
    let navbar = document.querySelector('#navbar-container');
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

document.querySelector('#menu-hamb').addEventListener('click', hamburgerMenu);
document.querySelector('#nav-mobile').addEventListener('click', hamburgerMenu);
window.onscroll = navbarColor;