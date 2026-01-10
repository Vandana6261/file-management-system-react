import React, { useEffect, useState } from 'react'
import useFileContext, { FileContext } from '../context/FileContext'
import useFileManager from '../hooks/useFileManager';

function RecentFile() {
  const { getRecentFileDataApi, getInsideFileApi } = useFileManager()
  const { recentFile, setRecentFile } = useFileContext()
  const [recentArr, setRecentArr] = useState([])
  const [data, setData] = useState([])
  let temp;


  useEffect(() => {
    let recentTempArr = JSON.parse(localStorage.getItem("recent")) || [];
    setRecentFile(recentTempArr);
    setRecentFile([...recentTempArr]);
    callApi(recentTempArr)
  }, [])

  const callApi = async (recentTempArr) => {
    if(recentTempArr.length > 0) {
      let response = await getRecentFileDataApi(recentTempArr)
      console.log(response)
      setData(response)
    }
  }

  return (
    <>
      <div className=' bg-main-light w-full rounded-xl p-4 cursor-pointer overflow-y-auto max-h-[80vh]'>
        {/* {console.log(data)} */}
        {
          data && data.length > 0 && data.map((each, index) => (
            <div key={index} className='p-2' 
              onClick={() => getInsideFileApi(each.path)}
            >
              <div className='flex justify-between items-center bg-card-light shadow-md rounded'>
                <div className='w-fit bg-'>
                  <p className='text-4xl'>{each.icon}</p>
                </div>
                <div className='text-md  p-1 bg-header-light w-full '>
                  <p>{each.name}</p>
                  <p className='break-all'>{each.path}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default RecentFile
