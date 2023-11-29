import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import HighlightText from '../Components/core/HomePage/HighlightText'
import CTAButton from '../Components/core/HomePage/CTAButton'
import banner from '../Assests/Images/banner.mp4'
import CodeBlocks from '../Components/core/HomePage/CodeBlocks'
import Timeline from '../Components/core/HomePage/Timeline'
import LearningLanguages from '../Components/core/HomePage/LearningLanguages'
import InstructorSection from '../Components/core/HomePage/InstructorSection'
import Footer from '../Components/Common/Footer'
import ExploreMore from '../Components/core/HomePage/ExploreMore'

const Home = () => {
  return (
    <div >
        {/* {section 1} */}
        <div className='bg-richblack-900'>

        <div className=' relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center  text-white justify-between'>

            <Link to="/signup">
            <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 hover:shadow-none w-fit shadow-md shadow-richblack-700'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an instructor</p>
                    <FaArrowRight/>
                </div>
            </div>
            </Link>

            {/* <p className='font-bold text-3xl my-4'>Empower Your Future with <span className='text-caribbeangreen-50'>Coding Skills</span></p> */}
            <div className='text-4xl text-center font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='w-[80%] text-center font-semibold text-md text-richblack-500 mt-4 '>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton children={"Learn More"} linkto={"/signup"} active={true} />
                <CTAButton children={"Book A Demo"} linkto={"/login"} active={false} />
            </div>

            <div className='mx-3 my-12'>
                <video muted loop autoPlay ><source src={banner} type='video/mp4'/></video>
            </div>

            <div>
                <CodeBlocks position={"lg:flex-row"} heading={<div className='text-4xl font-bold'>Unlock Your <HighlightText text="Coding Potential"/> with our Coding Courses</div>} subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} ctab1={{linkto:"/signup",active:true,text:"Try It Yourself"}} ctab2={{linkto:"/login",active:false,text:"Learn More"}} codeblock={'<!DOCTYPE html> \n<html> \n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>'} codecolor={"text-yellow-25 "}
            />
            </div>

            <div>
                <CodeBlocks position={"lg:flex-row-reverse"} heading={<div className='text-4xl font-bold w-[15rem]'>Start <HighlightText text="Coding In Seconds"/></div>} subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.."} ctab1={{linkto:"/signup",active:true,text:"Continue Lesson"}} ctab2={{linkto:"/login",active:false,text:"Learn More"}} codeblock={'<!DOCTYPE html> \n<html> \n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>'} codecolor={"text-caribbeangreen-50"}
            />
            </div>

            <ExploreMore/>



        </div>


        </div>
        {/* {section 2} */}
        <div classname="bg-pure-greys-5 text-richblack-700 w-screen min-h-max ">

            <div className='homepage_bg h-[310px]  ' >
                <div className='w-11/12 max-w-maxContent justify-center flex flex-col items-center gap-5 mx-auto '>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 '>
                        <CTAButton linkto={"/signup"} active={true}>
                            <div className='flex flex-row items-center gap-3 '>
                                Explore Full Catalogue <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton linkto={"/login"} active={false} children={"Learn More"}></CTAButton>
                    </div>
                </div>
            </div>
            
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7 mt-[95px] mb-10 '>
                <div className='flex flex-row gap-5'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get The Skills You Need For A <HighlightText text={"Job That Is In Demand"}/>
                    </div>
                    <div className='flex flex-col w-[40%] gap-5'>
                        <p className='text-[16px]'>The modern StudyNotion is the dictates in its own Terms.Today,to be a competetive specialist requires more than professional skills</p>
                        <CTAButton active={true} linkto={"/signup"} children={"Learn More"}/>

                    </div>
                </div>
                
                <Timeline/>

                <LearningLanguages/>

            </div>

        </div>


        {/* {section 3} */}
        <div className='bg-richblack-900 text-white min-h-max'>
            <div className='w-11/12 mx-auto flex flex-col justify-between gap-8 max-w-maxContent items-center'>

                <InstructorSection/>

                <h2 className='text-4xl font-semibold text-center mt-10'>Reviews From Other Learners</h2>



            </div>
        </div>



        {/* {Footer} */}

        <Footer/>
        
    </div>
  )
}

export default Home