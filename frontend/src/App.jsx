import { useState } from 'react'
import './App.css'
import AsideBox from './components/AsideBox';
import Header from './components/Header';
import AllFile from './components/AllFile';


function App() {

  return (
    <>
      <div className="flex bg-[#212121]">
          <div className="w-1/5 ">
            <AsideBox />
          </div>
          <div className="w-4/5  ">
              <Header />
              <AllFile />

          </div>
      </div>
    </>
  )
}

export default App
