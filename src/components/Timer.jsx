import React, { useState } from 'react'
import clockIcon from '../assets/icons/time.png'

function Timer() {

  const [seconds, setSeconds] = useState(0)

  return (
    <div className='flex gap-3 justify-center items-center'>
        <img src={clockIcon} alt="" className='w-[40px] h-[40px]'/>
        <h1 className='text-2xl font-bold text-gray-600'>00:00</h1>
    </div>
  )
}

export default Timer