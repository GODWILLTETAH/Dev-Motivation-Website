const express = require('express');
const app = express ()
const mongoose = require('mongoose');
const router = express.Router();
const fs = require('fs')
var bodyParser = require ("body-parser");
app.use(express.urlencoded({extended: false}));
const Blog = require('../models/blog');
const User = require('../models/user');
app.use(express.static(__dirname+"/public"));
const { Router } = require('express');
const adminController = require('../controllers/adminController');
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/',  adminController.get_dashboard )

router.get('/posts', adminController.admin_posts);

router.get('/post/delete/:id',  adminController.delete_posts);

router.get('/post/edit/:_id',   adminController.edit_posts);

router.post('/post/edit/:id', adminController.update_post)

router.get('/register',  adminController.register); //add foward auth
router.get('/login',  adminController.login); //add foward auth
router.post('/new-user',adminController.newUser);
router.post('/user-login',adminController.loginUser);
router.get('/logout', adminController.logout);



module.exports = router;
