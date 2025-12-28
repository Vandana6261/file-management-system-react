import React from "react";
import { useState } from "react";
import useFileContext from "./../context/FileContext";
import useFileManager from "./../hooks/useFileManager";
import RecentFile from "./RecentFile";

function AsideBox( { showRecent, setShowRecent} ) {
  const [active, setActive] = useState("My Files");

  const { homeDir } = useFileContext();
  const { getInsideFileApi } = useFileManager();
  // console.log(homeDir)

  const getInsideSpecifiLocation = (current) => {
    // console.log(active)
    if (
      current == "Desktop" ||
      current == "Music" ||
      current == "Downloads" ||
      current == "OneDrive"
    ) {
      let path = `${homeDir}\\${current}`;
      console.log(path);
      getInsideFileApi(path);
    }
  };

  return (
    <div className="w-full  bg-main-light dark:bg-main-dark py-4 px-2 border-r-2 border-primary h-screen overflow-hidden sticky top-0 text-text-light dark:text-text-dark">
      <div>
        <h2 className="font-bold text-2xl text-center">File Manager</h2>
        <h2
          className={` cursor-pointer rounded p-2 mt-4 hover:translate-x-1.5 transition-all duration-200 bg-primary `}
        >
          Dashboard
        </h2>
        <ul className="flex flex-col gap-0 mt-4 ">
          <li
            className={` cursor-pointer rounded p-2  hover:translate-x-1.5   transition-all duration-200 ${
              active == "My Files"
                ? "bg-secondary text-black"
                : "hover:bg-hoverColor"
            } `}
            onClick={() => setActive("My Files")}
          >
            📄 My Files
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5  transition-all duration-200 ${
              active == "Desktop" ? "bg-secondary" : "hover:bg-hoverColor"
            }`}
            onClick={() => {
              setActive("Desktop");
              getInsideSpecifiLocation("Desktop");
            }}
          >
            🖥️ Desktop
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "OneDrive" ? "bg-secondary" : "hover:bg-hoverColor"
            }`}
            onClick={() => {
              setActive("OneDrive");
              getInsideSpecifiLocation("OneDrive");
            }}
          >
            ⬇️ OneDrive
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Download" ? "bg-secondary" : "hover:bg-hoverColor"
            }`}
            onClick={() => {
              setActive("Download");
              getInsideSpecifiLocation("Downloads");
            }}
          >
            ⬇️ Downloads
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Music" ? "bg-secondary" : "hover:bg-hoverColor"
            }`}
            onClick={() => {
              setActive("Music");
              getInsideSpecifiLocation("Music");
            }}
          >
            🎵 Music
          </li>

          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Shared" ? "bg-secondary" : "hover:bg-hoverColor"
            }`}
            onClick={() => setActive("Shared")}
          >
            👥 Shared
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Recent" ? "bg-primary" : "hover:bg-hoverColor"
            }`}
            onClick={() => setActive("Recent")}
          >
              <div className="flex justify-between"
                onClick={() => setShowRecent(!showRecent)}
              >
                <p>🕘 Recent</p>
                <p  className={`${showRecent ? "rotate-180" : ""}`}>˅</p>
              </div>
              {/* <div className="z-100 w-[70vw] fixed">
                {showRecent && 
                <RecentFile showRecent={showRecent} setShowRecent={setShowRecent}/>
                }
              </div> */}
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Favourites" ? "bg-primary" : "hover:bg-hoverColor"
            }`}
            onClick={() => setActive("Favourites")}
          >
            ⭐ Favourites
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Trash" ? "bg-primary" : "hover:bg-hoverColor"
            }`}
            onClick={() => setActive("Trash")}
          >
            🗑️ Trash
          </li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold text-3xl text-primary text-center">
          Location
        </h2>
      </div>
    </div>
  );
}

export default AsideBox;
