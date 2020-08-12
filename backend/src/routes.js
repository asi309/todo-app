const express = require('express');

const LoginController = require('./controllers/LoginController');
const TodosController = require('./controllers/TodosController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({
        status: 'OK'
    });
});

//Login
routes.post('/login', LoginController.store);

//Todos
routes.post('/todos/add', TodosController.createTodo);
routes.get('/todos/:todoId', TodosController.getTodoById);
routes.get('/todos/', TodosController.getAllTodos);
routes.delete('/todos/delete/:todoId', TodosController.deleteTodo);

//User Registration
routes.post('/users/register', UserController.createUser);
routes.get('/users/:userId', UserController.getUserById);

module.exports = routes;