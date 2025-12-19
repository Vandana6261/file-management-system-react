const express = require("express");
const cors = require("cors");
const path = require("path");
const icons = require("./icons.json")
const { exec } = require("child_process")

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

const platformCommands = [
  { platform: "aix", cmd: "xdg-open" },
  { platform: "darwin", cmd: "open" },
  { platform: "freebsd", cmd: "xdg-open" },
  { platform: "linux", cmd: "xdg-open" },
  { platform: "openbsd", cmd: "xdg-open" },
  { platform: "sunos", cmd: "xdg-open" },
  { platform: "win32", cmd: "start" },
  { platform: "android", cmd: "am start" },
  { platform: "ios", cmd: "open" }
];


// this is check what frontend is requesting
app.use((req, res, next) => {
  console.log("REQUEST: ", req.method, req.url);
  next();
});

// first time call
app.get("/home", (req, res) => 
{
  fs.readdir(home, (err, fileNames) => {
    if (err) return res.status(500).json({ error: err.message });
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
// call from the getInsideFileApi function
app.post("", (req, res) => 
{
  file = req.body.filePath;
  console.log("Post Called with path ", file)
  pwd = path.normalize(req.body.filePath);
  console.log("response send")
  res.json({
    message: "Success",
    data: req.body,
  });
});

// call from getFile function
app.get("", (req, res) => {
  // console.log("Get is called with path ", pwd)
  if(fs.statSync(pwd).isDirectory()) 
    {
      // send the data inside this dir
      readDirectory(pwd)
      .then((response) => {
        res.json({
          body: response,
          message: "File send",
        })
      }).catch((error) => {
        console.log(error.message)
        res.json({
          messsage: "System has no permission to open this file of folder"
        })
      })
      
    }
    else 
    {
      // open file
      fileOpener(pwd);
    }
  

});

// to create a file or folder
app.post("/create", (req, res) => {
  let fileName = req.body.fileOrFolderName;
  let fileType = req.body.type;
  let currentPath = req.body.path;
  
  destination = path.join(currentPath, fileName)
  console.log(fileType)
  if(fileType == "file") 
  {
    fs.writeFile(destination, "", (err) => {
      if(err) console.log("Error while creating file : ", err);
      // console.log("File created");
      return res.json({
        message: "File Created Successfully"
      })
    })
  }
  else 
  {
    fs.mkdir(destination, (err) => {
      if(err) console.log("Error while creating Folder: ", err);
      return res.json({
        message: "Folder Created Successfully"
      })
    })
  }
})

// to delete any particular file
app.delete("/delete", (req, res) => 
{
  let filePath = req.body;
  fs.unlink(filePath, (err) => 
  {
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

function readDirectory(pwd) 
{
  console.log("readDirectory called")
  return new Promise((resolve, reject) => 
  {
    fs.readdir(pwd, (err, fileNames) => 
    {
      if(err) {
        console.log("Error occured while reading Directory")
        reject(err)
      }
      if(fileNames) {
        resolve(getFilesWithIcons(pwd, filterDot(fileNames))) 
      }
    })
  })
}


function fileOpener(path) 
{
  let osType = process.platform;
  let osInfo = platformCommands.find((eachOsInfo) => eachOsInfo.platform == osType)
  let osCommand = osInfo.cmd;   // -> start
  let command = `${osCommand} "" "${path}"`

  exec(command, (error, stdout, stderr) => 
  {
    if(error) 
    {
      console.log("Error: ", error);
      return;
    }
    if(stderr) 
    {
      console.log("Stderr", stderr);
    }
  })
}



