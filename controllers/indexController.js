const Blog = require('../models/blog')
module.exports.index_Home = (req, res)=>{
    Blog.find().sort({"_id":-1})
    .then(function (doc){
        res.render('index', {posts: doc})
    })
}


module.exports.post_details = function (req, res) {
    Blog.findById(req.params.id, (err, doc) => {
        res.render ('blog/detail', {post: doc});
        });
}

module.exports.about_Page = (req, res)=>{
    res.render ('index/about', {})
}
module.exports.contact_Page = (req, res)=>{
    res.render ('index/contact', {})
}
module.exports.query_Posts = (req, res)=>{
    Blog.find().sort({"_id":-1})
    .then(function (doc){
        res.render('blog/blog', {posts: doc})
    })
}
module.exports.email_Subs = (req, res)=>{
    var {email} = req.body;
    var subscriber = new Newsletter({email});
    subscriber.save((err, doc)=>{
        if (!err) {
            res.send (" <script>alert ('Done.Thanks')</script> ");
        } else
        console.log(err);
    })
    
}



