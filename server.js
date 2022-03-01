const PORT = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const singin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'admin',
        database: 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data)
// })

const app = express();
app.use(bodyParser.json());
app.use(cors());


//root path
// app.get('/', (req, res) => {
//     res.send(database.users);
// })

//signing in 
app.post('/signin', (req, res) => {
    singin.handleSignin(req, res, db, bcrypt);
})

//creating new user
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db);
})

app.put('/image', (req, res) => {
    image.handleImagePut(req, res, db);
})
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res);
})


//ALWAYS SEND ANY INFORMATION FROM FRONT-END TO THE BACK-END USING HTTPS IN A POST BODY AND USE SOMETHING LIKE BCRYPT!!!!!!!!!!!!!!!!!!!!!!!

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//     // res = false
// });



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})