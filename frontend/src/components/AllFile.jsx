import React, { useState, useEffect } from "react";
import useFileContext from "../context/FileContext"
import useFileManager from '../hooks/useFileManager.js';

function AllFile() {
  const {currentPath, setCurrentPath, filesData} = useFileContext()
  const {getInsideFileApi, getFileApi} = useFileManager()

  const getInsideFile = (e) => {
    // console.log(currentPath)
    const clickedFile = e.target.textContent;
    let path = `${currentPath}\\${clickedFile}`
    console.log(path)
    getInsideFileApi(path)
  }
  
  return (
    <>
      <div className="text-white w-full p-4 ">
        <div className="files flex flex-wrap mt-4 gap-4 ">
          {/* <div>{backword}</div> */}
          {filesData.map((item, index) => {
            return (
              <div
                key={index}
                className="file bg-[#3E3E42] w-30 h-30 rounded flex flex-col justify-center items-center transition-all duration-200 hover:-translate-y-1.5 hover:scale-105  "
              >
                <div>{item.icon}</div>
                <p
                  className="mx-4 truncate w-full text-center p-2 cursor-pointer"
                  onClick={(e) => getInsideFile(e)}
                >
                  {/* {item} */}
                  {item.name}
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
