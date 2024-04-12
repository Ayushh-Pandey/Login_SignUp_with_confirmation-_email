import React, { useContext, useState } from 'react'
import sharingWork from "./image_processing20191024-17056-1b511wi.png";
import inspiration from "./81ebf0ef3aec49dde5657bd4b1f5a459.png";
import hiring from "./5a6246e56604072b551ac01ad2ae675f.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from '../../../context/DataProvider';

const Interests = () => {

    const [purpose, setPurpose] = useState({
        want_to_share: '',
        want_to_hire: '',
        for_inspiration: ''
    })

    const [toggle, setToggle] = useState({
        0: false,
        1: false,
        2: false
    })

    const {user,setUser,API_URL} = useContext(DataContext);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        let arr = Object.values(purpose).filter((ele) => ele !== "");

        if (arr.length > 0) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                const response = await axios.post(`${API_URL}/api/profile`, {
                    userId: user.userId, pic: user.pic, location: user.location, interests: arr
                }, config);
                
                if (response.status === 200) {
                    
                    Object.entries(response.data).forEach(([key, value]) => {
                        // Ensure key is valid before updating setUser
                        if (key) {
                            setUser(prevUser => ({
                                ...prevUser,
                                [key]: value
                            }));
                        }
                    });
                    sessionStorage.removeItem("userInfo");
                    sessionStorage.setItem("userInfo",JSON.stringify(user))
                    navigate('/dashboard')
                }
                else{
                    toast.error(`${response.data}`, {
                        position: 'top-center',
                        autoClose: 10000,
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
    }

    const handleClick = (index) => {

        if (index === 0)
            toggle[0] ? setToggle({ ...toggle, [0]: false }) : setToggle({ ...toggle, [0]: true });

        if (index === 1)
            toggle[1] ? setToggle({ ...toggle, [1]: false }) : setToggle({ ...toggle, [1]: true });

        if (index === 2)
            toggle[2] ? setToggle({ ...toggle, [2]: false }) : setToggle({ ...toggle, [2]: true });
    }

    const handleChange = (e) => {
        setPurpose((prev) => { return { ...prev, [e.target.name]: prev[e.target.name] ? "" : e.target.ariaLabel } });
    }

    const handleBackButton = (e)=>{
        e.preventDefault();
        navigate('/profile');
    }

//     return (
//         <div className='flex justify-center items-center w-screen min-h-screen' >
//             <div className='flex justify-between items-center top-5 left-5 absolute w-32 h-10 xs:hidden sm:hidden' >
//                     <p className='flex justify-center items-center text-pink-600 italic font-serif'>dribble </p>
//                     <button className='ml-24 flex justify-center items-center  bg-gray-300 w-8 h-8 rounded-lg absolute' type='submit'>{'<'}</button>
//                 </div>
                
                
                
//             <div className='flex flex-col justify-center items-center h-3/4 w-1/2 bg-pink-600'>
//                 <div className='flex flex-col justify-center items-center bg-white h-20 w-3/4 '>
//                     <h1 className='text-3xl font-bold text-wrap'>What brings you to Dribble?</h1>
//                     <p className='text-sm font-normal mt-5 text-wrap'>Select the options that best describe you. Don't worry, you can explore other options later.</p>
//                 </div>
//                 <div className='flex justify-center items-center w-full h-auto gap-x-6 mt-12 bg-green-300'>
//                     <div id='options_container1' className={`border-2 ${toggle[0] ? 'border-pink-600' : 'border-gray-300'}  rounded-lg h-56 w-56  flex flex-col justify-center items-center`}>
//                         <div id='image_container' className='h-40 w-full rounded-lg mt-1'>
//                             <img className='object-cover h-full w-full rounded-lg ' src={sharingWork} />
//                         </div>
//                         <div className='h-16 flex flex-col justify-center items-center pb-3 gap-y-1'>
//                             <label htmlFor="option1" className='block text-md font-bold text-center'>I'm a designer looking to share my work</label>
//                             <input type='checkbox' id='option1' name='want_to_share' onClick={() => handleClick(0)} aria-label="I'm a designer looking to share my work" onChange={(e) => handleChange(e)} />
//                         </div>

//                     </div>
//                     <div id='options_container2' className={`border-2 ${toggle[1] ? 'border-pink-600' : 'border-gray-300'} rounded-lg h-56 w-56  flex flex-col justify-center items-center`}>
//                         <div id='image_container' className='h-40 w-full rounded-lg  mt-1'>
//                             <img className='object-cover h-full w-full rounded-lg' src={hiring} />
//                         </div>
//                         <div className='h-16 flex flex-col justify-center items-center pb-3 gap-y-1'>
//                             <label className='block text-md font-bold text-center h-full'>I'm looking to hire a designer</label>
//                             <input type='checkbox' id='option2' name='want_to_hire' aria-label="I'm looking to hire a designer" onClick={() => handleClick(1)} onChange={(e) => handleChange(e)} />
//                         </div>

//                     </div>
//                     <div id='options_container3' className={`border-2 ${toggle[2] ? 'border-pink-600' : 'border-gray-300'} rounded-lg h-56 w-56 flex flex-col justify-center items-center`}>
//                         <div id='image_container' className='h-40 w-full rounded-lg mt-1'>
//                             <img className='object-cover h-full w-full rounded-lg' src={inspiration} />
//                         </div>
//                         <div className='h-16 flex flex-col justify-center items-center pb-3 gap-y-1'>
//                             <label className='block text-md font-bold text-center'>I'm looking for design inspiration</label>
//                             <input type='checkbox' id='option3' name='for_inspiration' aria-label="I'm looking to hire a designer" onClick={() => handleClick(2)} onChange={(e) => handleChange(e)} />
//                         </div>

//                     </div>
//                 </div>
//                 <p id='multiple_selection' className={`${toggle[0] || toggle[1] || toggle[2] ? 'block' : 'hidden'} font-semibold text-lg mt-12`}>Anything else? You can select multiple</p>
//                 {/* <p className={`${!toggle[0] && !toggle[1] && !toggle[2] ? 'block' : 'hidden'} font-semibold text-lg mt-12`}>Please select At least one!</p> */}
//                 <div className='flex flex-col gap-y-1 mt-12 w-40'>
//                     <button id='finish_button' className={`${toggle[0] || toggle[1] || toggle[2] ? 'bg-pink-600' : 'bg-pink-300'} w-40 h-10 rounded-lg text-white`} onClick={handleSubmit}>Finish</button>
//                     <span id='press_back_button' className={`${toggle[0] || toggle[1] || toggle[2] ? 'block' : 'hidden'} text-xs font-medium text-slate-500 flex justify-center w-40`}>or Press Return</span>
//                 </div>

//             </div>
//         </div>
//     )
// }
return (
    <div className='flex flex-col justify-start items-center h-screen w-screen gap-y-4'>
        <div className='w-full px-5 py-3 flex justify-start'>
            <div className='flex justify-between items-center w-32 '>
                <p className='text-pink-600 italic font-serif'>dribble</p>
                <button className='bg-gray-300 w-8 h-8 rounded-lg' type='submit' onClick={(e)=>handleBackButton(e)}>{'<'}</button>
            </div>
        </div>

        <div className='flex flex-col justify-center items-center w-full px-5 '>
            <div className='w-full px-5 py-10 rounded-lg mb-5'>
                <h1 className='text-3xl font-bold text-center mb-3'>What brings you to Dribble?</h1>
                <p className='text-sm font-normal text-center'>Select the options that best describe you. Don't worry, you can explore other options later.</p>
            </div>
            <div className='grid grid-cols-3 gap-5 sm:grid-cols-2 xs:grid-cols-1'>
                <div className={`border-2 rounded-lg w-full flex flex-col justify-center items-center ${toggle[0] ? 'border-pink-600' : 'border-gray-300'}`}>
                    <div className='w-full h-40'>
                        <img className='object-cover w-full h-full rounded-lg' src={sharingWork} />
                    </div>
                    <div className='flex flex-col justify-center items-center pb-3'>
                        <label htmlFor="option1" className='text-md font-bold text-center'>I'm a designer looking to share my work</label>
                        <input type='checkbox' id='option1' name='want_to_share' onClick={() => handleClick(0)} aria-label="I'm a designer looking to share my work" onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div className={`border-2 rounded-lg w-full flex flex-col justify-center items-center ${toggle[1] ? 'border-pink-600' : 'border-gray-300'}`}>
                    <div className='w-full h-40'>
                        <img className='object-cover w-full h-full rounded-lg' src={hiring} />
                    </div>
                    <div className='flex flex-col justify-center items-center pb-3'>
                        <label className='text-md font-bold text-center'>I'm looking to hire a designer</label>
                        <input type='checkbox' id='option2' name='want_to_hire' aria-label="I'm looking to hire a designer" onClick={() => handleClick(1)} onChange={(e) => handleChange(e)} />
                    </div>
                </div>

                <div className={`border-2 rounded-lg w-full flex flex-col justify-center items-center ${toggle[2] ? 'border-pink-600' : 'border-gray-300'}`}>
                    <div className='w-full h-40'>
                        <img className='object-cover w-full h-full rounded-lg' src={inspiration} />
                    </div>
                    <div className='flex flex-col justify-center items-center pb-3'>
                        <label className='text-md font-bold text-center'>I'm looking for design inspiration</label>
                        <input type='checkbox' id='option3' name='for_inspiration' aria-label="I'm looking to hire a designer" onClick={() => handleClick(2)} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
            </div>
            <p id='multiple_selection' className={`${toggle[0] || toggle[1] || toggle[2] ? 'block' : 'hidden'} font-semibold text-lg mt-5`}>Anything else? You can select multiple</p>
            <div className='flex flex-col justify-center items-center w-40 mt-5'>
                <button id='finish_button' className={`${toggle[0] || toggle[1] || toggle[2] ? 'bg-pink-600' : 'bg-pink-300'} w-40 h-10 rounded-lg text-white`} onClick={handleSubmit}>Finish</button>
                <span id='press_back_button' className={`${toggle[0] || toggle[1] || toggle[2] ? 'block' : 'hidden'} text-xs font-medium text-slate-500 text-center mt-2`} onClick={(e)=>handleBackButton(e)}>or Press Return</span>
            </div>
        </div>
        <ToastContainer/>
    </div>
)
}

export default Interests