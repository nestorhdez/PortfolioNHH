//Generate the info of the project when click on it

function filterProject(arrProjects) {
    let idSearch = window.location.search[4];
    return arrProjects.filter(project => project.id === idSearch)[0];
}

function htmlProjectSection(section, index) {
    return (`
        <div class="text-section${index%2 !== 0 ? ' reverse-text' : ''}">
            ${section.sectionTitle ? `<h2>${section.sectionTitle}</h2>` : ''}
            ${section.sectionSubtitle ? `<span class="section-subtitle">${section.sectionSubtitle}</span>` : ''}
            ${sectionLinks(section)}
            ${section.sectionTitle || section.sectionSubtitle ? `<p class="section-description">${section.sectionDescription}</p>` : `<p>${section.sectionDescription}</p>`}
        </div>
        <div class="image-section${index%2 !== 0 ? ' reverse-img' : ''}">
            ${section.image ? `<img src="${section.image}" alt="Screenshot image">` : ""}
        </div>
    `);
}

function htmlProjectSkills(string) {
    return (`
        <i class="skill-icon fab fa-${string}"></i>
    `);
}

function htmlLinksProject(project) {
    return (`
       ${project.linksToProject.github ?  `<a title="Github" href="${project.linksToProject.github}" target="_blank"><i class="skill-icon fab fa-github"></i></a>` : null}
       ${project.linksToProject.web ?  `<a title="Web site" href="${project.linksToProject.web}" target="_blank"><i class="skill-icon fas fa-link"></i></a>` : null}
    `);
}

function sectionLinks(section) {
    return (`
        ${section.sectionGithubLink ? `<a href="${section.sectionGithubLink}" target="_blank"><i class="section-link fab fa-github"></i></a>` : ''}
        ${section.sectionWebLink ? `<a href="${section.sectionWebLink}" target="_blank"><i class="section-link fas fa-link"></i></a>` : ''}
    `);
}

function renderHtmlProject(project) {
    document.documentElement.style.setProperty('--opacity-header', '0.8');
    document.querySelector('#header-bg').style.setProperty('background-image', `url(${project.urlImage})`);
    document.querySelector('#header-text').innerHTML +=
    `<h1 style="margin-bottom: 20px;">${project.title}</h1>` + '<div id="skills-container"></div>';

    document.querySelector('#detail-description').innerHTML += project.detailDescription;
    
    project.skills.forEach(skill => document.querySelector('#skills-container').innerHTML += htmlProjectSkills(skill));

    if(project.sections) {
        project.sections.forEach((section, i) => {
            document.querySelector('#detail-container').innerHTML += htmlProjectSection(section, i);
        });
    }

    document.querySelector('#links-project-container').innerHTML += htmlLinksProject(project);
}

fetch('../projects-data/projects.json')
.then(res => res.json())
.then(res => renderHtmlProject(filterProject(res)));
