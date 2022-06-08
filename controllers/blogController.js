const Blog = require('../models/blog')

module.exports.blog_Home = (req, res)=>{
    res.render ('blog/blog', {})
}

module.exports.newblog_Form = (req, res) => {
    res.render('blog/blog-form', {})
}

module.exports.newblog_Post = (req, res)=>{
    var d = new Date();
    var month = d.getMonth();
    var year = d.getFullYear();
    var date = `${month}/${year}`
    const {title, content,excerpt,tag,author} = req.body;
    const newBlog = new Blog ({
        title,
        content,
        image : req.file.filename,
        date: date,
        excerpt,
        tag,
        author,
    });  // or Model.create (req.body)
    newBlog.save((err, doc)=>{
        if (!err) {
            console.log('done')
            res.redirect('/admin/posts')
            console.log (doc);
        } 
            else {
                // let data = `-----Found error on ${Date.now().toLocaleString()} -----during content upload\n ${err}`;
                // fs.writeFileSync(`../logs.txt`, data);
                // console.log(`Error: Check Log File`);
                // res.end()
                console.log(err);


            }
    }) 
}

module.exports.query_Blog = (req, res)=>{
    Blog.find().sort({"_id":-1})
    .then(function (doc){
        res.render('index', {posts: doc})
    })
}
