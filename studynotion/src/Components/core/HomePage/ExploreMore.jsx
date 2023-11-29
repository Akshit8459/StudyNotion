import React, { useState } from 'react'
import HighlightText from './HighlightText'
import {HomePageExplore} from "../../../Data/homepage-explore"
import CourseCard from './CourseCard'

const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]


const ExploreMore = () => {

    const [currentTab,setCurrentTab]=useState(tabsName[0])
    const [courses,setCourses]=useState(HomePageExplore[0].courses)
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setMyCards=(value)=>{
        setCurrentTab(value)
        setCurrentTab(value)
        const result = HomePageExplore.filter( (course) => course.tag===value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div>
        <div className='flex flex-col items-center'>

            <div className='font-semibold text-4xl '>
                Unlock the <HighlightText text={"Power Of Code"}/> 
            </div>

            <p className='text-richblack-300  text-sm text-[16px] mt-3'>Learn To Build Anything You Can Imagine</p>

            <div className='flex flex-row items-center gap-1 mt-5 bg-richblack-800 rounded-full mb-5 border-richblack-100 p-1'>
                {
                    tabsName.map((tab,index)=>{
                        return(
                            <button
                             className={'text-[16px] rounded-full transition-all duration-200 cursor-pointer px-3 py-1 hover:bg-richblack-900 hover:text-richblack-5 hover:scale-90 '+ (currentTab===tab?("bg-richblack-900 text-richblack-5 font-medium "):("bg-richblack-800 text-richblack-200 "))}
                             key={index} 
                             onClick={()=>{setMyCards(tab)}}>
                            {tab}
                        </button>)
                    })
                }
            </div>

            <div className='h-[70px]'></div>

            <div className='flex gap-10 min-h-fit h-52 justify-around items-center'>
                {courses.map((course,index)=>(
                    <CourseCard
                    key={index}
                    heading={course.heading}
                    description={course.description}
                    level={course.level}
                    lessionNumber={course.lessionNumber}
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard}
                    />
                ))}
            </div>

        </div>
    </div>
  )
}

export default ExploreMore