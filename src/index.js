const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

const ShortenedURL = require("./structs/ShortenedURL.js");
const makeid = require("./util/makeID.js");

mongoose.connect(
  "mongodb://Affinix:password123@ds137631.mlab.com:37631/short",
  { useNewUrlParser: true }
);

app.get("/api/new", (req, res) => {
  const id = makeid();
  ShortenedURL.findOne({ id: id }).then(url => {
    console.log(url);
    if (url || url !== null) {
      res.status(500);
    } else {
      console.log("ok");
      console.log(req.query.url);
      ShortenedURL.create({ url: req.query.url, id: id })
        .then(() => {
          console.log("success");
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
    } else {
      res.send("404: Link not found.");
    }
  });
  console.log(req.url.slice(1), "yes");
});

app.listen(8080, () => console.log("App listening on port 8080"));
