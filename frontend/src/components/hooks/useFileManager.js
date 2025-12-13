
import { useState } from 'react';
import { useEffect } from 'react';

function useFileManager(path) {
    const [currentPath, setCurrentPath] = useState("")
    const [filesData, setFilesData] = useState([])
    const [message, setMessage] = useState("")
    const [backword, setBackword] = useState([])
    const [forward, setForward] = useState([])
    

    async function loadFiles() {
        // console.log("load file initially")
        try {
            const response = await fetch("http://localhost:3000/home")
            if(!response) 
            {
                console.log("Internal Server Error") 
            }
            else 
            {
                const data = await response.json()
                // console.log(data)
                setFilesData(data.filteredFile)
                setCurrentPath(data.home)
                setBackword(prev => [data.home])
            }
        } catch (error) {
            console.log(error, "error")
        }
    }

    useEffect(() => {
        loadFiles()
    }, [])

    // useEffect(() => {
    //     getInsideFileApi()
    // }, [path])

    const getInsideFileApi = async(path) => {
        // console.log("getInsideFileApi")
        const response = await fetch("http://localhost:3000",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filePath: path })
        });
        if(!response.ok) 
        {
            setMessage("error")
            return;
        }
        else 
        {
            const data = await response.json()
            setMessage(data)
            await getFileApi(path)
        }
    }

    const getFileApi = async(path) => {
        // console.log("File data loaded")
        const response = await fetch("http://localhost:3000")
        if(!response.ok) 
        {
            setMessage("error")
        }
        else 
        {
            const data = await response.json()
            // console.log(typeof data)
            console.log(data.filteredFile)
            if(Array.isArray(data.filteredFile)) 
            {
                console.log("Hello")
                // console.log(currentPath)
                setCurrentPath(path)
                // console.log(currentPath)
                console.log(path)
                console.log("backword", backword)
                // if(!backword.find((eachItem) => eachItem == path)) {
                    setBackword(prev => [...prev, path])
                // }
            setFilesData(prev => data.filteredFile)
            setMessage(data.message)
            }
        }
    }

    return {
        currentPath,
        filesData,
        message,
        getInsideFileApi,
        backword, 
        setBackword,
        forward,
        setForward,
    }
}

export default useFileManager;