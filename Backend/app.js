const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db.js');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes.js')

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
})

module.exports = app;
