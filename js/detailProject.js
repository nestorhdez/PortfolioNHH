//Generate the info of the project when click on it

function filterProject(arrProjects) {
    let idSearch = window.location.search[4];
    return arrProjects.filter(project => project.id === idSearch)[0];
}

function htmlProjectSection(section, index) {
    let template = (`
        <div class="image-section${index%2 == 0 ? ' reverse-img' : ''}">
            ${section.image ? `<img src="${section.image}" alt="Screenshot image">` : ""}
        </div>
        <div class="text-section${index%2 == 0 ? ' reverse-text' : ''}">
            <p>${section.sectionDescription}</p>
        </div>
    `);
    return template;
}

function htmlProjectSkills(string) {
    let skillIcon = (`
        <i class="skill-icon fab fa-${string}"></i>
    `);
    return skillIcon;
}

function htmlLinksProject(project) {
    let linkIcon = (`
       ${project.linksToProject.github ?  `<a title="Github" href="${project.linksToProject.github}" target="_blank"><i class="skill-icon fab fa-github"></i></a>` : null}
       ${project.linksToProject.web ?  `<a title="Web site" href="${project.linksToProject.web}" target="_blank"><i class="skill-icon fas fa-link"></i></a>` : null}
    `);

    return linkIcon;
}

function renderHtmlProject(project) {
    document.documentElement.style.setProperty('--opacity-header', '0.8');
    document.querySelector('#header-bg').style.setProperty('background-image', `url(${project.urlImage})`);
    document.querySelector('#header-text').innerHTML +=
    `<h1 style="margin-bottom: 20px;">${project.title}</h1>` + '<div id="skills-container"></div>';

    document.querySelector('#detail-description').innerHTML += project.detailDescription;
    
    project.skills.forEach(skill => document.querySelector('#skills-container').innerHTML += htmlProjectSkills(skill));

    project.sections.forEach((section, i) => {
        document.querySelector('#detail-container').innerHTML += htmlProjectSection(section, i);
    });

    document.querySelector('#links-project-container').innerHTML += htmlLinksProject(project);
}

fetch('../projects-data/projects.json')
.then(res => res.json())
.then(res => renderHtmlProject(filterProject(res)));
