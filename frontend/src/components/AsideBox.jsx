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

  const storageLocation  = [
    {name: "Desktop", icon: "🖥️"}, 
    {name: "OneDrive", icon: "⬇️"}, 
    {name: "Downloads", icon: "⬇️"}, 
    {name: "Music", icon: "🎵"},
    {name: "Shared", icon: "👥"},
    {name: "Trash", icon: "🗑️"},
    {name: "Favourite", icon: "⭐"},
  ]

  const getInsideSpecifiLocation = (current) => {
    // console.log(active)
    // if(storageLocation.find(each => each.name === current)) console.log("Yeh match")
    if (
      current == "Desktop" ||
      current == "Music" ||
      current == "Downloads" ||
      current == "OneDrive"
    ) {
      let path = `${homeDir}\\${current}`;
      getInsideFileApi(path);
    }
    else return;
  };

  return (
    <div className="w-full max-h-full bg-main-light dark:bg-main-dark py-4 px-2 border-r-2 border-primary h-screen overflow-hidden sticky top-0 text-text-light dark:text-text-dark">
      <div>
        <h2 className="font-bold text-2xl text-center">File Manager</h2>
        <h2
          className={` cursor-pointer rounded p-2 mt-4 hover:translate-x-1.5 text-white transition-all duration-200 bg-primary `}
        >
          Dashboard
        </h2>

        <ul className="flex flex-col gap-0 mt-4">
          {
            storageLocation.map((item, index) => (
              <li className={` cursor-pointer rounded p-2  hover:translate-x-1.5 transition-all duration-200 ${
              active == item
                ? "bg-secondary text-black"
                : "hover:bg-hoverColor"
              } `}
                onClick={() => {
                  setActive(item)
                  getInsideSpecifiLocation(item.name)
                  // this cause some unnecessary effect, will fix it later
                  // setShowRecent(false)
                }}
                
              >
                {item.icon} {item.name}
              </li>
            ))
          }
        </ul>

        <ul className="flex flex-col gap-0 mt-4">
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
