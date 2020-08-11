const express = require('express');

const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({
        status: 'OK'
    });
});

//Login
routes.post('/login', LoginController.store);

//User Registration
routes.post('/users/register', UserController.createUser);
routes.get('/users/:userId', UserController.getUserById);

module.exports = routes;