const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://jiripokorny455:9sMvZ1RHl6YJNL1C@projects.g2df7vu.mongodb.net/to-do-app?retryWrites=true&w=majority&appName=projects';
mongoose.set("strictQuery", false);

options = {

}

mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose;