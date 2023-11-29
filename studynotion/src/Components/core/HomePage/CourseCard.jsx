import React from 'react'
import { CgProfile } from "react-icons/cg";
import { TbBinaryTree2 } from "react-icons/tb";

const CourseCard = ({heading,description,level,lessionNumber,currentCard,setCurrentCard}) => {
  return (
    <div className={'flex flex-col translate-y-14 p-6 items-center justify-between'+((currentCard===heading)?(" bg-white text-black shadow-[10px_10px_0px_0px_rgba(109,40,217)] shadow-yellow-50"):(" bg-richblack-800 text-richblack-300 "))}
    onClick={()=>{setCurrentCard(heading)
    console.log(heading,currentCard)}}>
        <div>
            <h2 className='font-semibold text-2xl'>{heading}</h2>
            <p className='mt-3 text-richblack-300 text-md'>{description}</p>
        </div>


        <div className='flex flex-col mt-28 w-[100%]'>
            <div className='h-[2px] w-[full] border-t-2 border-dashed'></div>
            <div className='flex flex-row justify-between mt-2'>
                <p className='text-blue-400 font-semibold flex items-center gap-2'>
                    <CgProfile/>{level}
                </p>
                <p className='text-blue-400 font-semibold flex items-center gap-1'><TbBinaryTree2/>{lessionNumber}</p>
            </div>

        </div>
    </div>
  )
}

export default CourseCard