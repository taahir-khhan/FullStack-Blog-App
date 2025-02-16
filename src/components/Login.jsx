import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/all-post");
    }
  }, [isLoggedIn, navigate]);

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.logIn(data);
      if (session) {
        const userData = await authService.getCurrentUserState();
        if (userData) {
          dispatch(authLogin(userData));
          toast.success("Logged in successfully");
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      toast.error("Error while logging in");
      setError(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-[90%] md:max-w-md bg-black/50 backdrop-blur-md rounded-lg py-8 mx-auto mt-20 mb-10 flex flex-col gap-y-6 text-center px-8 border border-white z-0'
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
