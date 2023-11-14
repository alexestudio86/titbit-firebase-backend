const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.create({
    defaultLayout: "main",
    partialsDir: __dirname + '/views/partials/',
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require("./routes/index.js"));

// Static files
app.use("/public", express.static(path.join(__dirname, "public")));

// CSS
// Bootswatch
app.use('/css', express.static( __dirname + '/../node_modules/bootswatch/dist/flatly' ) );
// Bootstrap (Subir un nivel debido al src)
app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js') );
// W3 CSS
app.use('/css', express.static(__dirname + '/../node_modules/w3-css') );
// Font Awesome
app.use('/css', express.static(__dirname + '/../node_modules/@fortawesome/fontawesome-free/css') );
app.use('/js', express.static(__dirname + '/../node_modules/@fortawesome/fontawesome-free/js') );



module.exports = app;