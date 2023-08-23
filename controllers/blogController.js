const Blog = require("../zmodels/blog");

const blog_index = ( req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then((result) => {
        res.render("index", { title: "All Blogs", blog: result });
      })
      .catch((err) => {
        console.log('blog.findwala error', err);
      });
}

const blog_details = (req, res) => {
    const id = req.params.id;
  
    Blog.findById(id)
      .then( result => {
        res.render('details', { blog: result, title: "Blog Details"})
      })
      .catch( err => {
        res.status(404).render("404", { title: "404" })
      }) 
}

const blog_create_get = (req, res) => {
    res.render("create", { title: "Create a new blog" });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
      .then( (result) => {
        res.redirect('/blog')
      })
      .catch( (err) => {
        console.log('blog post wala error'); 
      })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then( result => {
        res.json({ redirect: '/blog'})
      })
      .catch( err => {
        console.log('delete wala err', err)
      })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get, 
    blog_create_post,
    blog_delete,
}