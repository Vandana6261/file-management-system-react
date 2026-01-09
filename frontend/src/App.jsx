import { useState } from 'react'
import './App.css'
import AsideBox from './components/AsideBox';
import Header from './components/Header';
import AllFile from './components/AllFile';
import CreateFileModal from './components/CreateFileModal';
import { useEffect } from 'react';
import RecentFile from './components/RecentFile';
import useFileContext from './context/FileContext';


function App() {
  const [open, setOpen] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const {searchData, setSearchData} = useFileContext()
  console.log(showRecent)
  return (
    <>
      <div className="flex bg-main-light dark:bg-[#212121]">
          <div className="w-1/5 ">
            <AsideBox showRecent={showRecent} setShowRecent={setShowRecent}/>
          </div>
          <div className="w-4/5">
              <Header open={open} setOpen={setOpen} searchData={searchData} setSearchData={setSearchData}/>
              {showRecent ? <RecentFile /> : <AllFile />}
          </div>
      </div>
      <CreateFileModal open={open} setOpen={setOpen}/>
    </>
  )
}

export default App
