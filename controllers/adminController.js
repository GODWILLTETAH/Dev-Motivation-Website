const { findById } = require('../models/blog');
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require ('mongoose')
const bcrypt = require('bcrypt');
const passport = require('passport');
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

module.exports.get_dashboard = (req, res) => {
  var totalPost = Blog.find();
  totalPost.count(function (err, num) {
      if (err) {
          console.log(err)
      } else {
          res.render('admin/admin', { totalPost: num })
          console.log(num);
      }
  })
}

module.exports.admin_posts = (req, res) => {
  Blog.find().sort({ "_id": -1 })
      .then(function (doc) {
          res.render('admin/data-table', { posts: doc })
      })
}

module.exports.delete_posts = (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/admin/posts');
      }
      else { res.send(`Failed to delete ${err}`) }
  });
}

module.exports.edit_posts = (req, res) => {
  Blog.findById(req.params._id)
      .exec(function (err, doc){
          console.log(doc);
          if (!err) {
              res.render ('blog/edit-post', {post: doc})
          } else console.log(err);
      })
  
  }

module.exports.update_post = (req, res)=>{
    console.log(req.params.id);;
    Blog.findByIdAndUpdate({_id: req.params.id }, req.body).then((post)=>{
        console.log(post);
        Blog.findOne({id: req.params.id }).then((post)=>{
            console.log(post);
            res.redirect('/admin/posts')
        })
    })
  
}

module.exports.login = (req, res) =>{
    res.render('admin/login')
}

module.exports.register = (req, res) =>{
    res.render('admin/register')

}
module.exports.logout = (req, res) =>{
    req.logout();
  res.redirect('/admin/login');
}

module.exports.loginUser = (req, res) =>{
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true
      })(req, res, next);
}

module.exports.newUser = (req, res)=>{
            // const newUser = new User({
            //     name,
            //     email,
            //     password
            //   });
            // const newUser = new User (req.body)
            //   bcrypt.genSalt(10, (err, salt) => {
            //     bcrypt.hash(newUser.password, salt, (err, hash) => {
            //       //if (err) throw err;
            //       newUser.password = hash;
            //       newUser
            //         .save()
            //         .then(user=>{
            //             res.redirect('/admin/login');
            //             console.log('new user added');
            //         })
            //         .catch(err => console.log(err));
            //     });
            //   });

            User.create(req.body).then ((user)=>{
                console.log('new user added');
                res.redirect('/admin/login')
            })
        
    
}