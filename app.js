const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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
app.use( '/blog', blogRoutes );

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
