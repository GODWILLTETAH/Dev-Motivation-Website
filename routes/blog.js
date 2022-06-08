const express = require ('express');
const app = express ();
var bodyParser = require ("body-parser");
const mongoose = require ('mongoose');
const router = express.Router();
const fs = require ('fs');
const Blog = require('../models/blog');
const multer = require ('multer');
const path = require ('path');
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
const { Router } = require('express');
const blogController = require('../controllers/blogController');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
            cb (null, './public/uploads')
    },
    filename: (req, file, cb) => {
            cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
});

const upload = multer ({storage:storage});

router.get ('/', blogController.blog_Home);
router.get ('/new', blogController.newblog_Form);

router.post ('/new-post', upload.single('image'), blogController.newblog_Post);

router.get ('/', blogController.query_Blog);


module.exports = router;