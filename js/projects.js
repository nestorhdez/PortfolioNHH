//Generate projects cards
function htmlMiniatureProject(project) {
    let miniature = (`
        <div class="project-card" onclick="" ${project.order ? `style= "order: ${project.order}"` : ''}>
            <img class="project-img" src="${project.urlImage}" alt="${project.alt}">
            <div class="img-overlay">
                <div class="overlay-text">
                    <h3 class="overlay-title">${project.title}</h3>
                    <p class="overlay-description">${project.description}</p>
                </div>
                <a href="./html/project.html?id=${project.id}" class="link-project"><i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `);
    return miniature;
}

function renderProjects(array) {
    array.forEach(project => document.querySelector('#projects-container').innerHTML += htmlMiniatureProject(project));
}

fetch('./json/projects.json')
.then((res) => res.json())
.then((res) => renderProjects(res));