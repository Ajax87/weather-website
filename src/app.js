const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forcast = require("./utils/forcast");

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewpath = path.join(__dirname, "./template/views");
const partialPaths = path.join(__dirname, "./template/partials");

// Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialPaths);

// Setup sataic directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ajay Biradar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ajay Biradar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Ajay Biradar",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.address;
  if (!location) {
    return res.send({
      error: "Must provide the address",
    });
  }
  const response = forcast(location, (error, data) => {
    if (error) {
      return res.send({ error });
    } else {
      res.send({
        forecast: data,
        location: location,
        address: location,
      });
    }
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "must provide Search term",
    });
  }
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found.",
    title: "Help",
    name: "Ajay Biradar",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
    title: "404",
    name: "Ajay Biradar",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
