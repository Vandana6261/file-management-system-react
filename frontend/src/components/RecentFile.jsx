import React, { useEffect, useState } from 'react'
import useFileContext from '../context/FileContext'
import useFileManager from '../hooks/useFileManager';

function RecentFile({showRecent, setShowRecent}) {
    const { getRecentFileDataApi } = useFileManager()
    const [recentArr, setRecentArr] = useState([]);
    const [data, setData] = useState([])
    let temp ;
    useEffect(() => {
        temp = JSON.parse(localStorage.getItem("recent"));
        console.log(temp)
        // recentArr.forEach((eachFilePath) => {
            
        // });
        // getRecentFileDataApi(recentArr[0]);
        setRecentArr(temp);
    }, [])

    const callApi = () => {
        console.log(recentArr)
        console.log(recentArr[0])
        recentArr.forEach(each => {
          console.log(each)
          let response
          getRecentFileDataApi(each).then((response) => setData(prev => [...prev, response]))
          setData(response)
        })
    }
  return (
    <>
      <div className=' bg-amber-700 h-full w-full cursor-pointer' onClick={callApi}>
            hello
            {console.log(data)}
            {
              data && data.length > 0 && data.map((each, index) => (
                <div>
                  <p>{data.filePath}</p>
                  <p>{data.fileData.icon}</p>
                  <p>{data.fileData.name}</p>
                  <p>{data.fileData.type}</p>
                </div>
              ))
            }
      </div>
    </>
  )
}

export default RecentFile
