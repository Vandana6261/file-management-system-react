import React, { useState, useEffect } from "react";
import { getApiCalling, getInsideFileApi, getFileApi } from "../api/fileApi.js";


function AllFile({backword, forward, setBackword, setForward, home, setHome, currentPath, setCurrentPath, filesData, setFilesData}) {
  // const [home, setHome] = useState("");
  // const [currentPath, setCurrentPath] = useState("");
  // const [filesData, setFilesData] = useState([]);
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    getApiCalling().then((files) => {
      let allDir = files.filteredFile;
      let home = files.home;
      setHome(home);
      setFilesData(allDir);
      setCurrentPath(home);
      setBackword(home);
      console.log(currentPath)
    });
  }, []);

  const getInsideFile = async (path) => {
    path = currentPath + "\\" + path;

    console.log("Path", path)

    const response = await getInsideFileApi(path)
    setMessage(response.message)
    if(response) {
      const files = await getFileApi()
      if(files) {
        setCurrentPath(path)
        setBackword(prev => [...prev, path])
        // console.log(files.filteredFile)
        setFilesData(files.filteredFile)
      }
    }

    console.log(currentPath)
  };

  const changeCurrentPath = (e) => {
    let path = e.target.textContent;
    console.log(path)
    console.log(currentPath)
    getInsideFile(path)
  }

  return (
    <>
      <div className="text-white w-full p-4">
        <div className="files flex flex-wrap mt-4 gap-4">
          {filesData.map((item, index) => {
            return (
              <div
                key={index}
                className="file bg-[#3E3E42] w-44 h-44 rounded flex flex-col justify-center items-center transition-all duration-200 hover:-translate-y-1.5 hover:scale-105  "
              >
                <div>icon</div>
                <p
                  className="mx-4 truncate w-full text-center p-2 cursor-pointer"
                  onClick={(e) => changeCurrentPath(e)}
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
