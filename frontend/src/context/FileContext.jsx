import { createContext, useState, useEffect, useContext } from "react"

export const FileContext = createContext()

export function FileProvider({children}) {
    const [currentPath, setCurrentPath] = useState("")
    const [filesData, setFilesData] = useState([])
    const [message, setMessage] = useState("")
    const [backword, setBackword] = useState([])
    const [forward, setForward] = useState([])
    const [homeDir, setHomeDir] = useState("")

    return (
        <FileContext.Provider
        value={{
            currentPath, setCurrentPath,
            filesData, setFilesData,
            message, setMessage,
            backword, setBackword,
            forward, setForward,
            homeDir, setHomeDir,
        }}
        >
            {children}
        </FileContext.Provider>
    )
}

export default function useFileContext(){
    return useContext(FileContext)
}