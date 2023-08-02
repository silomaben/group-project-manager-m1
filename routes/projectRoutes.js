const {Router} = require('express');
const { createNewProject, viewAllProjects, viewOneProject, updateProject, deleteProject } = require('../controllers/projectController');

projectManagerRouter = Router();

projectManagerRouter.post('/',createNewProject);
projectManagerRouter.get('/', viewAllProjects);
projectManagerRouter.get('/:id', viewOneProject);
projectManagerRouter.put('/:id', updateProject);
projectManagerRouter.delete('/:id', deleteProject);

module.exports = {
    projectManagerRouter
}