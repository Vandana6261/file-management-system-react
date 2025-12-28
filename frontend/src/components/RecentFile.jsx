import React, { useEffect, useState } from 'react'
import useFileContext, { FileContext } from '../context/FileContext'
import useFileManager from '../hooks/useFileManager';

function RecentFile({ showRecent, setShowRecent }) {
  const { getRecentFileDataApi } = useFileManager()
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
      <div className=' bg-amber-700 max-h-[50vh] w-[70vw] rounded-xl p-4 cursor-pointer overflow-auto'>
        {/* {console.log(data)} */}
        {
          data && data.length > 0 && data.map((each, index) => (
            <div key={index} className=' bg-red-500 p-1 '>
              <div className='flex justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.5) border-2 rounded'>
               <div className='w-fit'>
                 <p className='text-4xl'>{each.icon}</p>
               </div>
                <div className='text-xl p-1 bg-blue-500 w-full '>
                  <p>{each.name}</p>
                <p>{each.path}</p>
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
