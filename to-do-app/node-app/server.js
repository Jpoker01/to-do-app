const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const tasksRouter = require('./src/routes/api/tasks');
const usersRouter = require('./src/routes/api/users');

const myLogger = require('./src/routes/logger');
const PORT = process.env.PORT || 4000;

const app = express();

app.use(myLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});
