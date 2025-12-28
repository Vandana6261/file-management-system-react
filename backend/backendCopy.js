const express = require("express");
const cors = require("cors");
const path = require("path");
const icons = require("./icons.json")
const { exec, spawn } = require("child_process")

const app = express();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "filePath"],
  })
);
app.use(express.json());

const home = require("os").homedir();
let pwd = home;
const fs = require("fs");

const platformCommands = [
  { platform: "aix",     cmd: "sh",       startCmd: "xdg-open" },
  { platform: "darwin",  cmd: "open",     startCmd: "open" },
  { platform: "freebsd", cmd: "sh",       startCmd: "xdg-open" },
  { platform: "linux",   cmd: "sh",       startCmd: "xdg-open" },
  { platform: "openbsd", cmd: "sh",       startCmd: "xdg-open" },
  { platform: "sunos",   cmd: "sh",       startCmd: "xdg-open" },
  { platform: "win32",   cmd: "cmd",      startCmd: "start" },
  { platform: "android", cmd: "sh",       startCmd: "am start" },
  { platform: "ios",     cmd: "open",     startCmd: "open" }
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
let clickedFileorFolder;
// call from the getInsideFileApi function
app.post("", (req, res) => 
{
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
      // console.log(pwd)
    }
});

app.post("/recent", (req, res) => {
  console.log("Recent called")
  let filePath = req.body.pathArr;
  let pathIconArray = filePath.map(eachPath => {
    let fileName = path.basename(eachPath);
    let fileData = getIcon("files", fileName);
    if(!fileData) {
      res.json({
        message: "Something happen inside this recent api call"
      })
    } else {
      fileData.path = path.normalize(eachPath);
      return fileData;
    }
  })
  res.json({
    message: "Success",
    pathIconArray
  })
})

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


function getFilesWithIcons(pwd, filesOrFoldersArr) 
{
  let filesWithIcon = []
  filesWithIcon =  filesOrFoldersArr.map((eachItem) => 
  {
    // console.log("eachItem", eachItem)
    let itemType;
    let iconKey = "icon";

    if(isDirectory(pwd, eachItem))
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

// this is for get Files or Folders icon directly
function getIcon(type, fileFolderName ) {
  let iconKey = "icon";
  if(type == "folders") {
    // i will do these later

  } else {
    let index = fileFolderName.lastIndexOf(".");
    let ext = fileFolderName.slice(index + 1);
    // console.log(icons[type][ext] ? icons[type][ext][iconKey] : icons[itemType]["default"][iconKey])
    return {
      name: fileFolderName,
      type,
      icon: icons[type][ext] ? icons[type][ext][iconKey] : icons[type]["default"][iconKey]
    }
  }
  console.log("Some error inside getIcon");
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
  path = path.normalize()
  let cmd = osInfo.cmd;
  let startCmd = osInfo.startCmd;
  let command = ["/c", startCmd, "", path]

  const child = spawn(cmd, command, {
    detached: true,
    stdio: "ignore"
  })
  child.unref();  

  
}



