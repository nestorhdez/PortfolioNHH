//Generate projects cards
function htmlMiniatureProject(project) {
    let miniature = (`
        <div class="project-card">
            <img class="project-img" src="${project.urlImage}" alt="${project.alt}">
            <div class="img-overlay">
                <h1 class="overlay-title">${project.title}</h1>
                <p class="overlay-description">${project.description}</p>
            </div>
        </div>
    `);
    return miniature;
}

function renderProjects(array) {
    array.forEach(project => document.querySelector('#projects-container').innerHTML += htmlMiniatureProject(project));
}

fetch('./projects-data/projects.json')
.then((res) => res.json())
.then((res) => renderProjects(res));