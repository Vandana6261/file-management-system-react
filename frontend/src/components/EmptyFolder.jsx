import React from 'react'

function EmptyFolder() {
  return (
    <>
      <main className='flex justify-center items-center h-[100vh] '>
        <div className='border-2 border-amber-400 h-40 w-40 absolute -translate-y-8'>1</div>
        <div className='border-2 border-pink-500 h-40 w-40 absolute'>2</div>
        <div className='border-2 border-blue-400 h-40 w-40 absolute'>3</div>
      </main>
    </>
  )
}

export default EmptyFolder
