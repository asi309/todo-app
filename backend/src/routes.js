const express = require('express');

const LoginController = require('./controllers/LoginController');
const TodosController = require('./controllers/TodosController');
const UserController = require('./controllers/UserController');
const verifyToken = require('./middleware/verifyToken');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({
    status: 'OK',
  });
});

//Login
routes.post('/login', LoginController.store);

//Todos
routes.post('/todos/add', verifyToken, TodosController.createTodo);
routes.get('/todos/:todoId', verifyToken, TodosController.getTodoById);
routes.patch('/todos/:todoId', verifyToken, TodosController.editTodo);
routes.get('/todos/', verifyToken, TodosController.getTodosByUser);
routes.delete('/todos/delete/:todoId', verifyToken, TodosController.deleteTodo);
routes.get('/todos/today', verifyToken, TodosController.getToday);
routes.get('/todos/important', verifyToken, TodosController.getImportant);
routes.get('/todos/planned', verifyToken, TodosController.getPlanned);

//User Registration
routes.post('/users/register', UserController.createUser);
// routes.get('/users/:userId', UserController.getUserById);

module.exports = routes;
