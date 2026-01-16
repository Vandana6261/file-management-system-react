import React, { useState, useEffect } from "react";
import useFileContext from "../context/FileContext"
import useFileManager from '../hooks/useFileManager.js';

function AllFile() {
  const {currentPath, setCurrentPath, filesData, backword, forward, recentFile, setRecentFile} = useFileContext()
  const {getInsideFileApi, getFileApi} = useFileManager()
  const [selectIndex, setSelectIndex] = useState(-1)
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 20;
  const totalPages = Math.ceil(filesData.length / pageSize);
  const startIndex = (currentPage-1) * pageSize;
  const currentData = filesData.slice(startIndex, startIndex + pageSize);

  console.log(`pageSize = ${pageSize}, totalPages = ${totalPages}, startIndes = ${startIndex}, currentPage = ${currentPage}`)

  const getInsideFile = (clickedFile) => {
    // const clickedFile = e.target.textContent;
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
      <div className="text-black dark:text-white w-full p-4 overflow-y-auto max-h-[78vh]">
        <div className="files flex flex-wrap justify-center mt-4 gap-4">
          {/* <div>{backword}</div> */}
          {currentData ?  currentData.map((item, index) => {
            if(typeof item === "string") return <p>No such file or directory</p> 
            else {
              return (
                <div
                  key={index}
                  className={`file bg-card-light dark:bg-card-dark w-30 h-30 rounded cursor-pointer flex flex-col justify-center items-center transition-all duration-200 hover:-translate-y-1.5 hover:scale-105 select-none ${selectIndex == index ? "bg-green-900/50 dark:bg-green-300/30" : ""}`}
                  onDoubleClick={() => getInsideFile(item.name)}
                  onClick={() => setSelectIndex(prev => index)}
                >
                  <div className="text-6xl">{item.icon}</div>
                  <p
                    className="mx-4 select-none truncate w-full text-center p-2 "
                  >
                    {item.name}
                  </p>
                </div>
              );
            }
          }) 
          : 
          <p key={Date.now()}>Loading...</p>
        }
        </div>

        {currentData && 
          <section className="w-[79%] p-4 mt-8 text-right fixed bottom-1 ">
            <button 
              className="border px-2 py-1 rounded-md mr-4 bg-primary hover:bg-[#007568bc] hover:scale-95 transition-all duration-200 text-white"
              onClick={() => {
                console.log("Prev Clicked")
                setCurrentPage(pre => pre - 1)}
              }
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span></span>
            <button
              className="border px-2 py-1 rounded-md mr-4 bg-primary hover:bg-[#007568bc] hover:scale-95 transition-all duration-200 text-white"
              onClick={() => {
                console.log("Nex is clicked")
                setCurrentPage(pre => pre + 1)}}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </section>
        }
      </div>
    </>
  );
}

export default AllFile;
