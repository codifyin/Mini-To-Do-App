const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const app = express();

// conenction to mongodb
mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");



// routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"))

router.post("/", (req, res) => {
  // Handle the POST request to create a new todo item
  // Access the request body using req.body
  res.send("Todo item created successfully");
});

module.exports = router;

// server configurations....
app.listen(3000, () => console.log("Server started listening on port: 3000"));
