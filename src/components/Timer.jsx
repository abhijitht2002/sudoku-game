import React from 'react'
import clockIcon from '../assets/icons/time.png'

function Timer() {
  return (
    <div className='flex gap-3 justify-center items-center'>
        <img src={clockIcon} alt="" className='w-[40px] h-[40px]'/>
        <h1 className='text-2xl font-bold text-gray-600'>00:00:00</h1>
    </div>
  )
}

export default Timer