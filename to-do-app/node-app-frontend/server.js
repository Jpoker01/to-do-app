const express = require('express');
const path = require('path');
const app = express();
var favicon = require('serve-favicon')

const PORT = process.env.PORT || 4000;

app.use('/', express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


app.listen(PORT, () => {
    console.log(`Client App: http://localhost:${PORT}`);
})