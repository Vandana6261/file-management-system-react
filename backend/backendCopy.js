const express = require("express");
const cors = require("cors");
const path = require("path");
const icons = require("./icons.json")
// console.log("icons line no 6th")
// console.log(icons)
//  console.log(icons.folders.default.icon)

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
    console.log("35 line called")
    let filteredFile = filterDot(fileNames);
    let filesWithIcon = getFilesWithIcons(home, filteredFile)
    res.json({
      filteredFile: filteredFile,
      body: filesWithIcon,
      home: home,
    });
  });
});



let file;
// call from the getInsideFile function
app.post("", (req, res) => {
  file = req.body.file;
  pwd = path.normalize(req.body.filePath);
  console.log("pwd", pwd);
  res.json({
    message: "Success",
    data: req.body,
  });
});

// call from getFile function
app.get("", (req, res) => {
  fs.readdir(pwd, (err, fileNames) => {
    if (err) {
      console.log("pwd", pwd);
      console.log("err", err);
      return res.json("");
    }
    if (fileNames) {
      let filesWithIcon = getFilesWithIcons(pwd, filterDot(fileNames))
      res.json({
        filteredFile: filterDot(fileNames),
        body: filesWithIcon,
        message: "File send",
      });
    }
  });


  // if(fs.statSync(pwd).isDirectory()) 
  //   {
  //     // send the data inside this dir
  //     readDirectory(pwd)
  //     .then((response) => {
  //       console.log(response)
  //     }).catch((error) => {
  //       console.log(error.message)
  //     })
      
  //   }
  //   else 
  //   {
  //     // open file
  //   }
  

});

// to delete any particular file
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


function isDirectory(way, file) {
  return fs.statSync(path.join(way, file)).isDirectory()
}

// iske andar each Item aa raha hai , us file ya folder ka jo ki user ne click kiya hai, ya home se call kiya hai to home ka path and home k andr jo bhi files and Folders hai unka array aa raha hai 
function getFilesWithIcons(path, filesOrFoldersArr) 
{
  let filesWithIcon = []
  filesWithIcon =  filesOrFoldersArr.map((eachItem) => 
  {
    let itemType;
    let iconKey = "icon";

    if(isDirectory(path, eachItem))
    {
      itemType = "folders"
      let item = eachItem.toLowerCase();
      return {
        name: eachItem,
        type: itemType,
        icon: icons[itemType][item] ? icons[itemType][item][iconKey] : icons[itemType]["default"][iconKey]
      }
    }
    else 
    {
      itemType = "files"
      let index = eachItem.lastIndexOf(".")
      let ext = eachItem.slice(index+1)
      return {
        name: eachItem,
        type: itemType,
        icon: icons[itemType][ext] ? icons[itemType][ext][iconKey] : icons[itemType]["default"][iconKey]
      }
    }
   
  })

  return filesWithIcon;
}

function readDirectory(pwd) {
  return new Promise((resolve, reject) => {
    fs.readdir(pwd, (err, fileNames) => {
      if(err) {
        console.log("Error occured while reading Directory")
        reject(err)
      }
      if(fileNames) {
        // return getFilesWithIcons(pwd, filterDot(filesNames))
        // resolve(getFilesWithIcons(pwd, filterDot(filesNames)))
        // resolve(true)
      }
    })
  })
}

console.log("home", home)


