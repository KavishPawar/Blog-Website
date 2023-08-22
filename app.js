const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./zmodels/blog");

//express app
const app = express();

//connect to mongodb
const dbURI ="mongodb+srv://kav:kavish125@nodecluster.1ph9zqz.mongodb.net/nodeDb?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) //async process hence returns a proomise.
  .then((result) => {
    console.log("connection established");
    app.listen(3000);
  })
  .catch((error) => {
    console.log("connection error");
    console.log(error);
  });

//register view engine
app.set("view engine", "ejs");

//listen for request
// app.listen(3000);

//middleware & static files
app.use(express.static("./zstatic"));
app.use(express.urlencoded({ extended: true })); // takes all the url encoded data (here. /create__ the form components has the url data i.e. /blogs) and passes into an object that can be used.
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blog");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blog", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blog: result });
    })
    .catch((err) => {
      console.log('blog.findwala error');
    });
});

app.post("/blog", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog.save()
    .then( (result) => {
      res.redirect('/blog')
    })
    .catch( (err) => {
      console.log('blog post wala error'); 
    })
});

app.get('/blog/:id', (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then( result => {
      res.render('details', { blog: result, title: "Blog Details"})
    })
    .catch( err => {
      console.log(err)
    }) 
})

app.delete('/blog/:id' , (req, res) => {
  const id = req.params.id;
  console.log(id);  
  Blog.findByIdAndDelete(id)
    .then( result => {
      res.json({ redirect: '/blog'})
    })
    .catch( err => {
      console.log('delete wala err', err)
    })
})

 

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});


//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
