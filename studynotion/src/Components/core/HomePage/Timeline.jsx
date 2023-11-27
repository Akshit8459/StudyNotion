import React from 'react'
import Logo1 from"../../../Assests/TimeLineLogo/Logo1.svg"
import Logo2 from"../../../Assests/TimeLineLogo/Logo2.svg"
import Logo3 from"../../../Assests/TimeLineLogo/Logo3.svg"
import Logo4 from"../../../Assests/TimeLineLogo/Logo4.svg"
import timelineimage from "../../../Assests/Images/TimelineImage.png"

const timeline=[{
    logo:Logo1,
    heading:"LeaderShip",
    description:"Fully Committed to the success company"
},{
    logo:Logo2,
    heading:"LeaderShip",
    description:"Fully Committed to the success company"
},{
    logo:Logo3,
    heading:"LeaderShip",
    description:"Fully Committed to the success company"
},{
    logo:Logo4,
    heading:"LeaderShip",
    description:"Fully Committed to the success company"
}
]

const Timeline = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center '>

            <div className='w-[45%] flex flex-col gap-5'>
                {timeline.map((element,index)=>{
                    return(
                        <div>
                            <div className='flex flex-row gap-6 items-center' key={index}>
                                    <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                    <img src={element.logo}/>   
                                    </div>    

                                    <div className='flex flex-col gap-3'>
                                        <h2 className='font-semibold text-[18px] '>{element.heading}</h2>
                                        <p className='text-base'>{element.description}</p>
                                    </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='relative shadow-blue-100'>
                <img src={timelineimage} alt='Timeline Image' className='object-cover h-fit'></img>
                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-8
                left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                    <div className='border-r-2  flex gap-5 items-center border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 w-[50%] text-sm'>Years Of Experience</p>
                    </div>
                    <div className='px-7 flex items-center gap-5'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 w-[50%]'>Type Of Courses</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Timeline