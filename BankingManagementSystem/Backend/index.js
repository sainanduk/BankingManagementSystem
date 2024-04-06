const express = require('express');
const app = express(); 
const path = require("path");
const ejs = require("ejs");
const { setupSession } = require('./session');
const setupGetRoutes = require('./getRoutes');
const generateOTPSetup = require('./generateotp');
const { signup, login } = require('./loginSignup');
const { admin, deposite } = require('./adminDeposite');
const transfer = require('./transfer');
const templatepath = path.join(__dirname, "../templates");
app.use(express.static(path.join(__dirname, '../public')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", templatepath);

app.use(setupSession());


setupGetRoutes(app)

generateOTPSetup(app);

app.post('/signup', signup);

app.post('/login', login);

app.post('/admin', admin);

app.post('/deposite', deposite);

app.post('/transfer', transfer);


app.listen(3002,() => {
    console.log('Server is running on port 3002');

})
