import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from './CTAButton'
import {TypeAnimation} from 'react-type-animation'

const CodeBlocks = ({position,heading,subheading,ctab1,ctab2,codeblock,bggradient,codecolor}) => {
  return (
    <div className={'flex my-20 justify-between gap-10 '+position}>

        <div className='w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>{subheading}</div>
            <div className='flex gap-7 mt-7'>
                <CTAButton linkto={ctab1.linkto} active={ctab1.active}>
                    <div className='flex gap-2 items-center'>
                        {ctab1.text}
                        <FaArrowRight></FaArrowRight>
                    </div>
                </CTAButton>
                <CTAButton linkto={ctab2.linkto} active={ctab2.active}>
                    {ctab2.text}
                </CTAButton>
            </div>
        </div>

        <div className=' flex flex-row h-fit text-[0.9rem] w-[100%] lg:w-[500px] py-4 border-t-[3px] border-l-[3px] border-r-[1px] border-b-[1px] border-richblack-700  '>

            <div className='flex flex-col text-center w-[10%]  font-inter font-bold'>
                <p>1.</p>
                <p>2.</p>
                <p>3.</p>
                <p>4.</p>
                <p>5.</p>
                <p>6.</p>
                <p>7.</p>
                <p>8.</p>
                <p>9.</p>
                <p>10.</p>
                <p>11.</p>
            </div>
            <div className={'w-[90%] flex flex-col gap-2 font-bold font-mono pr-2 relative text-caribbeangreen-50 '+codecolor}>
                <TypeAnimation
                sequence={[codeblock,4000," "]}
                repeat={Infinity}
                style={{whiteSpace:"pre-line",display:"block"}}
                omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks