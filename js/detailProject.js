//Generate the info of the project when click on it

const filterProject = (arrProjects) => {
    let idSearch = window.location.search[4];
    return arrProjects.filter(project => project.id === idSearch)[0];
}

const htmlProjectSkills = (string) => {
    return (`
        <i class="project-icon devicon-${string}"></i>
    `);
}

const htmlLinksProject = (project) => {
    return (`
       ${project.linksToProject.github ?  `<a title="Github" href="${project.linksToProject.github}" target="_blank"><i class="project-icon fab fa-github"></i></a>` : null}
       ${project.linksToProject.web ?  `<a title="Web site" href="${project.linksToProject.web}" target="_blank"><i class="project-icon fas fa-link"></i></a>` : null}
    `);
}

const sectionLinks = (section) => {
    return (`
        ${section.sectionGithubLink ? `<a href="${section.sectionGithubLink}" target="_blank"><i class="section-link fab fa-github"></i></a>` : ''}
        ${section.sectionWebLink ? `<a href="${section.sectionWebLink}" target="_blank"><i class="section-link fas fa-link"></i></a>` : ''}
    `);
}

const htmlProjectSection = (section, index) => {
    return (`
        <div class="text-section${index%2 !== 0 ? ' reverse-text' : ''}">
            ${section.sectionTitle ? `<h3 class="section-title">${section.sectionTitle}</h3>` : ''}
            ${section.sectionSubtitle ? `<span class="section-subtitle">${section.sectionSubtitle}</span>` : ''}
            ${sectionLinks(section)}
            ${section.sectionTitle || section.sectionSubtitle ? `<p class="section-description">${section.sectionDescription}</p>` : `<p>${section.sectionDescription}</p>`}
        </div>
        ${section.image ? (`<div class="image-section${index%2 !== 0 ? ' reverse-img' : ''}">
            <img src="${section.image}" alt="Screenshot image">
        </div>`) : ''}
    `);
}

const renderProject = (project) => {
    document.documentElement.style.setProperty('--opacity-header', '0.8');
    document.querySelector('#header-bg').style.setProperty('background-image', `url(${project.urlImage})`);
    document.querySelector('#project-title').innerHTML += project.title;
    document.querySelector('#skills-project-container').innerHTML += project.skills.map(skill => htmlProjectSkills(skill)).join('');
    document.querySelector('#detail-description').innerHTML += project.detailDescription;
    document.querySelector('#links-project-container').innerHTML += htmlLinksProject(project);

    if(project.sections) {
        document.querySelector('#detail-explanation-container').style.display = 'block';
        document.querySelector('#sections-container').innerHTML += project.sections.map((section, i) => htmlProjectSection(section, i)).join('');
    }
}

fetch('../json/projects.json')
.then(res => res.json())
.then(res => renderProject(filterProject(res)));
