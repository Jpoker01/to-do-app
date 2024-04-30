const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { 
    type: String, 
    required: true 
  },
  time_due: { 
     type: Date,
     required: true 
    },
   status: { 
    type: String,
    required: true 
  },
});


const taskModel = mongoose.model('tasks', taskSchema);

module.exports = taskModel;