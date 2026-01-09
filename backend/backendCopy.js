const express = require("express");
const cors = require("cors");
const path = require("path");
const icons = require("./icons.json");
const { exec, spawn } = require("child_process");

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
    let filesWithIcon = getFilesWithIcons(home, filteredFile);
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
app.post("", (req, res) => {
  pwd = path.normalize(req.body.filePath);
  console.log("response send");
  res.json({
    message: "Success",
    data: req.body,
  });
});

// call from getFile function
app.get("", (req, res) => {
  // console.log("Get is called with path ", pwd)
  if (fs.statSync(pwd).isDirectory()) {
    // send the data inside this dir
    readDirectory(pwd)
      .then((response) => {
        res.json({
          body: response,
          message: "File send",
        });
      })
      .catch((error) => {
        console.log(error.message);
        res.json({
          messsage: "System has no permission to open this file of folder",
        });
      });
  } else {
    // open file
    fileOpener(pwd);
    // console.log(pwd)
  }
});

app.post("/recent", (req, res) => {
  console.log("Recent called");
  let filePath = req.body.pathArr;
  let pathIconArray = filePath.map((eachPath) => {
    let fileName = path.basename(eachPath);
    let fileData = getIcon("files", fileName);
    if (!fileData) {
      res.json({
        message: "Something happen inside this recent api call",
      });
    } else {
      fileData.path = path.normalize(eachPath);
      return fileData;
    }
  });
  res.json({
    message: "Success",
    pathIconArray,
  });
});

// to create a file or folder
app.post("/create", (req, res) => {
  const fileName = req.body.fileOrFolderName;
  const fileType = req.body.type;
  const currentPath = req.body.path;

  createFileOrFolder(currentPath, fileName, fileType)
    .then((res) => console.log(res))
    .then(() => {
      res.json({
        message: "File Created Successfully",
      });
    })
    .catch((error) => console.log(error));
});

app.get("/search", async (req, res) => {
  // path : C:\Users\vvand\Desktop\sample\src\package1
  let valToBeSearched = req.query.name;
  let currentPath = req.query.path;
  // console.log(currentPath, valToBeSearched)
  let searchArr = await searchByName(currentPath, valToBeSearched);
  console.log(searchArr, "122")
  7
  if(searchArr) {
    res.json({
      message: "Success",
      body: searchArr,
  })
  } else {
    res.json({
      message: "Something wrong happen"
    })
  }
});

function searchByName(currentPath="", valToBeSearched) {
  // Get-ChildItem "C:\Users\vvand\Desktop\sample" -Recurse -Filter "*m*"
  let osType = process.platform;
  
  let cmd;
  switch (osType) {
    case "win32":
      cmd = "powershell";
      command = ["-NoProfile","-Command", "Get-ChildItem","-Path",`"${currentPath}"`,"-Filter",`"*${valToBeSearched}*"`,"-Recurse","-ErrorAction","SilentlyContinue","|","Select-Object","-ExpandProperty","FullName"];
      // command = ["-NoProfile","-Command", command];
      break;
    default:
      console.log("Error while searching file");
      return;
  }
  return search(cmd, command)
  .then(res => {
    // console.log("Start")
    // console.log(res)
    // console.log("end")
    console.log(res)
    return res;
  })
  .catch(err => console.log("error in 144"))
  
}

function search(cmd, command) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, command);
    let output = ""
    child.stdout.on("data", (data) => {
      // console.log(typeof data)
      // console.log(data.toString(), "data")
      output += data.toString();
    });

    child.stderr.on("data", (data) => {
      console.error(data.toString());
      });

    child.on('close', code => {
      // console.log(code)
      console.log('Exited with code:', code);
      if(code != 0) {
        reject(new Error(`Error while searching file -> ${code}`))
      } else {
        // console.log(output.split(" "))
        resolve(output.trim().split(/\r?\n/))
      }
    }); 
  })
}

// searchByName("C:Users\\vvand\\Desktop\\sample", "s");
// .then(res => console.log(res)).catch(err => console.log(err))

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
  return fs.statSync(path.join(way, file)).isDirectory();
}

function getFilesWithIcons(pwd, filesOrFoldersArr) {
  let filesWithIcon = [];
  filesWithIcon = filesOrFoldersArr.map((eachItem) => {
    // console.log("eachItem", eachItem)
    let itemType;
    let iconKey = "icon";

    if (isDirectory(pwd, eachItem)) {
      itemType = "folders";
      let item = eachItem.toLowerCase();
      return {
        name: eachItem,
        type: itemType,
        icon: icons[itemType][item]
          ? icons[itemType][item][iconKey]
          : icons[itemType]["default"][iconKey],
      };
    } else {
      itemType = "files";
      let index = eachItem.lastIndexOf(".");
      let ext = eachItem.slice(index + 1);
      return {
        name: eachItem,
        type: itemType,
        icon: icons[itemType][ext]
          ? icons[itemType][ext][iconKey]
          : icons[itemType]["default"][iconKey],
      };
    }
  });

  return filesWithIcon;
}

// console.log(getIcon("folder", "hello"))
// this is for get Files or Folders icon directly
function getIcon(type, fileFolderName) {
  let iconKey = "icon";
  if (type == "folders") {
    // i will do these later
    return {
      name: fileFolderName,
      type,
      icon: icons[type][fileFolderName]
      ? icons[type][item][iconKey]
      : icons[itemsType]["default"][iconKey]
    }
  } else {
    let index = fileFolderName.lastIndexOf(".");
    let ext = fileFolderName.slice(index + 1);
    console.log(ext)
    // console.log(icons[type][ext] ? icons[type][ext][iconKey] : icons[itemType]["default"][iconKey])
    return {
      name: fileFolderName,
      type,
      icon: icons[type][ext]
        ? icons[type][ext][iconKey]
        : icons[type]["default"][iconKey],
    };
  }
  console.log("Some error inside getIcon");
}

function readDirectory(pwd) {
  console.log("readDirectory called");
  return new Promise((resolve, reject) => {
    fs.readdir(pwd, (err, fileNames) => {
      if (err) {
        console.log("Error occured while reading Directory");
        reject(err);
      }
      if (fileNames) {
        resolve(getFilesWithIcons(pwd, filterDot(fileNames)));
      }
    });
  });
}

function fileOpener(path) {
  let osType = process.platform;
  let cmd;
  switch (osType) {
    case "win32":
      cmd = "cmd";
      command = ["/c", "start", "", path];
      break;
    case "linux":
      cmd = "sh";
      command = [path];
      break;
    case "ios":
      cmd = "open";
      command[path];
      break;
    default:
      console.log("Error while opening the file");
      return;
  }

  const child = spawn(cmd, command, {
    detached: true,
    stdio: "ignore",
  });
  child.unref();
}

function createFileOrFolder(currentPath, fileName, fileType) {
  console.log("Function createFile called");
  return new Promise((resolve, reject) => {
    const destination = path.join(currentPath, fileName);
    if (fileType === "file") {
      fs.writeFile(destination, "", (err) => {
        if (err) {
          console.log("Error while creating file : ", err);
          reject("Error while creating file");
        } else {
          resolve("File created Successfully");
        }
      });
    } else {
      fs.mkdir(destination, (err) => {
        if (err) {
          reject("Error while creating folder");
          return;
        } else {
          resolve("Folder Created Successfully");
        }
      });
    }
  });
}
