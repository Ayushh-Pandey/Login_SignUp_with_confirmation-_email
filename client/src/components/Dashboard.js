import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from '../context/DataProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {

    const { user, setUser,API_URL } = useContext(DataContext);
    const navigate = useNavigate()

    const handleResendEmail = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        try {
            const response = await axios.post(`${API_URL}/api/profile/mail`, { userEmail: user.email }, config)
            if (response.status === 200) {
                toast.success(`${response.data}`, {
                    position: 'top-center',
                    autoClose: 5000,
                    closeOnClick: true
                })
            }
            else {
                toast.error(`${response.data}`, {
                    position: 'top-center',
                    autoClose: 5000,
                    closeOnClick: true
                })
            }
        } catch (error) {
            toast.error(`${error.response.data}`, {
                position: 'top-center',
                autoClose: 5000,
                closeOnClick: true
            })
        }
    }

    const handleChangeEmail = (e) => {
        e.preventDefault();
        navigate('/');
    }
    return (
        <div id='home_page' className='w-screen h-screen min-h-screen scrollbar-hidden overflow-y-scroll'>

            {/* Navbar */}
            <div id='appbar' className='top-0 fixed z-10 flex justify-between w-full h-20 bg-white box-border border-b-2 border-gray-300 border-solid outline-0'>
                <div className='flex justify-between items-center'>
                    <p className='ml-2 2xl:ml-5 italic font-serif text-base xs:text-xs'>dribble</p>
                    <button className='ml-2 2xl:ml-5 text-base xs:text-xs' >Inpiration</button>
                    <button className='ml-2 2xl:ml-5 text-base xs:text-xs'>Find Work</button>
                    <button className='ml-2 2xl:ml-5 text-base xs:text-xs'>Learn Design</button>
                    <button className='ml-2 2xl:ml-5 text-base xs:text-xs'>Go Pro</button>
                    <button className='ml-2 2xl:ml-5 text-base xs:text-xs text-wrap'>Hire Designer</button>
                </div>
                <div className='flex justify-between items-center' >
                    <input className='pl-1 rounded-lg text-base xs:text-xs w-40 xs:w-14 mr-2 2xl:mr-5 box-border border-2 border-gray-300' type='search' id="search" name='search' placeholder='search...' />

                    {user.pic ?
                        <img className="w-12 h-12 xs:hidden rounded-full object-cover mr-2 2xl:mr-5" src={user.pic} />
                        : <FontAwesomeIcon icon={faUser} className="w-8 h-8 xs:hidden mr-2 2xl:mr-5" />}


                    <button className='w-14  bg-pink-600 rounded-lg mr-2 2xl:mr-5 text-white text-base xs:text-xs'>Upload</button>
                </div>

            </div>

            {/* main content */}
            <div id='content' className='flex flex-col justify-center items-center h-full py-20'>
                <h1 className='text-3xl font-bold text-center px-4'>Please verfiy your email...</h1>
                <FontAwesomeIcon icon={faEnvelope} className='h-40 w-40 xs:w-30 xs:h-30' />
                <p className='text-sm mt-5 text-gray-800 text-center px-4'>Please verfiy your email address. We've sent a confirmation email to:</p>
                <p className='text-lg font-semibold mt-5 text-gray-800 px-4'>{user.email}</p>
                <p className='text-sm mt-5 text-gray-800 text-center px-4'>Click the confirmation link in that email to begin using Dribble</p>
                <p className='text-sm mt-5 text-gray-800 text-center px-4'>Didn't receive the email? Check your Spam folder, it may have been caught by a filter. if</p>
                <p className='text-sm mt-0.5 text-gray-800 text-center px-4'>you still don't see it, you can <a href='' className='text-sm text-pink-600' onClick={(e) => handleResendEmail(e)}>resend the confirmation email.</a></p>

                <p className='text-sm mt-5 text-gray-800 text-center px-4'>Wrong email address? <a href='' className='text-pink-600 text-sm' onClick={(e) => handleChangeEmail(e)}>Change it.</a></p>
            </div>

            {/* footer content */}
            <div id="footer" className='grid grid-cols-6 sm:grid-cols-4 xs:grid-cols-2 gap-5  w-full  bg-slate-200 px-10 py-10'>
                <div className='flex flex-col items-start w-full'>
                    <p className='text-lg font-semibold font-serif'>dribble</p>
                    <p className='mt-5 text-sm'>
                        dribble is the world's leading community for creatives to share, grow,
                        and get hired
                    </p>

                </div>

                <div className='flex flex-col items-start w-full'>
                    <h4 className='text-lg font-semibold'>For designers</h4>
                    <a className='mt-5 text-sm' href=''>Go Pro!</a>
                    <a className='mt-5 text-sm' href=''>Explore design work</a>
                    <a className='mt-5 text-sm' href=''>Design blog</a>
                    <a className='mt-5 text-sm' href=''>Overtime podcast</a>
                    <a className='mt-5 text-sm' href=''>Playoffs</a>
                    <a className='mt-5 text-sm' href=''>Weekly Warm-Up</a>
                    <a className='mt-5 text-sm' href=''>Refer a Friend</a>
                    <a className='mt-5 text-sm' href=''>Code of conduct</a>
                </div>
                <div className='flex flex-col items-start w-full'>
                    <h4 className='text-lg font-semibold'>Hire designers</h4>
                    <a className='mt-5 text-sm' href=''>Post a job opening</a>
                    <a className='mt-5 text-sm' href=''>Post a freelance project</a>
                    <a className='mt-5 text-sm' href=''>Search for designers</a>
                    <h4 className='mt-5 text-lg font-semibold'>Brands</h4>
                    <a className='mt-5 text-sm' href=''>Advertise with us</a>
                </div>
                <div className='flex flex-col items-start w-full'>
                    <h4 className='text-lg font-semibold'>Company</h4>
                    <a className='mt-5 text-sm' href=''>About</a>
                    <a className='mt-5 text-sm' href=''>Careers</a>
                    <a className='mt-5 text-sm' href=''>Support</a>
                    <a className='mt-5 text-sm' href=''>Media kit</a>
                    <a className='mt-5 text-sm' href=''>Testimonials</a>
                    <a className='mt-5 text-sm' href=''>API</a>
                    <a className='mt-5 text-sm' href=''>Termsj of service</a>
                    <a className='mt-5 text-sm' href=''>Privacy policy</a>
                    <a className='mt-5 text-sm' href=''>Cookie policy</a>
                </div>
                <div className='flex flex-col items-start w-full'>
                    <h4 className='text-lg font-semibold'>Directories</h4>
                    <a className='mt-5 text-sm' href=''>Design jobs</a>
                    <a className='mt-5 text-sm' href=''>Designers for hire</a>
                    <a className='mt-5 text-sm' href=''>Freelance designers for hire</a>
                    <a className='mt-5 text-sm' href=''>Tags</a>
                    <a className='mt-5 text-sm' href=''>Places</a>
                    <h4 className='mt-5 text-lg font-semibold'>Design assets</h4>
                    <a className='mt-5 text-sm' href=''>Dribble Marketplace</a>
                    <a className='mt-5 text-sm' href=''>Creative Market</a>
                    <a className='mt-5 text-sm' href=''>Fontspring</a>
                    <a className='mt-5 text-sm' href=''>Font Squirre!</a>
                </div>
                <div className='flex flex-col items-start w-full'>
                    <h4 className='text-lg font-semibold'>Design Resources</h4>
                    <a className='mt-5 text-sm' href=''>Freelancing</a>
                    <a className='mt-5 text-sm' href=''>Design Hiring</a>
                    <a className='mt-5 text-sm' href=''>Design Portfolio</a>
                    <a className='mt-5 text-sm' href=''>Design Education</a>
                    <a className='mt-5 text-sm' href=''>Creative Process</a>
                    <a className='mt-5 text-sm' href=''>Creative Process</a>
                    <a className='mt-5 text-sm' href=''>Design Industry</a>
                    
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}

export default Dashboard