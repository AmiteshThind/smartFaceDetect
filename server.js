const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const database= knex({
 client: 'pg',
 connection: {
    host : '127.0.0.1',
    user : 'AmiteshThind',
    password : '',
    database : 'smart-brain'
  }
});
 
  



app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.json(database.users);
})

app.post('/signin',(req,res) => {signin.handleSignIn(req,res,database,bcrypt)});

app.post('/register',(req,res) => {register.handleRegister(req,res,database,bcrypt)});

app.get('/profile/:userid', (req,res) => {profile.handleProfile(req,res,database)});

app.put('/image',(req,res) => {image.handleImage(req,res,database)});



app.listen(3001,() => {
    console.log("app is running on port 3001");
});


/*
/-->res =this is working
/signin --> POST
/register --> POST
/profile/:userid --> GET = user
/image -->PUT
*/