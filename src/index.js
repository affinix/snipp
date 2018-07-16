const app = require("express")();
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

const ShortenedURL = require("./structs/ShortenedURL.js");
const makeid = require("./util/makeID.js");
dotenv.load();

mongoose.connect( process.env.MONGO_URL, { useNewUrlParser: true } );

app.get("/api/new", (req, res) => {
  const id = req.query.id ? req.query.id : makeid();
  ShortenedURL.findOne({ id: id }).then(url => {
    if (url) {
      return res.status(500).json({ error: "ID taken" });
    } else {
      ShortenedURL.create({ url: req.query.url, id: id })
        .then(() => res.status(200).json({ id: id, url: req.get("host") + `/${id}`, baseURL: req.get("host") }))
        .catch(() => res.status(500));
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

app.get("/*", (req, res) => {
  ShortenedURL.findOne({ id: req.url.slice(1) }).then(url => {
    if (url) res.redirect(url.url);
  });
});

app.listen(8080, () => console.log("App listening on port 8080"));
