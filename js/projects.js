const thumbnailIcon = (string) => {
    return (`
        <i class="thumbnail-icon devicon-${string}"></i>
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
    array.forEach(project => document.querySelector('#projects-container').innerHTML += htmlMiniatureProject(project));
}

fetch('./json/projects.json')
.then((res) => res.json())
.then((res) => renderProjects(res));