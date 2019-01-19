//Generate projects cards
function htmlMiniatureProject(project) {
    let miniature = (`
        <div class="project-card">
            <img class="project-img" src="${project.urlImage}" alt="${project.alt}">
            <div class="img-overlay">
                <div class="overlay-text">
                    <h1 class="overlay-title">${project.title}</h1>
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

fetch('./projects-data/projects.json')
.then((res) => res.json())
.then((res) => renderProjects(res));