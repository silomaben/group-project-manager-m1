const {Router} = require('express');
const { registerUsers, userLogin } = require('../controllers/authControllers');
const { assignProjects } = require('../controllers/projectController');
const { completeProject } = require('../controllers/userController');
const usersRouter = Router()

usersRouter.post('/register', registerUsers)
usersRouter.post('/login',userLogin)
usersRouter.put('/assign',assignProjects)
usersRouter.post('/complete',completeProject)
module.exports = {
    usersRouter
}