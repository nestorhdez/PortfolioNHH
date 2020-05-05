const thumbnailIcon = (string) => `<i class="thumbnail-icon devicon-${string}"></i>`;

const htmlLinksProject = (project) => (`
  ${project.linksToProject.github ?  `<a title="Github" href="${project.linksToProject.github}" class="project__link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
  ${project.linksToProject.web ?  `<a title="Web site" href="${project.linksToProject.web}" class="project__link" target="_blank"><i class="fas fa-link"></i></a>` : ''}
`);

const htmlProjectImages = (img) => `<img class="project-img" data-src="${img}"></img>`;

const htmlLoader = 
  '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

const renderProjectImages = (project) => project.images.map(img => htmlProjectImages(img)).join(' ');

const slideImages = (slider, xCoord) =>
  slider.scrollBy({left: xCoord + slider.offsetWidth, behavior: 'smooth'});

const renderSliderBtns = (`
  <button class="arrow-img arrow-left"><i class="fas fa-chevron-left"></i></button>
  <button class="arrow-img arrow-right"><i class="fas fa-chevron-right"></i></button>
`);

const htmlProject = (project) => (`
  <div class="project">
    <div class="project-text ${project.id%2 == 0 ? ' reverse-text' : ''}">
      <div class="project__title-container">
        <h2 class="project__title">${project.title}</h2>
        <div class="project__tech-icons">
          ${project.skills.map(skill => thumbnailIcon(skill)).join(' ')}
        </div>
      </div>
      <div class="description-container">
        <p class="project__description">
          ${project.description}
        </p>
        <div class="project__links-container display-flex">
          ${htmlLinksProject(project)}
        </div>
      </div>
    </div>
    <div class="project-img-container ${project.id%2 !== 0 ? ' reverse-img' : ''}">
      <div id="project-slider-${project.id}" class="project-images">
        ${project.images.length > 1 ? renderSliderBtns : ''}
        <div class="project-img-placeholder">
          ${htmlLoader}
        </div>
        ${renderProjectImages(project)}
      </div>
    </div>
  </div>
`);

const renderProjects = (projects) => projects.forEach(project => document.querySelector('#projects-container').innerHTML += htmlProject(project));

const setSliderListener = (slider) => {
  let delay = false;

  slider.addEventListener('click', ({ target: { className } }) => {
    if(delay) {
      return;
    }
    const direction = className.includes('left') ? '-' : '+';
    slideImages(slider, direction);
    delay = true;
    setTimeout(() => delay = false, 450);
  });
}

//Intersection Observer

const intersection = () => {

  const isImage = ({ tagName }) => tagName === 'IMG';

  const setSrcAndAlt = (img) => {
    img.src = img.dataset.src;
    img.alt = 'Project-image';
  }

  const getChildByClass = (slider, className) => [...slider.children].find(el => el.className === className);

  const delayRemoveChild = (slider) => {
    if(getChildByClass(slider, 'project-img').complete) {
      setTimeout(() =>
        slider.removeChild(getChildByClass(slider, 'project-img-placeholder')), 200);
    }else {
      setTimeout(() => delayRemoveChild(slider), 200);
    }
  }
    
  const callback = (entries, observer) => {
    entries.forEach(({isIntersecting, intersectionRadio, target: slider}) => {
      if(isIntersecting || intersectionRadio > 0) {
        slider.childNodes.forEach(child => isImage(child) && setSrcAndAlt(child));
        delayRemoveChild(slider);
        observer.unobserve(slider);
        
        if(!isImage(slider.children[0])) {
          setSliderListener(slider);
        }
      }
    });
  }
    
  const observer = new IntersectionObserver(callback, { rootMargin: '0px 0px -250px 0px' });
  const target = document.querySelectorAll('.project-images');
  target.forEach( div => observer.observe(div));
}

export default async () => {
  fetch('./json/projects.json')
    .then(res => res.json())
    .then(res => {
      renderProjects(res);
      if(!!window.IntersectionObserver){
          intersection();
      }
    });
}
