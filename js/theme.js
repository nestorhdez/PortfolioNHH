const root = document.documentElement;
const toggle = document.getElementById('theme-switcher');

const colors = {
  white: '#fff',
  blue: '#111216',
  black: '#111',
  gray: '#373c41',
  transparent: 'transparent'
}

const switchColor = (cssVar, color) => {
  root.style.setProperty(cssVar, color);
}

const cssVariables = [
  '--white-black',
  '--black-white',
  '--blue-white',
  '--white-blue',
  '--black-blue',
  '--transparent-gray'
];

const switchTheme = () => {
  for (const cssVar of cssVariables) {
    // Split variable into the two colors and get the 1st or 2nd
    const color = cssVar.split( /[^A-Za-z]/g ).filter(Boolean)[+toggle.checked];
    switchColor(cssVar, colors[color]);
  }
}

export default () => {
  switchTheme();
  toggle.addEventListener('change', switchTheme);
}
