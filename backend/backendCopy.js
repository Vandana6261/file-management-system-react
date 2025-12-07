const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

const home = require("os").homedir();
let pwd = home;
const fs = require("fs");

// this is check what frontend is requesting
app.use((req, res, next) => {
  console.log("REQUEST: ", req.method, req.url);
  next();
});

// first time call
app.get("/home", (req, res) => {
  fs.readdir(home, (err, fileNames) => {
    if (err) return res.status(500).json({ error: err.message });
    let filteredFile = filterDot(fileNames);
    res.json({
      filteredFile: filteredFile,
      home: home,
    });
  });
});

let file;
// call from the getInsideFile function
app.post("", (req, res) => {
  file = req.body.file;
  // console.log(file)
  // console.log(req.body)
  // pwd += "/"+req.body.file;
  pwd = req.body.filePath;
  console.log(pwd);
  res.json({
    message: "Success",
    data: req.body,
  });
});

// call from getFile function
app.get("", (req, res) => {
  fs.readdir(pwd, (err, fileNames) => {
    // console.log(pwd);
    if (err) {
      console.log(pwd);
      console.log(err);
      return res.json("");
    }
    if (fileNames) {
      // return res.json(filterDot(fileNames))
      res.json({
        filteredFile: filterDot(fileNames),
        message: "File send",
      });
    }
  });
});

app.delete("/delete", (req, res) => {
  let filePath = req.body;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Error is here");
      console.log("Error: ", err.message);
    }
    return res.json({
      message: "File deleted Successfully",
    });
  });
});

app.listen(3000, () => {
  console.log("Server Running on port: 3000");
  console.log("http://localhost:3000");
});

function filterDot(item) {
  return item.filter((e) => {
    if (e[0] != ".") return e;
  });
}
