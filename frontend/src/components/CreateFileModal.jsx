import React, { useState } from "react";
import useFileContext from "./../context/FileContext";
import useFileManager from "./../hooks/useFileManager";

function CreateFileModal({open, setOpen}) {
  const { currentPath } = useFileContext();
  const { createFileOrFolderApi } = useFileManager();
  const [fileOrFolderName, setFileOrFolderName] = useState("")
  const [type, setType] = useState("file")

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(currentPath, fileOrFolderName, type)
        if((type == "file" && fileOrFolderName.includes("."))  || type == "folder") {
            createFileOrFolderApi(currentPath, fileOrFolderName, type);
            setFileOrFolderName("")
            setOpen(false);
        } else {
            alert("Please give the extension type with file") 
            return;
        }
    }

  return (
    <>
      <div className={`modal h-screen w-screen fixed flex justify-center items-center top-0 backdrop-blur-sm text-white z-30 ${open ? "flex" : "hidden"}`} >

        <div className="absolute left-[70%] top-[30%] bg-[#038b7b67] p-2 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer" onClick={() => setOpen(false)}>X</div>

        <div className="modal-content border-2 border-gray-300/30 h-60 w-72 rounded-md p-4">

          <form action="#" className="flex flex-col items-center gap-4">
            
            <input type="text" placeholder="Enter file name" name="inputName" value={fileOrFolderName} onChange={(e) => setFileOrFolderName(e.target.value)} required  className="p-2 outline-1 outline-gray-300/30 rounded-md w-full" />

            <div className="btn" className="flex flex-wrap gap-2">

              <div className={`flex-1/3 border-2 border-[#00796B] rounded-md p-2 text-xl transition-all duration-75 ease-linear hover:text-lg hover:scale-95 cursor-pointer ${type === "file" ? "bg-[#00796B]" : ""}`}  onClick={() => setType("file")}>File</div>
              <div className={`flex-1/3 border-2 border-[#00796B] rounded-md p-2 text-xl transition-all duration-75 ease-linear hover:text-lg hover:scale-95 cursor-pointer ${type === "folder" ? "bg-[#00796B]" : ""}`}  onClick={() => setType("folder")}>Folder</div>
              <div className="flex-1/3 border-2 border-[#00796B] rounded-md p-2 text-xl transition-all duration-75 ease-linear hover:text-lg hover:scale-95 cursor-pointer" onClick={() => {
                setOpen(false)
                setFileOrFolderName("")
              }}>Cancel</div>
              <button className="flex-1/3 border-2 border-[#00796B] rounded-md p-2 text-xl transition-all duration-75 ease-linear hover:text-lg hover:scale-95 cursor-pointer" onClick={submitHandler} type="Submit">Create</button>

            </div>

          </form>

        </div>

      </div>
    </>
  );
}

export default CreateFileModal;
