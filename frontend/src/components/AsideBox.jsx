import React from "react";
import { useState } from "react";
import useFileContext from './../context/FileContext';
import useFileManager from './../hooks/useFileManager';



function AsideBox() {
  const [active, setActive] = useState("My Files");

  const {homeDir} = useFileContext();
  const {getInsideFileApi} = useFileManager()
  // console.log(homeDir)

  const getInsideSpecifiLocation = (current) => {
    // console.log(active)
    if(current == "Desktop" || current == "Music" || current == "Downloads") {
      let path = `${homeDir}\\${current}`
      console.log(path)
      getInsideFileApi(path);
    }
  }

  return (
    <div className="w-full bg-[#212121] py-4 px-2 border-r-2 h-screen overflow-hidden sticky top-0 text-white">
      <div>
        <h2 className="font-bold text-2xl text-center">File Manager</h2>
        <ul className="flex flex-col gap-0 mt-4 ">
          <li
            className={`border-gray-400 cursor-pointer rounded p-2  hover:translate-x-1.5 transition-all duration-200 ${
              active == "Dashboard" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            } `}
            onClick={() => setActive("Dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`border-gray-400 cursor-pointer rounded p-2  hover:translate-x-1.5   transition-all duration-200 ${
              active == "My Files" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            } `}
            onClick={() => setActive("My Files")}
          >
            📄 My Files
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Shared" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => setActive("Shared")}
          >
            👥 Shared
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Recent" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => setActive("Recent")}
          >
            🕘 Recent
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Favourites" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => setActive("Favourites")}
          >
            ⭐ Favourites
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Trash" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => setActive("Trash")}
          >
            🗑️ Trash
          </li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold text-3xl text-[#00796B] text-center">
          Location
        </h2>
        <ul className="mt-4">
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5  transition-all duration-200 ${
              active == "Desktop" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => {
              setActive("Desktop")
              getInsideSpecifiLocation("Desktop");
            }}
          >
            🖥️ Desktop
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Download" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => {
              setActive("Download")
              getInsideSpecifiLocation("Downloads");
            }}
          >
            ⬇️ Downloads
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Music" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => {
              setActive("Music")
              getInsideSpecifiLocation("Music");
            }}
          >
            🎵 Music
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AsideBox;
