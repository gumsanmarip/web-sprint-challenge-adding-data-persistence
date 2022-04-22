// build your `Project` model here
const db = require("../../data/dbConfig");

const getProjects = async () => {
  const query = await db("projects");
  const projectMap = query.map((project) => {
    if (project.project_completed === 0) {
      return {
        ...project,
        project_completed: false,
      };
    } else if (project.project_completed === 1) {
      return {
        ...project,
        project_completed: true,
      };
    }
  });
  return projectMap;
};

async function createProject(project) {
  const query = await db("projects")
    .insert(project)
    .then(([project_id]) => {
      return db("projects").where("project_id", project_id).first();
    });
  if (query.project_completed === 0) {
    return {
      ...query,
      project_completed: false,
    };
  } else {
    return {
      ...query,
      project_completed: true,
    };
  }
}

module.exports = {
  getProjects,
  createProject,
};
