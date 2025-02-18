import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";

function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isSignUp) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [isSignUp, navigate]);

  const create = (data) => {
    setError("");
    try {
      const response = authService.createAccount(data);
      if (response) {
        const userData = authService.getCurrentUserState();
        if (userData) {
          toast.success("user registered successfully");
          setIsSignUp(true);
        }
      }
    } catch (error) {
      setError(error.message || "Something went wrong during registration.");
      toast.error(error.message || "Something went wrong!");
      setIsSignUp(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-[90%] md:max-w-md bg-black/50 backdrop-blur-md rounded-lg py-8 my-8 mx-auto flex flex-col gap-y-6 text-center px-8  border-white border'
    >
      {/* Logo and Heading */}
      <div>
        <Logo className='text-white' />
        <h2 className='mt-4 font-bold text-2xl text-white'>
          Sign up to create account
        </h2>
        <p className='mt-2 text-gray-400'>
          Already have an account?&nbsp;
          <Link to='/login'>
            <span className='font-bold text-yellow-400 transition-all duration-300 hover:underline'>
              Log In
            </span>
          </Link>
        </p>
        {error && <p className='text-red-400 mt-4 text-center'>{error}</p>}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(create)} className='flex flex-col gap-y-4'>
        {/* Full Name Input */}
        <Input
          label='Full Name'
          placeholder='Enter your full name'
          {...register("name", {
            required: true,
          })}
          className='w-full bg-white/10 border border-white/10 text-black font-semibold placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50'
        />

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
          Create Account
        </Button>
      </form>
    </motion.div>
  );
}

export default SignUp;
