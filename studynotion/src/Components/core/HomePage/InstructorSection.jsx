import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import instructorimage from "../../../Assests/Images/Instructor.png"

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center'>
            <div className='w-[50%] relative bg-white'>
                <img src={instructorimage}/>
            </div>

            <div className='flex flex-col w-[50%] gap-4'>
                <div className='font-semibold text-4xl w-[50%]'>
                    Become An <HighlightText text={"Instructor"}/>
                </div>
                <p className='text-richblack-300 font-medium text-[16px] w-[80%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Teaching Today
                        <FaArrowRight/>
                    </div> 
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection