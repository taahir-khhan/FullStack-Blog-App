import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import authService from "../appwrite/auth";
import { logIn as authLogin } from "../store/authSlice";

import { Button, Input, Logo } from "./index";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.logIn(data);
      if (session) {
        const userData = await authService.getCurrentUserState();
        if (userData) dispatch(authLogin(userData));
        toast.success("Logined Successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error("Error while login");
      setError(error.message);
    }
  };
  return (
    // <div className="w-[90%] md:max-w-fit bg-white rounded-lg py-6 mx-auto flex flex-col gap-y-4 text-center px-8">
    //   <div>
    //     <Logo />
    //     <h2 className="mt-2 font-medium text-xl">Sign in to your account</h2>
    //     <p className="mt-2 text-gray-500">
    //       Don&apos;t have any account?&nbsp;
    //       <Link to="/signup">
    //         <span className="font-bold transition-all duration-300 hover:underline">
    //           Sign Up
    //         </span>
    //       </Link>
    //     </p>
    //     {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    //   </div>

    //   <form
    //     onSubmit={handleSubmit(login)}
    //     className="flex flex-col items-center justify-center gap-y-2"
    //   >
    //     <Input
    //       label="Email: "
    //       placeholder="Enter your email"
    //       type="email"
    //       {...register("email", {
    //         required: true,
    //         validate: {
    //           matchPatern: (value) =>
    //             /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    //             "Email address must be a valid address",
    //         },
    //       })}
    //     />

    //     <Input
    //       label="Password: "
    //       placeholder="Enter your password"
    //       type="password"
    //       {...register("password", {
    //         required: true,
    //       })}
    //     />

    //     <Button type="submit">Sign In</Button>
    //   </form>
    // </div>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-[90%] md:max-w-md bg-black/50 backdrop-blur-md rounded-lg py-8 mx-auto mt-20 mb-10 flex flex-col gap-y-6 text-center px-8 border border-white/10 z-0'
    >
      {/* Logo and Heading */}
      <div>
        <Logo className='text-white' />
        <h2 className='mt-4 font-bold text-2xl text-white'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-gray-400'>
          Don&apos;t have an account?&nbsp;
          <Link to='/signup'>
            <span className='font-bold text-yellow-400 transition-all duration-300 hover:underline'>
              Sign Up
            </span>
          </Link>
        </p>
        {error && <p className='text-red-400 mt-4 text-center'>{error}</p>}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(login)} className='flex flex-col gap-y-2'>
        {/* Email Input */}
        <Input
          label='Email'
          placeholder='Enter your email'
          type='email'
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
          className='w-full bg-white/10 border border-white/10 text-black font-semibold placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50'
        />

        {/* Password Input */}
        <Input
          label='Password'
          placeholder='Enter your password'
          type='password'
          {...register("password", {
            required: true,
          })}
          className='w-full bg-white/10 border border-white/10 text-black font-semibold placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50'
        />

        {/* Submit Button */}
        <Button
          type='submit'
          className='bg-yellow-400 text-black hover:bg-white transition-all duration-300 max-w-fit mx-auto mt-5'
        >
          Sign In
        </Button>
      </form>
    </motion.div>
  );
}

export default Login;
