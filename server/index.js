const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
let Blog = require("./Models/Blog");
const app = express();
// Configuring body parser middleware and cors
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://127.0.0.1:27017/blogDB")
  .then(() => {
    console.log("Connected to db...");
  })
  .catch((err) => {
    console.error(err);
  });
app.listen(8080, () => {
  console.log("Listening..");
});
app.get("/all", async (req, res) => {
  var dbData = await Blog.find();
  res.send(dbData);
});

app.get("/:id", async (req, res) => {
  let ans = await Blog.findOne({ _id: req.params.id });
  res.send(ans);
});

app.post("/updateone", (req, res) => {
  // console.log(req.body);
  res.send({ message: "req update received" });
});

app.delete("/deleteone/:id", async (req, res) => {
  console.log("req.params-------", req.params.id);
  // console.log(" del req.body => ", req.body);
  await Blog.findByIdAndDelete(req.params.id).then(() =>
    console.log("deleted")
  );
  res.send({ message: "deleted blog post" });
});

app.post("/", async (req, res) => {
  console.log(req.body);
  var newBlog = new Blog(req.body);
  await newBlog
    .save(newBlog)
    .then(() => {
      console.log("Added");
      res.send("added the blog");
    })
    .catch((err) => console.error(err));
});
