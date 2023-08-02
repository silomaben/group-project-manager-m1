const {Router} = require('express');
const { createNewProject, viewAllProjects, viewOneProject, updateProject, deleteProject } = require('../controllers/projectController');
const { verifyToken } = require('../middleware/verifyToken');

projectManagerRouter = Router();

projectManagerRouter.post('/',verifyToken ,createNewProject);
projectManagerRouter.get('/',verifyToken, viewAllProjects);
projectManagerRouter.get('/:id',verifyToken, viewOneProject);
projectManagerRouter.put('/:id', verifyToken,updateProject);
projectManagerRouter.delete('/:id',verifyToken, deleteProject);

module.exports = {
    projectManagerRouter
}