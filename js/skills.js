const renderSkills = (arrSkills) => {
    arrSkills.forEach(skill => {
        document.querySelector("#skills-container").innerHTML += htmlSkills(skill);
    });
}

const htmlSkills = (obj) => {
    return (`
        <div class="skill-div">
            <i class="skill-icon devicon-${obj.skill}"></i>
            <p class="skill-title">${obj.title}</p>
        </div>
    `);
}

export default () => {
    fetch('./json/skills.json')
    .then((res) => res.json())
    .then((res) => renderSkills(res));
}