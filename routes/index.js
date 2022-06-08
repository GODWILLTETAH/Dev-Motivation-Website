const express = require ('express');
const mongoose = require ('mongoose');
const router = express.Router();
const fs = require ('fs')
const Blog = require('../models/blog');
const Newsletter = require('../models/newsletter');
const { Router } = require('express');
const indexController = require('../controllers/indexController');


router.get ('/', indexController.index_Home);

//single post
router.get('/post/:id', indexController.post_details)

router.get ('/about', indexController.about_Page);

router.get ('/contact', indexController.contact_Page);

router.get ('/blog', indexController.query_Posts);

router.post ('/newsletter', indexController.email_Subs);


module.exports = router;