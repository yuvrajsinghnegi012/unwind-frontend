import { useState, useEffect } from 'react';
import { loginPhoto } from '../constant';
import { useSignUpMutation } from '../redux/apis/userApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  })

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Making The FormData To Send Images 
    const newFormData = new FormData();
    for (const key in formData) {
      newFormData.append(key, formData[key]);
    }

    const response = await signUp(newFormData);
    console.log(response);

    // If error occured
    if (error) {
      console.log(error);
      setErrorMessage(error.data.message);
      // return;
    }
    else {
      const data = response.data;
      navigate("/login")
    }
  }

  // Updating the profilePicture
  const pictureHandler = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  }

  useEffect(() => {
    formData.profilePicture = profilePicture;
  }, [profilePicture]);


  return (
    <section className='md:h-[90h] flex justify-center items-center text-[.9rem] md:text-base'>
      <div className='w-[80%] mx-auto flex items-center justify-center gap-32'>
        <div className='w-[20rem]'>
          <h1 className="text-4xl font-semibold mb-1">Register</h1>
          <p className='text-slate-600 font-medium'>Create an account to get started.</p>
          <form
            onSubmit={submitHandler}
            className='flex flex-col gap-4 items-start mt-4'>
            <div className='w-full'>
              <p className='font-semibold'>Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                placeholder='Enter your email'
                className='px-4 py-[.3rem] w-full outline-none rounded-lg border-[1px] border-slate-400' />
            </div>
            <div className='w-full'>
              <p className='font-semibold'>Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter your email'
                className='px-4 py-[.3rem] w-full outline-none rounded-lg border-[1px] border-slate-400' />
            </div>
            <div className='w-full'>
              <p className='font-semibold'>Password</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder='Enter your password'
                className='px-4 py-[.3rem] w-full outline-none rounded-lg border-[1px] border-slate-400
                ' />
            </div>
            <div className='w-full'>
              <p className='font-semibold'>Confirm Password</p>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
                placeholder='Confirm password'
                className='px-4 py-[.3rem] w-full outline-none rounded-lg border-[1px] border-slate-400
                ' />
            </div>
            <div className='w-full'>
              <p className='font-semibold'>Profile Picture</p>
              <input
                type="file"
                name="profilePicture"
                onChange={pictureHandler}
                placeholder='Upload file'
                accept='image/*'
                className='px-4 py-[.4rem] mt-[.2rem] text-sm w-full outline-none rounded-lg border-[1px] border-slate-400
                ' />
            </div>
            <button className='text-white w-full rounded-lg text-center bg-orange-600 py-2 -mt-1 px-4' disabled={isLoading}>
              {
                isLoading ? 'Loading...' : `Sign Up`
              }
              {/* Sign Up */}
            </button>
            {
              error && (
                <p className='text-red-600 text-sm -mt-2'>{errorMessage || `Something went wrong`}</p>
              )
            }
            <p className='text-[.9rem]'>Already have an account? OR login with demo account <button type='button' className='text-orange-500 cursor-pointer' onClick={()=>navigate("/login")}>Sign in here!</button></p>
          </form>
        </div>

        <div className='max-w-[50%] hidden md:block'>
          <img src={loginPhoto} alt="Login Image" className='h-[32rem]' />
        </div>
      </div>
    </section>
  )
}

export default Register;