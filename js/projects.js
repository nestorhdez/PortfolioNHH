const thumbnailIcon = (string) => {
    return (`
        <i class="thumbnail-icon devicon-${string}"></i>
    `);
}
const htmlLinksProject = (project) => {
    return (`
       ${project.linksToProject.github ?  `<a title="Github" href="${project.linksToProject.github}" class="project__link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
       ${project.linksToProject.web ?  `<a title="Web site" href="${project.linksToProject.web}" class="project__link" target="_blank"><i class="fas fa-link"></i></a>` : ''}
    `);
}

const htmlProjectImages = (img) => {
    return `<img class="project-img" data-src="${img}"></img>`;
}

const renderProjectImages = (project) => {
    let images = project.images.map(img => htmlProjectImages(img)).join(' ');
    return images;
}

const imgSlider = (element, xCoord) => {
    let width = document.querySelector(element).offsetWidth;
    document.querySelector(element).scrollBy({left: xCoord + width, behavior: 'smooth'});
}
const renderSliderBtns = (project) => {
return (`
    <button onClick="imgSlider('#project-slider-${project.id}', '-')" class="arrow-img arrow-left"><i class="fas fa-chevron-left"></i></button>
    <button onClick="imgSlider('#project-slider-${project.id}', '+')" class="arrow-img arrow-right"><i class="fas fa-chevron-right"></i></button>
`);
}

const htmlProject = (project) => {
    return (`
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
}

const renderProjects = (array) => {
    array.forEach(project => document.querySelector('#projects-container').innerHTML += htmlProject(project));
}

//Intersection Observer

const intersection = () => {

    const options = {
        rootMargin: '0px 0px -200px 0px',
    }

    const isImage = (node) => {
        return node.className == 'project-img';
    }

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
    
    let observer = new IntersectionObserver(callback, options);
    let target = document.querySelectorAll('.project-images');
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