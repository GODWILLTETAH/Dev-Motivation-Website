const express = require('express');
var bodyParser = require("body-parser");
const app = express();
const multer = require('multer');
require('dotenv').config()
const ejs = require('ejs');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const PORT = process.env.port || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
const fs = require('fs');
app.use('/', require('./routes/index.js'));
app.use('/blog', require('./routes/blog.js'));
// app.use ('/rest', require ('./routes/rest.js'));
app.use('/admin', require('./routes/admin.js'))

app.use(express.static(__dirname + "/public"));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(
        session({
          secret: 'secret',
          resave: true,
          saveUninitialized: true
        })
      );
      
      // Passport middleware
      app.use(passport.initialize());
      app.use(passport.session());
      
app.use((req, res) => {
        res.status(404).render('index/404');
    })

mongoose
        .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


