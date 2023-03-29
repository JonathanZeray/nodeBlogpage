const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const Blog = require("./models/blog")
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();

// EXPRESS APP
const app = express();

// connect to mongoDB
const dbURI = process.env.MONGO_URL;
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files(css, images that are public)
app.use(express.static("public"));
// middleware to parse the data that we send into a workable format we can use to attach it to app.post request object
app.use(express.urlencoded({ extended: true }));
//static(express middleware) made it possible to create styles.css that i placed in public folder
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

//blog routes
app.use(blogRoutes);

// 404 page - it runs through the code from top to bottom, if no url matches our paths then this will be the default
// for this reason, this app.use for the 404 page HAS TO BE PLACED AT THE BOTTOM.
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
