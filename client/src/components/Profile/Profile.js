import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from '../../context/DataProvider';

const initialDetails = {
    pic: '',
    location: '',
}

const Profile = () => {
    const [details, setDetails] = useState(initialDetails);
    const [toggle, setToggle] = useState({
        pic: false,
        location: false
    })

    const { user, setUser } = useContext(DataContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
        toggle[e.target.name] ? setToggle({ ...toggle, [e.target.name]: false }) : setToggle({ ...toggle, [e.target.name]: true });
    }


    const postImage = async (photo) => {
        try {
            const upload_preset = process.env.REACT_APP_CLIENT_IMAGE_UPLOAD_PRESET;
            const cloud_name = process.env.REACT_APP_CLIENT_IMAGE_UPLOAD_CLOUNDNAME;

            const data = new FormData();
            data.append("file", photo);
            data.append("upload_preset", `${upload_preset}`);
            data.append("cloud_name", `${cloud_name}`);
            const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data);

            setDetails({ ...details, ['pic']: uploadRes.data.url.toString() });
            toggle['pic'] ? setToggle({ ...toggle, ['pic']: false }) : setToggle({ ...toggle, ['pic']: true });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.pic !== "" && details.location !== "") {
            Object.entries(details).forEach(([key, value]) => {
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
            navigate('/interests')
        }
    }

    const handleBackButton = (e) => {
        e.preventDefault();
        navigate('/profile');
    }

    return (
        <div className='w-screen h-screen flex flex-col justify-start items-center gap-y-4'>

            <div className='w-full px-5 py-3 flex justify-start'>
                <div className='flex justify-between items-center'>
                    <p className='text-pink-600 italic font-serif'>dribble</p>
                </div>
            </div>


            <div className='flex flex-col justify-center items-start xs:w-10/12 xs-h-11/12 sm:w-10/12 sm:h-11/12'>

                <div className='flex flex-col justify-between items-start mb-10 pt-10'>

                    <h1 className='font-bold text-3xl text-wrap'>Welcome! Let's create your profile</h1>
                    <p className='text-sm mt-3'>Let others get to know you better ! You can do these later</p>

                </div>
                <form action='' method='post' onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex flex-col justify-between items-start mb-10'>

                        <label htmlFor="profile_image" className='text-xl font-semibold'>Add an avatar</label>

                        <div className='flex flex-row items-center gap-x-2 mt-3' id='profile_image'>

                            <img className='w-32 h-32 border-dashed border-black border-2 rounded-full object-cover ' src={details.pic} />
                            <label htmlFor='avatar' className='border-black border-2 bg-white rounded-lg p-0.5'>choose image</label>
                            <input type='file' id='avatar' name='pic' accept="image/png,image/jpeg" size='10' hidden onChange={(e) => postImage(e.target.files[0])} required />

                        </div>

                    </div>

                    <div className='mb-5'>

                        <label className='block text-xl font-semibold' htmlFor="location">Add your location</label>
                        <input className='mt-3 xs:w-56 w-96 h-10 box-border border-b-2 border-black border-solid outline-0' type='text' id='location' name='location' placeholder='Enter your location' required onChange={(e) => handleChange(e)} />

                    </div>

                    <div className='flex flex-col justify-center items-center w-40'>
                        <button id="next_button" className={`${(toggle['pic'] && toggle['location']) ? 'bg-pink-600' : 'bg-pink-300'} w-40 h-10 rounded-lg  text-white`}>Next</button>
                        <span id="press_back_button" className={`${toggle['pic'] && toggle['location'] ? 'block' : 'hidden'} text-xs font-medium text-slate-500 text-center mt-2`} onClick={(e) => handleBackButton(e)}>or Press RETURN</span>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile