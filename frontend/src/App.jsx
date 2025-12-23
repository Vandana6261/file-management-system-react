import { useState } from 'react'
import './App.css'
import AsideBox from './components/AsideBox';
import Header from './components/Header';
import AllFile from './components/AllFile';
import CreateFileModal from './components/CreateFileModal';
import { useEffect } from 'react';


function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex bg-[#D2E1DA]  dark:bg-[#212121]">
          <div className="w-1/5 ">
            <AsideBox />
          </div>
          <div className="w-4/5 ">
              <Header open={open} setOpen={setOpen}/>
              <AllFile />
          </div>
      </div>
      <CreateFileModal open={open} setOpen={setOpen}/>
    </>
  )
}

export default App
