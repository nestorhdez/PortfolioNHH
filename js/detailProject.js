//Generate the info of the project when click on it

function filterProject(arrProjects) {
    let idSearch = window.location.search[4];
    return arrProjects.filter(project => project.id === idSearch)[0];
}

function htmlProjectSection(section, index) {
    let template = (`
        <div class="image-section${index%2 == 0 ? ' reverse-img' : ''}">
            <img src="${section.image}" alt="Screenshot image">
        </div>
        <div class="text-section${index%2 == 0 ? ' reverse-text' : ''}">
            <p>${section.sectionDescription}</p>
        </div>
    `);
    return template;
}

function generateHtmlProject(project) {
    document.querySelector('#header-bg').style.setProperty('background-image', `url(${project.urlImage})`);
    document.documentElement.style.setProperty('--opacity-header', '0.8');
    document.querySelector('#header-text').innerHTML +=
    `<h1>${project.title}</h1>` + `<h2 style="font-weight: normal;">${project.description}</h2>`;
 
    project.sections.forEach((section, i) => {
        document.querySelector('#detail-container').innerHTML += htmlProjectSection(section, i);
    });
}

fetch('../projects-data/projects.json')
.then(res => res.json())
.then(res => generateHtmlProject(filterProject(res)));