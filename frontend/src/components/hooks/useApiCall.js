
import { useState } from 'react';
import { useEffect } from 'react';
import { getApiCalling } from './../../api/fileApi';

function  useApiCall(url) {
    const [files, setFiles] = useState([])
    const [message, setMessage] = useState("")

    // useEffect(() => {
    //     getApiCalling()
    // }, [])

    const getApiCalling = async () => {
        const response = await fetch("")
        if(!response.ok) 
        {
            setMessate("Error")
            return;
        } 
        else 
        {
            const data = await response.json()
            setFiles(data)
        }
    }

    const getInsideFileApi = async(path) => {
        const response = await fetch("http://localhost:3000",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filePath: currentPath })
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
        }
    }

    const getFileApi = async() => {
        const response = await fetch("http://localhost:3000")
        if(!response.ok) 
        {
            setMessage("erro")
        }
        else 
        {
            const data = await response.json()
            setFiles(data)
        }
    }

    return { files, message }
}

export default useApiCall;