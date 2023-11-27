import React from 'react'
import HighlightText from './HighlightText'
import knowyourprogress from '../../../Assests/Images/Know_your_progress.png'
import comparewithothers from '../../../Assests/Images/Compare_with_others.png'
import planyourlessons from '../../../Assests/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'

const LearningLanguages = () => {
  return (
    <div>
        <div className='flex flex-col gap-5 mt-[130px] items-center mb-32 '>

            <div className='text-4xl text-center font-semibold'>
                 Your Swiss Knife For <HighlightText text="Learning Any Language"/>
            </div>

            <div className='text-center mx-auto text-base text-richblack-600 mt-3 font-medium w-[70%] '>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5 '>
                <img src={knowyourprogress} className='object-contain -mr-32' alt='KnowYourProgress'/>
                <img src={comparewithothers} className='object-contain' alt='CompareWithOthers'/>
                <img src={planyourlessons} className='object-contain -ml-36' alt='PlanYourLessons'/>
            </div>

            <div >
                <CTAButton active={true} linkto={"/signup"} children={"Learn More"}/>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguages