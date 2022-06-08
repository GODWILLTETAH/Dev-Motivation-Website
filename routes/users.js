const { Router } = require('express');
const usersController = require('../controllers/usersController');

router.get('/', forwardAuthenticated, adminController.get_dashboard )

router.get('/posts',ensureAuthenticated, adminController.admin_posts);
