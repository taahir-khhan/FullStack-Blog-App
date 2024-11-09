import React, { useState } from "react";

import { set, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import authService from "../appwrite/auth";
import { logIn } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

function SignUp() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const create = (data) => {
    setError("");
    try {
      const response = authService.createAccount(data);
      if (response) {
        const userData = authService.getCurrentUserState();
        if (userData) dispatch(logIn(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-[90%] md:max-w-fit mx-auto rounded-lg px-4 py-8  flex flex-wrap items-center justify-center gap-10 bg-white">
      <div className="text-center">
        <Logo />
        <h2>Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      </div>

      <form onSubmit={handleSubmit(create)}>
        <div className="space-y-5 text-center">
          <Input
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
          />

          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
