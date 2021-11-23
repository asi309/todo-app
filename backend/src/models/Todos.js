const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    targetDate: String,
    isRepeat: String,
    isImportant: Boolean,
    isToday: Boolean,
    isPlanned: Boolean,
    isComplete: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    steps: [
      {
        description: String,
        isComplete: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Todos', TodosSchema);
