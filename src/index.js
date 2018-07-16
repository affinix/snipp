const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const dotenv = require("dotenv");

const ShortenedURL = require("./structs/ShortenedURL.js");
const makeid = require("./util/makeID.js");
dotenv.load();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true }
);

app.get("/api/new", (req, res) => {
  const id = makeid();
  ShortenedURL.findOne({ id: id }).then(url => {
    if (url) {
      res.status(500);
    } else {
      ShortenedURL.create({ url: req.query.url, id: id })
        .then(() => {
          res.status(200).json({
            id: id,
            url: req.get("host") + `/${id}`,
            baseURL: req.get("host")
          });
        })
        .catch(() => res.status(500));
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

app.get("/*", (req, res) => {
  ShortenedURL.findOne({ id: req.url.slice(1) }).then(url => {
    if (url) {
      res.redirect(url.url);
    }
  });
});

app.listen(8080, () => console.log("App listening on port 8080"));
