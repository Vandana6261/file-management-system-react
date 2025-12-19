import { useState, useEffect } from "react";
import useFileContext from "../context/FileContext.jsx"


function useFileManager() {
    const {currentPath, setCurrentPath, message, setMessage, filesData, setFilesData, backword, setBackword, forward, setForward} = useFileContext()

  async function loadFiles() {
    try {
      const response = await fetch("http://localhost:3000/home");
      if (!response) {
        console.log("Internal Server Error");
      } else {
        const data = await response.json();
        setFilesData(data.body)
        setCurrentPath(data.home);
        setBackword((prev) => [data.home]);
        setForward([])
      }
    } catch (error) {
      console.log("Error in loadFiles :", error);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  const getInsideFileApi = async (path) => {
    try {
      console.log("getInsideFile Api called")
      console.log(path)
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filePath: path }),
      });
      if (!response.ok) {
        setMessage("error");
        return;
      } else {
        const data = await response.json();
        setMessage(data);
        await getFileApi(path);
      }
    } catch (error) {
      console.log("Error in getInsideFileApi : ", error)
    }
  };

  const getFileApi = async (path) => {
    try {
      console.log("get api called")
      const response = await fetch("http://localhost:3000");
      if (!response.ok)
      {
        setMessage("error");
      } 
      else
        {
        const data = await response.json();
        if (Array.isArray(data.body)) {
          if(backword[backword.length - 1] == path) {
            setBackword(prev => prev.slice(0, -1))
          } else if(forward[forward.length - 1] == path) {
            setForward(prev => prev.slice(0, -1))
          }
          else {
            setBackword(prev => [...prev, currentPath])
          }
          setCurrentPath(path);
          setFilesData((prev) => data.body);
          
        }
        else {
          setMessage(data.message);
        }
      }
    }
    catch(error) 
    {
        console.log(error)
    }
  };

  const createFileOrFolderApi = async (path, name, type) => {
    console.log(path, name, type)
    try 
    {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileOrFolderName: name,
          type,
          path
        })
      });
      if(!response.ok) {
        setMessage("error")
        console.log("Response is not ok while creating a file or folder");
      }
      else 
      {
        const data = await response.json();
        console.log("data received")
        setMessage(data);
        console.log("getFileApi calling")
        await getFileApi(path);
      }
    }
    catch (error) 
    {
      console.log("Error in catch block in creatFileOrFolderAPi : ", error)
    }
  }
  

  return {
    loadFiles,
    getInsideFileApi,
    getFileApi,
    createFileOrFolderApi,

  }
}

export default useFileManager;
