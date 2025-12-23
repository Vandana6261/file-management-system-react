import React, { useState, useEffect } from "react";
import useFileContext from "../context/FileContext"
import useFileManager from '../hooks/useFileManager.js';

function AllFile() {
  const {currentPath, setCurrentPath, filesData, backword, forward} = useFileContext()
  const {getInsideFileApi, getFileApi} = useFileManager()

  const getInsideFile = (e) => {
    const clickedFile = e.target.textContent;
    let path = `${currentPath}\\${clickedFile}`
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
                className="file bg-[#4678707e] dark:bg-[#4152507e] w-30 h-30 rounded flex flex-col justify-center items-center transition-all duration-200 hover:-translate-y-1.5 hover:scale-105  "
              >
                <div className="text-6xl">{item.icon}</div>
                <p
                  className="mx-4 select-none truncate w-full text-center p-2 cursor-pointer"
                  onDoubleClick={(e) => getInsideFile(e)}
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
