const thumbnailIcon = (string) => {
    return (`
        <i class="thumbnail-icon devicon-${string}"></i>
    `);
}
const htmlLinksProject = (project) => {
    return (`
       ${project.linksToProject.github ?  `<a title="Github" href="${project.linksToProject.github}" class="project__link" target="_blank"><i class="fab fa-github"></i></a>` : null}
       ${project.linksToProject.web ?  `<a title="Web site" href="${project.linksToProject.web}" class="project__link" target="_blank"><i class="fas fa-link"></i></a>` : null}
    `);
}

const htmlProjectImages = (img) => {
    return `<img class="project-img" src="${img}" alt="Project image"></img>`;
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
        <div class="project ${project.id%2 !== 0 ? ' reverse-text' : ''}">
            <div class="project-text">
                <div class="project__title-container">
                    <h2 class="project__title">${project.title}</h2>
                    <div class="project__tech-icons">
                        ${project.skills.map(skill => thumbnailIcon(skill)).join(' ')}
                    </div>
                </div>
                <div class="description-container">
                    <p class="project__description">
                        ${project.detailDescription}
                    </p>
                    <div class="project__links-container display-flex">
                        ${htmlLinksProject(project)}
                        <a href="./html/project.html?id=${project.id}" title="Detail information" class="more-info project__link"><i class="fas fa-info-circle"></i></a>
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

//Generate projects cards
const htmlMiniatureProject = (project) => {
    let miniature = (`
        <div class="project-card" onclick="" ${project.order ? `style= "order: ${project.order}"` : ''}>
            <img class="project-img" src="${project.urlImage}" alt="${project.alt}">
            <div class="img-overlay">
                <div class="overlay-text">
                    <h3 class="overlay-title">${project.title}</h3>
                    <div class="thumbnail-skills-container">
                        ${project.skills.map(skill => thumbnailIcon(skill)).join(' ')}
                    </div>
                </div>
                <a href="./html/project.html?id=${project.id}" class="link-project"><i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `);
    return miniature;
}

const renderProjects = (array) => {
    array.forEach(project => document.querySelector('#projects-container').innerHTML += htmlProject(project));
}

fetch('./json/projects.json')
.then((res) => res.json())
.then((res) => renderProjects(res));