const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.set('port', process.env.POST||8000);

app.use(express.json());

const userRouters = require('./routes/UsersRoute');

//Route
app.use('/users', userRouters);

app.listen(app.get('port'), () => {
    console.log("Starting server");
})