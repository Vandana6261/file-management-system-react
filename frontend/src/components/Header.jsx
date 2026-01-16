import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import useFileManager from "../hooks/useFileManager";
import useFileContext from "../context/FileContext";

function Header({ setOpen, open }) {
  const { homeDir, backword, setBackword, filesData, setFilesData, currentPath, forward, setForward, darkTheme, setDarkTheme, searchData, setSearchData  } =
    useFileContext();
  const { getInsideFileApi, loadFiles, searchApi} = useFileManager();
  const [searchText, setSearchText] = useState("")
  const timerValRef = useRef(null)

  const updateBackword = () => {
    // console.log("backword", backword);
    // console.log("forward", forward);

    if (backword.length > 1) {
      let lastVisitedPath = backword[backword.length - 1];
      let newArr = [...forward];
      
      if (forward.length > 10) {
        newArr.shift();
      }
      newArr.push(currentPath)
      setForward(newArr)
      // setForward((prev) => [...prev, currentPath]);
      getInsideFileApi(lastVisitedPath);
    } else if (backword.length > 0) loadFiles(backword[0]);
  };


  const updateForward = () => {
    // console.log("udateForward clicked")
    // console.log("backword", backword)
    // console.log("forward", forward)
    if (forward.length > 0) {
      let lastVisitedPath = forward[forward.length - 1];
      // if(backword[backword.length-1] !== lastVisitedPath) {
      setBackword((prev) => [...prev, lastVisitedPath]);
      // }
      getInsideFileApi(lastVisitedPath);
    }
  };


  useEffect(() => {
    let theme = localStorage.getItem("theme") || "dark"
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
      setDarkTheme(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkTheme(false);
    }
  }, [])


  // document.documentElement.classList.add("dark");
  const toggleTheme = () => {
    if (darkTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log(darkTheme, "darkTheme")
      setDarkTheme(false);
    } else {
      // console.log(darkTheme)
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark")
      setDarkTheme(true);
    }
  }


  const search = function(e) {
    // Here I am using deboucing technique........
    let val = e.target.value.trim();
    setSearchText(e.target.value)
    clearTimeout(timerValRef.current)
    if(!val) {
      clearTimeout(timerValRef.current)
      // console.log("val is empty", val)
      return;
    }
    // setFilesData("");
    timerValRef.current = setTimeout(() => {
      searchApi(currentPath, val)
      setSearchText("")
    }, 3000)
  }


  // console.log(open)
  return (
    <>
      <header className="sticky top-0 bg-header-light dark:bg-header-dark z-20 w-full p-4 dark:text-white border-b-2 border-primary ">
        {/* left part of header */}
        <div className="flex justify-between items-center select-none">

          <div className="top-left flex items-center gap-4 flex-1">
              <div className="icons-div flex gap-2">
                <span
                  className="p-4 rounded bg-gray-600/50 transition-all duration-200 hover:scale-90"
                  onClick={updateBackword}
                >
                  <FaArrowLeft />
                </span>
                <span
                  className="p-4 rounded bg-gray-600/50 transition-all duration-200 hover:scale-90"
                  onClick={updateForward}
                >
                  <FaArrowRight />
                </span>
              </div>
              <div
                className="path cursor-pointer px-4 py-2 rounded bg-primary transition-all duration-200 hover:rotate-6 hover:scale-105 text-white"
                onClick={() => loadFiles()}
              >
                <p>Go To Home</p>
              </div>
          
          </div>
          {/* right part of header */}
          <div className="top-right flex-1 flex gap-4">
            <input
              className="border-white  py-2 px-4 rounded-full outline-1 transition-all duration-200 dark:focus:outline-white w-64  focus:shadow-[0_0_10px_rgba(100, 100, 100, 0.8) dark:placeholder:text-gray-300 placeholder:text-black"
              type="text"
              placeholder="Search Files and Folders"
              value={searchText}
              onChange={(e) => search(e)}
            />
            <button
              className="bg-primary px-4 py-2 rounded transition-all duration-200 hover:rotate-6 hover:scale-105 text-white"
              onClick={() => setOpen(!open)}
            >
              Add File
            </button>
            <button className=" bg-primary px-4 py-2 rounded text-white" onClick={toggleTheme}>
              {darkTheme ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        <div className="mt-2 select-none cursor-pointer" 
          onClick={() => getInsideFileApi(currentPath)}
        >
          {currentPath}
        </div>

      </header>
    </>
  );
}

export default Header;
