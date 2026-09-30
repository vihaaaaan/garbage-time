const projects = [
  {
    title: "usmnt abroad",
    description: "tracking american players at clubs around the world.",
    href: "#",
    comingSoon: true,
  },
];

const projectsRoot = document.querySelector("#projects");

function createProjectCard(project) {
  const element = project.comingSoon ? document.createElement("div") : document.createElement("a");
  element.className = `project-card${project.comingSoon ? " coming-soon" : ""}`;

  if (!project.comingSoon) {
    element.href = project.href;
  }

  const thumbnail = project.thumbnail
    ? `<img class="project-thumbnail" src="${project.thumbnail}" alt="">`
    : `<div class="project-thumbnail placeholder">${project.comingSoon ? "soon" : ""}</div>`;

  element.innerHTML = `
    ${thumbnail}
    <div class="project-info">
      <h2>${project.title}</h2>
      <p>${project.description}</p>
    </div>
  `;

  return element;
}

projectsRoot.replaceChildren(...projects.map(createProjectCard));
