import { useState } from 'react'
import './App.css'
import AsideBox from './components/AsideBox';
import Header from './components/Header';
import AllFile from './components/AllFile';

function App() {

  const [backword, setBackword] = useState([])
  const [forward, setForward] = useState([])

  return (
    <>
      <div className="flex bg-[#212121]">
          <div className="w-1/5">
            <AsideBox />
          </div>
          <div className="w-4/5">
            <Header backword={backword} setBackword={setBackword} forward={forward} setForward={setForward} />
            <AllFile backword={backword} setBackword={setBackword} forward={forward} setForward={setForward}/>
          </div>
      </div>
    </>
  )
}

export default App
