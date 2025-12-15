import React from "react";
import { useState } from "react";

function AsideBox() {
  const [active, setActive] = useState("My Files");

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
            onClick={() => setActive("Desktop")}
          >
            🖥️ Desktop
          </li>
          <li
            className={`border-gray-400 cursor-pointer p-2 rounded hover:translate-x-1.5 transition-all duration-200 ${
              active == "Download" ? "bg-[#00796B]" : "hover:bg-gray-600/50"
            }`}
            onClick={() => setActive("Download")}
          >
            ⬇️ Download
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AsideBox;
