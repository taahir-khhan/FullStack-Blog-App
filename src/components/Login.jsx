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
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-[90%] md:max-w-fit bg-white rounded-lg py-6 mx-auto flex flex-col gap-y-4 text-center px-8">
      <div>
        <Logo />
        <h2 className="mt-2 font-medium text-xl">Sign in to your account</h2>
        <p className="mt-2 text-gray-500">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup">
            <span className="font-bold transition-all duration-300 hover:underline">
              Sign Up
            </span>
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      </div>

      <form
        onSubmit={handleSubmit(login)}
        className="flex flex-col items-center justify-center gap-y-2"
      >
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
          placeholder="Enter your password"
          type="password"
          {...register("password", {
            required: true,
          })}
        />

        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}

export default Login;
