const jwt = require('jsonwebtoken');

const Todos = require('../models/Todos');
const User = require('../models/Users');

module.exports = {
  createTodo(req, res) {
    jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
      if (err) {
        res.status(401).send();
      } else {
        const {
          title,
          description,
          targetDate,
          isRepeat,
          isImportant,
          isToday,
          isPlanned,
          isComplete,
        } = req.body;
        const { user_id } = req.headers;
        try {
          const user = await User.findById(user_id);

          if (!user) {
            return res.status(400).json({
              message: 'User doesnot exist',
            });
          }

          if (!title) {
            return res.status(200).json({
              message: 'Please provide a title for your todo',
            });
          }

          const todo = await Todos.create({
            title,
            description,
            targetDate,
            isRepeat,
            isImportant,
            isToday,
            isPlanned,
            isComplete,
            user: user_id,
          });

          await todo.populate('user', '-password').execPopulate();

          return res.json({
            message: 'Todo created successfully',
            todo,
          });
        } catch (error) {
          throw Error(`Error while creating todo - ${error}`);
        }
      }
    });
  },

  editTodo(req, res) {
    jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
      if (err) {
        res.status(401).send();
      } else {
        const {
          title,
          description,
          targetDate,
          isRepeat,
          isImportant,
          isToday,
          isPlanned,
          isComplete,
        } = req.body;
        const { user_id } = req.headers;
        try {
          const user = await User.findById(user_id);

          if (!user) {
            return res.status(400).json({
              message: 'User doesnot exist',
            });
          }

          if (!title) {
            return res.status(200).json({
              message: 'Required field missing',
            });
          }

          const existing_todo = await Todos.findOne({ title, user });

          if (existing_todo) {
            existing_todo.title = title;
            existing_todo.description = description;
            existing_todo.targetDate = targetDate;
            existing_todo.isRepeat = isRepeat;
            existing_todo.isImportant = isImportant;
            existing_todo.isToday = isToday;
            existing_todo.isPlanned = isPlanned;
            existing_todo.isComplete = isComplete;

            await existing_todo.save();

            await existing_todo.populate('user', '-password').execPopulate();

            return res.json({
              message: 'Todo updated successfully',
              todo: existing_todo,
            });
          }

          return res.status(200).json({
            message: 'Todo doesnot exist',
          });
        } catch (error) {
          throw Error(`Error while updating todo - ${error}`);
        }
      }
    });
  },

  getToday(req, res) {
    jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
      if (err) {
        res.status(401).send();
      } else {
        const { user_id } = req.headers;

        try {
          const user = await User.findById(user_id);
          if (!user) {
            return res.json({
              message: 'Could not fetch todos for user.',
            });
          }

          const todos = await Todos.find({ isToday: true });

          return res.json(todos);
        } catch (error) {
          throw Error('Error while fetching todos for today - ' + error);
        }
      }
    });
  },

  getImportant(req, res) {
    jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
      if (err) {
        res.status(401).send();
      } else {
        const { user_id } = req.headers;

        try {
          const user = await User.findById(user_id);
          if (!user) {
            return res.json({
              message: 'Could not fetch todos for user.',
            });
          }

          const todos = await Todos.find({ isImportant: true });

          return res.json(todos);
        } catch (error) {
          throw Error('Error while fetching todos for today - ' + error);
        }
      }
    });
  },

  getPlanned(req, res) {
    jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
      if (err) {
        res.status(401).send();
      } else {
        const { user_id } = req.headers;

        try {
          const user = await User.findById(user_id);
          if (!user) {
            return res.json({
              message: 'Could not fetch todos for user.',
            });
          }

          const todos = await Todos.find({ isPlanned: true });

          return res.json(todos);
        } catch (error) {
          throw Error('Error while fetching todos for today - ' + error);
        }
      }
    });
  },

  deleteTodo(req, res) {
    jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
      if (err) {
        res.status(401).send();
      } else {
        const { todoId } = req.params;
        const { user_id } = req.headers;

        try {
          const user = await User.findById(user_id);
          if (!user) {
            return res.json({
              message: 'Cannot delete todo',
            });
          }

          await Todos.findByIdAndDelete({
            _id: todoId,
          });

          return res.status(204).send();
        } catch (error) {
          return res.status(400).json({
            message: `Error in deleting todo - ${error}`,
          });
        }
      }
    });
  },

  getTodoById(req, res) {
    jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
      if (err) {
        res.status(401).send();
      } else {
        const { todoId } = req.params;
        const { user_id } = req.headers;

        try {
          const user = await User.findById(user_id);
          if (!user_id) {
            res.status(400).json({
              message: 'Cannot fetch todo',
            });
          }

          const todo = await Todos.findOne({
            _id: todoId,
          });

          if (todo) {
            return res.json(todo);
          }
        } catch (error) {
          return res.status(404).json({
            message: `Todo not found - ${error}`,
          });
        }
      }
    });
  },

  getTodosByUser(req, res) {
    jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
      if (err) {
        res.status(401).send();
      } else {
        const { user_id } = req.headers;

        try {
          const user = await User.findById(user_id);

          if (!user) {
            return res.status(400).json({
              message: 'Cannot fetch todo',
            });
          }

          const todos = await Todos.find({ user });

          if (todos) {
            return res.json(todos);
          }
        } catch (error) {
          res.status(400).json({
            message: 'No todos yet',
          });
        }
      }
    });
  },
};
