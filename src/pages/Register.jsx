import { useState } from 'react';
import { loginPhoto } from '../constant';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Data is: ", formData);
  }

  return (
    <section className='h-[90vh] flex justify-center items-center'>
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
                value={formData.confimrPassword}
                onChange={changeHandler}
                placeholder='Confirm password'
                className='px-4 py-[.3rem] w-full outline-none rounded-lg border-[1px] border-slate-400
                ' />
            </div>
            <button className='text-white w-full rounded-lg text-center bg-orange-600 py-2 -mt-1 px-4'>Sign Up</button>
            <p className='text-[.9rem]'>Already have an account? <button type='button' className='text-orange-500 cursor-pointer'>Sign in here!</button></p>
          </form>
        </div>
        
        <div className='max-w-[50%]'>
          <img src={loginPhoto} alt="Login Image" className='h-[32rem]' />
        </div>
      </div>
    </section>
  )
}

export default Register;