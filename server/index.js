const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var Users = require('./routes/Users');
app.use('/users', Users);

var Keys = require('./routes/Keys');
app.use('/keys', Keys);

var Resources = require('./routes/Resources');
app.use('/resources', Resources);

var Projects = require('./routes/Projects');
app.use('/projects', Projects);

var SshLog = require('./routes/SshLog');
app.use('/logs', SshLog)

app.get('/', (req, res) => {
    res.send('Hello server!')
});

app.listen(4000, () => {
    console.log(`Server is listening at http://localhost:4000!`)
});
