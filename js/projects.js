const thumbnailIcon = (string) => `<i class="thumbnail-icon devicon-${string}" title="${string.split('-')[0]}"></i>`;

const htmlLinksProject = (project) => (`
  ${project.linksToProject.github ?  `<a title="Github" href="${project.linksToProject.github}" class="project__link" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>` : ''}
  ${project.linksToProject.web ?  `<a title="Web site" href="${project.linksToProject.web}" class="project__link" target="_blank" rel="noopener noreferrer"><i class="fas fa-link"></i></a>` : ''}
`);

const htmlProjectImages = (img) => `<img class="project-img" data-src="${img}" alt="Project image"></img>`;

const htmlLoader = 
  '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

const renderProjectImages = (project) => project.images.map(img => htmlProjectImages(img)).join(' ');

const renderProjectVideo = (video) => (`
  <video preload="none" muted loop playsinline>
    <source src="${video}" type="video/mp4">
    Your browser does not support HTML video.
  </video>
`);

const slideImages = (slider, xCoord) =>
  slider.scrollBy({left: xCoord + slider.offsetWidth, behavior: 'smooth'});

const renderMediaBtns = (video, images) => {
  if(video){
    return (`
      <button class="play" aria-label="Play video button">
        <i class="far fa-play-circle" ${video.light ? 'style="color: white"' : ''}></i>
      </button>
      <button class="pause" aria-label="Stop video button">
        <i class="far fa-pause-circle pause-icon" ${video.light ? 'style="color: white"' : ''}></i>
      </button>
    `)
  } else if(images.length > 1){
    return (`
      <button class="arrow-img arrow-left" aria-label="Previous image button"><i class="fas fa-chevron-left"></i></button>
      <button class="arrow-img arrow-right" aria-label="Next image button"><i class="fas fa-chevron-right"></i></button>
    `)
  }
  return '';
};

const renderMedia = (project) => {
  return `
    <div id="project-slider-${project.id}" class="${project.video ? 'project-video' : 'project-images'}">
      ${renderMediaBtns(project.video, project.images)}
      <div class="project-img-placeholder">
        ${htmlLoader}
      </div>
      ${renderProjectImages(project)}
      ${project.video ? renderProjectVideo(project.video.path) : ''}
    </div>
  `
}

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
      ${renderMedia(project)}
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

    const [play, pause, thumbnail, video] = slider.children;
    
    if(video && video.tagName === 'VIDEO'){
      if(thumbnail.style.display !== "none") {
        thumbnail.style.display = "none";
        video.style.display = "initial";
      }

      if (video.paused){
        pause.style.display = "inline-block";
        play.style.display = "none"
        video.play();
      }else {
        pause.style.display = "none";
        play.style.display = "inline-block"
        video.pause();
      }

      return;
    }

    if(className.includes('left') || className.includes('right')){
      const direction = className.includes('left') ? '-' : '+';
      slideImages(slider, direction);
      delay = true;
      setTimeout(() => delay = false, 450);
    }
  });
}

//Intersection Observer

const intersection = () => {

  const isImg = ({ tagName }) => tagName === 'IMG';

  const setSrcAndAlt = (media) => {
    if(media.dataset.src){
      media.src = media.dataset.src;
      media.alt = 'Project-image';
    }
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
        slider.childNodes.forEach(child => isImg(child) && setSrcAndAlt(child));
        delayRemoveChild(slider);
        observer.unobserve(slider);
        
        if(!isImg(slider.children[0])) {
          setSliderListener(slider);
        }
      }
    });
  }
    
  const observer = new IntersectionObserver(callback, { rootMargin: '0px 0px 40px 0px' });
  const target = document.querySelectorAll('.project-img-container');
  target.forEach( div => observer.observe(div.children[0]));
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
