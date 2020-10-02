const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: String,
  targetDate: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
});

module.exports = mongoose.model('Todos', TodosSchema);
