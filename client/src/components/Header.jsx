import React from 'react'

const Header = () => {
  return (
    <div>
      <div className='flex justify-between items-center bg-gray-800 p-4 text-white  '>
         <h1 className='text-center text-xl hover:text-blue-500 cursor-pointer'>User management App</h1>
        <button className='bg-blue-500 p-2 text-white font-semibold cursor-pointer hover:bg-blue-700'>Home</button>
     
      </div>
    </div>
  )
}

export default Header
