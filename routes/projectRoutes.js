const {Router} = require('express');
const { createNewProject } = require('../controllers/projectController');

projectManagerRouter = Router();

projectManagerRouter.post('/',createNewProject)

module.exports = {
    projectManagerRouter
}