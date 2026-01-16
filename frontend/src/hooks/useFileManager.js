import { useState, useEffect } from "react";
import useFileContext from "../context/FileContext.jsx"


function useFileManager() {
    const {homeDir, setHomeDir, currentPath, setCurrentPath, message, setMessage, filesData, setFilesData, backword, setBackword, forward, setForward} = useFileContext()

  async function loadFiles() {
    try {
      const response = await fetch("http://localhost:3000/home");
      if (!response) {
        console.log("Internal Server Error");
        console.log("Error response is not ok: ", response.status);
      } else {
        const data = await response.json();
        // console.log(data)
        setFilesData(data.body)
        setCurrentPath(data.home);
        setBackword((prev) => [data.home]);
        setHomeDir(data.home)
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
      // console.log("getInsideFile Api called")
      // console.log(path)
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filePath: path }),
      });
      if (!response.ok) {
        console.log("Error response is not ok: ", response.status);
        return;
      } else {
        const data = await response.json();
        await getFileApi(path);
      }
    } catch (error) {
      console.log("Error in getInsideFileApi : ", error)
    }
  };

  const getFileApi = async (path) => {
    try {
      // console.log("get api called")
      const response = await fetch("http://localhost:3000");
      if (!response.ok)
      {
        console.log("Error response is not ok: ", response.status);
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
          console.log("response not include array or you use the wrong name")
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
        console.log("Error response is not ok: ", response.status);
      }
      else 
      {
        const data = await response.json();
        console.log("data received")
        console.log("getFileApi calling")
        await getFileApi(path);
      }
    }
    catch (error) 
    {
      console.log("Error in catch block in creatFileOrFolderAPi : ", error)
    }
  }

  
  const getRecentFileDataApi = async(pathArr) => {
    try {
      const response = await fetch("http://localhost:3000/recent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pathArr,
        })
      })
      if(!response.ok) {
        console.log("Error response is not ok: ", response.status);
      } else {
        const data = await response.json();
        console.log(data)
        return data.pathIconArray;
      }
    } catch (error) 
    {
      console.log("Error in catch block in getRecentFileApi : ", error)
    }
  }

  const searchApi = async(currentPath, searchVal) => {
    try {
      if(searchVal !== ""){
        setFilesData("")
        const response = await fetch(`http://localhost:3000/search?name=${searchVal}&path=${currentPath}`)
        const data = await response.json()
        setFilesData(data.body)
        console.log(data)
      }
    } catch(err) {
      console.log(err)
    }
  }
  

  return {
    loadFiles,
    getInsideFileApi,
    getFileApi,
    createFileOrFolderApi,
    getRecentFileDataApi,
    searchApi,
  }
}

export default useFileManager;
