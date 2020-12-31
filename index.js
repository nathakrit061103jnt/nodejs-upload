const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const oldpath = files.images.path;
    const newpath = "images/" + files.images.name;
    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      res.write("File uploaded and moved!");
      res.end();
    });
  });
});

app.listen(port, () => console.log(`server running on port ${port}`));
