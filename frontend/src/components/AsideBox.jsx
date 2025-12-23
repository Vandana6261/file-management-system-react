import React from "react";
import { useState } from "react";
import useFileContext from "./../context/FileContext";
import useFileManager from "./../hooks/useFileManager";

function AsideBox() {
  const [active, setActive] = useState("My Files");

  const { homeDir } = useFileContext();
  const { getInsideFileApi } = useFileManager();
  // console.log(homeDir)

  const getInsideSpecifiLocation = (current) => {
    // console.log(active)
    if (current == "Desktop" || current == "Music" || current == "Downloads" || current == "OneDrive") {
      let path = `${homeDir}\\${current}`;
      console.log(path);
      getInsideFileApi(path);
    }
  };

  return (
    <div className="w-full  bg-[#D2E1DA] dark:bg-[#212121] py-4 px-2 border-r-2 border-[#00796B] h-screen overflow-hidden sticky top-0 text-[#2D3436] dark:text-white">
      <div>
        <h2 className="font-bold text-2xl text-center">File Manager</h2>
        <h2
          className={`border-gray-400 cursor-pointer rounded p-2 mt-4 hover:translate-x-1.5 transition-all duration-200 bg-[#00796B] `}
        >
          Dashboard
        </h2>
        <ul className="flex flex-col gap-0 mt-4 ">
          <li
            className={`border-gray-400 cursor-pointer rounded p-2  hover:translate-x-1.5   transition-all duration-200 ${
              active == "My Files" ? "bg-secondary text-black" : "hover:bg-gray-600/50"
            } `}
            onClick={() => setActive("My Files")}
          >
            📄 My Files
          </li>
          {/* start paste */}
            <li
              className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5  transition-all duration-200 ${
                active == "Desktop" ? "bg-secondary" : "hover:bg-gray-600/50"
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
                active == "OneDrive" ? "bg-secondary" : "hover:bg-gray-600/50"
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
                active == "Download" ? "bg-secondary" : "hover:bg-gray-600/50"
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
                active == "Music" ? "bg-secondary" : "hover:bg-gray-600/50"
              }`}
              onClick={() => {
                setActive("Music");
                getInsideSpecifiLocation("Music");
              }}
            >
              🎵 Music
            </li>
          

          {/* end */}
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Shared" ? "bg-secondary" : "hover:bg-gray-600/50"
            }`}
            onClick={() => setActive("Shared")}
          >
            👥 Shared
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Recent" ? "bg-[#27dcc7bc]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => setActive("Recent")}
          >
            🕘 Recent
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Favourites" ? "bg-[#27dcc7bc]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => setActive("Favourites")}
          >
            ⭐ Favourites
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Trash" ? "bg-[#27dcc7bc]" : "hover:bg-gray-600/50"
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
        {/* <ul className="mt-4">
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
        </ul> */}
      </div>
    </div>
  );
}

export default AsideBox;
