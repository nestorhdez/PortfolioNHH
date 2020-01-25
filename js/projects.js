const thumbnailIcon = (string) => `<i class="thumbnail-icon devicon-${string}"></i>`;

const htmlLinksProject = (project) => (`
    ${project.linksToProject.github ?  `<a title="Github" href="${project.linksToProject.github}" class="project__link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
    ${project.linksToProject.web ?  `<a title="Web site" href="${project.linksToProject.web}" class="project__link" target="_blank"><i class="fas fa-link"></i></a>` : ''}
`);

const htmlProjectImages = (img) => `<img class="project-img" data-src="${img}"></img>`;

const renderProjectImages = (project) => project.images.map(img => htmlProjectImages(img)).join(' ');

const delayBtn = (btn) => {
    btn.disabled = true;
    setTimeout(() => btn.disabled = false, 450);
}

const imgSlider = (element, xCoord) => {
    const slider = document.querySelector(element);
    slider.childNodes.forEach(node => node.className && node.className.includes('arrow-img') && delayBtn(node));
    document.querySelector(element).scrollBy({left: xCoord + slider.offsetWidth, behavior: 'smooth'});
}

const renderSliderBtns = (project) => (`
    <button onClick="imgSlider('#project-slider-${project.id}', '-')" class="arrow-img arrow-left"><i class="fas fa-chevron-left"></i></button>
    <button onClick="imgSlider('#project-slider-${project.id}', '+')" class="arrow-img arrow-right"><i class="fas fa-chevron-right"></i></button>
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
                ${project.images.length > 1 ? renderSliderBtns(project) : ''}
                ${renderProjectImages(project)}
            </div>
        </div>
    </div>
`);

const renderProjects = (projects) => projects.forEach(project => document.querySelector('#projects-container').innerHTML += htmlProject(project));

//Intersection Observer

const intersection = () => {

    const isImage = (node) => node.className == 'project-img';

    const setSrcAndAlt = (img) => {
        img.src = img.dataset.src;
        img.alt = 'Project-image';
    }
    
    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting || entry.intersectionRadio > 0){
                entry.target.childNodes.forEach(child => isImage(child) ? setSrcAndAlt(child) : '');
                observer.unobserve(entry.target);
            }
        })
    }
    
    const observer = new IntersectionObserver(callback, { rootMargin: '0px 0px -200px 0px' });
    const target = document.querySelectorAll('.project-images');
    target.forEach( div => observer.observe(div));
}


fetch('./json/projects.json')
.then((res) => res.json())
.then((res) => {
    renderProjects(res);
    if(!!window.IntersectionObserver){
        intersection();
    }
});