const Todos = require('../models/Todos');
const User = require('../models/Users');

module.exports = {
    async createTodo (req, res) {
        const { title, description, startDate, targetDate } = req.body;
        const { user_id } = req.headers;
        try {

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(400).json({
                    message: 'User doesnot exist'
                });
            }
    
            if (!title) {
                return res.status(200).json({
                    message: 'Required field missing'
                });
            }
    
            const existing_todo = await Todos.findOne({ title, user });
    
            if (!existing_todo) {
                const todo = await Todos.create({
                    title,
                    description,
                    startDate,
                    targetDate,
                    user: user_id
                });

                await todo
                        .populate('user', '-password')
                        .execPopulate();
    
                return res.json(todo);
            }
    
            return res.status(200).json({
                message: 'Todo with title already exists'
            });

        } catch (error) {
            throw Error(`Error while creating todo - ${error}`);
        }
    },

    async deleteTodo (req, res) {
        const { todoId } = req.params;
        const { user_id } = req.headers;

        try {
            const user = await User.findById(user_id);
            if (!user) {
                return res.json({
                    message: 'Cannot delete todo'
                });
            }

            await Todos.findByIdAndDelete({
                _id: todoId
            });
            
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({
                message: `Error in deleting todo - ${error}`
            })
        }
    },

    async getTodoById (req, res) {
        const { todoId }= req.params;
        const { user_id }= req.headers;

        try {
            const user = await User.findById(user_id);
            if(!user_id) {
                res.status(400).json({
                    message: 'Cannot fetch todo'
                });
            }

            const todo = await Todos.findOne({
                _id: todoId
            });

            if (todo) {
                return res.json(todo);
            }
        } catch (error) {
            return res.status(404).json({
                message: `Todo not found - ${error}`
            });
        }

    },

    async getTodosByUser (req, res) {
        const { user_id } = req.headers;

        try {
            const user = await User.findById(user_id);

            if (!user) {
                return res.status(400).json({
                    message: 'Cannot fetch todo'
                });
            }

            const todos = await Todos.find({user});

            if (todos) {
                return res.json(todos);
            }

        } catch (error) {
            res.status(400).json({
                message: 'No todos yet'
            });
        }
    }
}