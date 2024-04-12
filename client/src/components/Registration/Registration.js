import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from '../../context/DataProvider';

let initialCredentials = {
    name: '',
    username: '',
    email: '',
    password: ''
}

const Registration = () => {

    const [credentials, setCredentials] = useState(initialCredentials);

    const { user, setUser,API_URL } = useContext(DataContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            if (user.userId) {
                const updateCred = { ...credentials, userId: user.userId };
                const response = await axios.post(`${API_URL}/api/registration`, updateCred, config);

                if (response.status === 200) {
                    Object.entries(response.data).forEach(([key, value]) => {
                        // Ensure key is valid before updating setUser
                        if (key) {
                            setUser(prevUser => ({
                                ...prevUser,
                                [key]: value
                            }));
                        }
                        // else {
                        //     console.error(`Invalid key: ${key}`);
                        // }
                    });
                    sessionStorage.removeItem("userInfo");
                    sessionStorage.setItem("userInfo", JSON.stringify(user));
                    navigate('/dashboard')
                }
            }
            else {
                const response = await axios.post('http://localhost:5000/api/registration', credentials, config);

                if (response.status === 200) {

                    Object.entries(response.data).forEach(([key, value]) => {
                        // Ensure key is valid before updating setUser
                        if (key) {
                            setUser(prevUser => ({
                                ...prevUser,
                                [key]: value
                            }));
                        }
                        // else {
                        //     console.error(`Invalid key: ${key}`);
                        // }
                    });
                    sessionStorage.setItem("userInfo", JSON.stringify(user));
                    navigate('/profile')
                }
                else {
                    toast.error(`${response.data}`, {
                        position: 'top-center',
                        autoClose: 10000,
                        closeOnClick: true
                    })
                }
            }
        } catch (error) {
            toast.error(`${error.response.data}`, {
                position: 'top-center',
                autoClose: 5000,
                closeOnClick: true
            })
        }
    }

    const handleToggle = () => {
        navigate('/login')
    }

    
    return (
        <div id='container' className='w-screen h-screen min-h-screen flex'>
            <div id='image' className={`bg-[url('./components/Registration/RegistrationImage.png')] bg-cover bg-center xs:hidden sm:w-full md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 h-full flex flex-col items-center justify-start start-0`} >
                <div className='flex flex-col justify-center items-start w-72'>
                    <p className='font-serif text-2xl pt-10 pb-5 text-yellow-800'>dribble</p>
                    <p className='text-wrap text-2xl font-bold text-yellow-800 pb-5'>Discover the world's top Designers & Creatives</p>
                </div>

            </div>
            <div id='login_page' className='flex justify-center items-center xs:w-full sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5 2xl:w-3/5 h-full end-0 '>
                {/* signup component */}
                <div id='sign_up' className={`flex flex-col justify-start items-center w-full h-full gap-y-4`}>
                    <div className='flex justify-end items-center w-full px-5 py-3'>
                        <p >Already a customer? <button onClick={handleToggle} >Login</button></p>
                    </div>

                    <div className={`flex flex-col justify-center items-start w-96 px-5`}>
                        <h3 className='text-2xl font-semibold '>Sign up to Dribble</h3>
                        <form action='' method='post' class="sigupForm" onSubmit={(e) => handleSignup(e)}>
                            <div className='flex flex-row justify-between items-center gap-x-3 w-full mt-12'>

                                <div className='w-1/2'>
                                    <label htmlFor='name' className='block'>Name</label>
                                    <input className='bg-gray-300 w-full rounded-lg h-10 p-1' type='text' id='Name' name='name' value={credentials.name} placeholder='Enter Name' required size="20" onChange={(e) => handleChange(e)} />
                                </div>
                                <div className='w-1/2'>
                                    <label className='block' htmlFor='username'>Username</label>
                                    <input className='bg-gray-300 w-full rounded-lg h-10 p-1' value={credentials.username} type='text' id='username' name='username' placeholder='Enter Username' required size="20" onChange={(e) => handleChange(e)} />
                                </div>

                            </div>

                            <div className='w-full mt-3'>
                                <label htmlFor='email' className='block'>Email</label>
                                <input className='bg-gray-300 rounded-lg h-10 w-full p-1' type='email' id='email' name='email' value={credentials.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" placeholder='johndoe@example.com' required size="20" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='w-full mt-3'>
                                <label htmlFor="password" className='block'>Password</label>
                                <input className='bg-gray-300 w-full rounded-lg h-10 p-1' type='password' id='password' name='password' placeholder='6+characters' required size="20" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='flex flex-row w-full gap-x-1 mt-12'>
                                <div>
                                    <input type='checkbox' id='disclaimer' name='disclaimer' required />
                                </div>
                                <div>
                                    <label htmlFor="disclaimer" className='text-gray-600 text-sm'>Creating an account means you're okay with our Terms of Service, Privacy Policy, and our default Notification Settings</label>
                                </div>
                            </div>

                            <button className='bg-pink-600 w-1/2 text-white h-10 rounded-lg mt-8' type='submit'>Create Account</button>
                        </form>
                        <footer className='w-full mt-5'>
                            <p className='text-xs text-gray-600 w-full'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                        </footer>
                    </div>
                </div>

            </div>

            <ToastContainer />
        </div>
    )
}

export default Registration;