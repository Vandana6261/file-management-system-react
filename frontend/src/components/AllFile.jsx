import React, { useState, useEffect } from "react";
// import { getApiCalling, getInsideFileApi, getFileApi } from "../api/fileApi.js";
import useFileManager from './hooks/useFileManager';


function AllFile() {
  // const [home, setHome] = useState("");
  // const [currentPath, setCurrentPath] = useState("");
  // const [filesData, setFilesData] = useState([]);
  const [message, setMessage] = useState("");

  const { currentPath, setCurrentPath, filesData, getInsideFileApi, backword } = useFileManager();

  // useEffect(() => {
  //   getApiCalling().then((files) => {
  //     let allDir = files.filteredFile;
  //     let home = files.home;
  //     setHome(home);
  //     setFilesData(allDir);
  //     setCurrentPath(home);
  //     setBackword(home);
  //     console.log(currentPath)
  //   });
  // }, []);

  // const getInsideFile = async (path) => {
  //   path = currentPath + "\\" + path;

  //   console.log("Path", path)

  //   const response = await getInsideFileApi(path)
  //   setMessage(response.message)
  //   if(response) {
  //     const files = await getFileApi()
  //     if(files) {
  //       setCurrentPath(path)
  //       setBackword(prev => [...prev, path])
  //       // console.log(files.filteredFile)
  //       setFilesData(files.filteredFile)
  //     }
  //   }

  //   console.log(currentPath)
  // };

  // const changeCurrentPath = (e) => {
  //   let path = e.target.textContent;
  //   console.log(path)
  //   console.log(currentPath)
  //   getInsideFile(path)
  // }

  const getInsideFile = (e) => {
    console.log(e.target.textContent)
    let clickedFileName = e.target.textContent;
    let path = currentPath + "\\" + clickedFileName;
    // console.log("getInsideFileApi calling")
    getInsideFileApi(path)
    console.log("backword", backword)
  }



  return (
    <>
      <div className="text-white w-full p-4">
        <div className="files flex flex-wrap mt-4 gap-4">
          {/* <div>{backword}</div> */}
          {filesData.map((item, index) => {
            return (
              <div
                key={index}
                className="file bg-[#3E3E42] w-44 h-44 rounded flex flex-col justify-center items-center transition-all duration-200 hover:-translate-y-1.5 hover:scale-105  "
              >
                <div>icon</div>
                <p
                  className="mx-4 truncate w-full text-center p-2 cursor-pointer"
                  onClick={(e) => getInsideFile(e)}
                >
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AllFile;
