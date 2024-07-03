import { useState } from 'react';
import { loginPhoto } from '../constant';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/apis/userApi';
import { setUser } from '../redux/slices/user';
import toast from 'react-hot-toast';
import Popup from '../components/Popup';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const response = await login(formData);
    if (error) {
      setErrorMessage(error.data.message);
      return;
    }
    else {
      const data = response.data;
      dispatch(setUser(data.user));
      navigate("/");
      toast.success(data.message);
    }
  }

  return (
    <section className='h-[90vh] flex justify-center items-center text-[.9rem] md:text-base'>
      <div className='w-[80%] mx-auto flex items-center justify-center gap-32'>
        <div className='w-[20rem]'>
      <div className='mb-8'>
      <Popup />
      </div>
          <h1 className="text-4xl font-semibold mb-1">WELCOME BACK</h1>
          <p className='text-slate-600 font-medium'>Welcome back! Plesae enter your details.</p>
          <form
            onSubmit={submitHandler}
            className='flex flex-col gap-4 items-start mt-4'>
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
            <div className='flex justify-between items-center w-full text-[.97rem]'>
              <div className='flex justify-between items-center gap-1'>
                <input type="checkbox" name="rememberMe" className='cursor-pointer'/>
                <p>Remember me</p>
              </div>
              <p className='cursor-pointer'>Forgot password</p>
            </div>
            <button className='text-white w-full rounded-lg text-center bg-orange-600 py-2 -mt-1 px-4' disabled={isLoading}>
              {
                isLoading ? 'Loading...' : `Login`
              }
              {/* Sign Up */}
            </button>
            {
              error && (
                <p className='text-red-600 text-sm -mt-2'>{errorMessage || `Something went wrong`}</p>
              )
            }
            <p className='text-[.9rem]'>Dont have an account? <button type='button' className='text-orange-500 cursor-pointer' onClick={()=>navigate("/register")}>Sign up for free!</button></p>
          </form>
        </div>

        <div className='max-w-[50%] hidden md:block'>
          <img src={loginPhoto} alt="Login Image" className='h-[32rem]' />
        </div>
      </div>
    </section>
  )
}

export default Login;