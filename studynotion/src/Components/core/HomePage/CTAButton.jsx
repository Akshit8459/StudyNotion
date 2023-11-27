import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children,active,linkto}) => {
  return (
    <Link to={linkto}> 
        <button className={'text-center text-[13px] px-6 py-3 rounded-md font-bold  hover:scale-95 transition-all duration-200'+ ( active ? (" bg-yellow-50 text-black shadow-inner shadow-yellow-5"):(" text-white bg-richblack-700 shadow-inner shadow-richblack-600"))}>
            {children}
        </button>
    </Link>
  )
}

export default CTAButton