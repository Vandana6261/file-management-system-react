import React, { useState, useEffect } from "react";
import useFileContext from "../context/FileContext"
import useFileManager from '../hooks/useFileManager.js';

function AllFile() {
  const {currentPath, setCurrentPath, filesData, backword, forward, recentFile, setRecentFile} = useFileContext()
  const {getInsideFileApi, getFileApi} = useFileManager()

  const getInsideFile = (e) => {
    const clickedFile = e.target.textContent;
    let path = `${currentPath}\\${clickedFile}`

    if(clickedFile.includes(".")) {
      let recentTempArr = JSON.parse(localStorage.getItem("recent")) || []
      if(!recentTempArr.includes(path)) {
        recentTempArr = [...recentTempArr, path];
      }
      if(recentTempArr.length > 10) recentTempArr.shift();

      localStorage.setItem("recent", JSON.stringify(recentTempArr));
    }
    // console.log(backword)
    getInsideFileApi(path)
  }
  
  return (
    <>
      <div className="text-black dark:text-white w-full p-4 ">
        <div className="files flex flex-wrap mt-4 gap-4 ">
          {/* <div>{backword}</div> */}
          {filesData && filesData.map((item, index) => {
            return (
              <div
                key={index}
                className="file bg-card-light dark:bg-card-dark w-30 h-30 rounded cursor-pointer flex flex-col justify-center items-center transition-all duration-200 hover:-translate-y-1.5 hover:scale-105  "
                onDoubleClick={(e) => getInsideFile(e)}
              >
                <div className="text-6xl">{item.icon}</div>
                <p
                  className="mx-4 select-none truncate w-full text-center p-2 "
                  
                >
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
