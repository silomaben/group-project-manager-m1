const {Router} = require('express');
const { registerUsers, userLogin } = require('../controllers/authControllers');
const usersRouter = Router()

usersRouter.post('/register', registerUsers)
usersRouter.post('/login',userLogin)

module.exports = {
    usersRouter
}