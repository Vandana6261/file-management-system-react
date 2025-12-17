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
      console.log(error, "error");
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  const getInsideFileApi = async (path) => {
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
  };

  const getFileApi = async (path) => {
    const response = await fetch("http://localhost:3000");
    if (!response.ok) {
      setMessage("error");
    } else {
      const data = await response.json();
      console.log(data.filteredFile)
      if (Array.isArray(data.filteredFile)) {
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
        setMessage(data.message);
        
      }
    }
  };

  return {
    getInsideFileApi,
    getFileApi,
    loadFiles
  }
}

export default useFileManager;
