const express = require('express');
const ejs = require('ejs');
const mongoose= require('mongoose');

// Init app
const app = express();

// EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

//Connect to mongodb
// mongoose.connect("mongodb://localhost/photoeditor", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Public Folder
app.use(express.static('./public'));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/js", express.static(__dirname + "public/js"));

const Router = require("./src/routes/editor");
app.use("/", Router);
app.use("/article", Router);

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));