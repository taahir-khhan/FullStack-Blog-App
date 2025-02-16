import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logOut } from "../../store/authSlice";
import { Button } from "../index";

function LogoutBtn({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await authService.logOut().then(() => {
      dispatch(logOut());
    });
    navigate("/");
  };

  return (
    <Button
      onClick={logoutHandler}
      textColor='text-black'
      hoverColor='hover:bg-yellow-500'
      className={
        "font-medium border-b-2 w-full rounded-none md:border-none md:bg-yellow-500 md:rounded-full md:w-min md:hover:bg-white "
      }
    >
      Logout
    </Button>
  );
}

export default LogoutBtn;
