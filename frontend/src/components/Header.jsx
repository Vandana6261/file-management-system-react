import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import useFileManager from '../hooks/useFileManager';
import useFileContext from './../context/FileContext';

function Header() {
  const {backword, setBackword, currentPath, forward, setForward} = useFileContext()
  const {getInsideFileApi, loadFiles} = useFileManager()

  const updateBackword = () => {
    // console.log("backword", backword)
    // console.log("forward", forward)
    
    if(backword.length > 1 ) {
      let lastVisitedPath = backword[backword.length-1]
      setForward(prev => [...prev, currentPath])
      getInsideFileApi(lastVisitedPath)
    }  else {
      if(backword.length > 0) loadFiles(backword[0])
    }
  }

  const updateForward = () => {
    // console.log("udateForward clicked")
    // console.log("backword", backword)
    // console.log("forward", forward)
    if(forward.length > 0) {
      // setForward(prev => prev.slice(0, -1))
      let lastVisitedPath = forward[forward.length-1]
      setBackword(prev => [...prev, lastVisitedPath])
      getInsideFileApi(lastVisitedPath)
    }
  }

  return (
    <>
      <header className="flex justify-between items-center sticky top-0 bg-gray-800 z-20 w-full p-4 text-white border-b-2 border-[#00796B]">
        {/* left part of header */}
        <div className="top-left flex items-center gap-4 w-1/2 ">
          <div className="icons-div flex gap-2">
            <span className="p-4 rounded bg-gray-600/50 transition-all duration-200 hover:scale-90"
            onClick={updateBackword}
            >
              <FaArrowLeft />
            </span>
            <span className="p-4 rounded bg-gray-600/50 transition-all duration-200 hover:scale-90"
            onClick={updateForward}
            >
              <FaArrowRight />
            </span>
          </div>
          <div className="path">
            <p>Home AppData</p>
          </div>
        </div>

        {/* right part of header */}
        <div className="top-right w-1/2 flex gap-4">
            <input
            className="border-white bg-[##2D2D30] py-2 px-4 rounded-full outline-1 transition-all duration-200 focus:outline-white w-64 focus:-translate-x-1.5 focus:shadow-[0_0_10px_rgba(100, 100, 100, 0.8)"
            type="text" 
            placeholder="Search Files and Folders"
            />
            <button className="bg-[#00796B] px-4 py-2 rounded transition-all duration-200 hover:rotate-6 hover:scale-105">Add File</button>
        </div>
      </header> 
      {/* <div className="text-white">
        <p>{backword} : backword</p>
        <p>{forward} : forward</p>
        <p>{currentPath} : currentPath</p>
      </div> */}
    </>
  );
}

export default Header;
