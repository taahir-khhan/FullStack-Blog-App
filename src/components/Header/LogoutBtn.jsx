import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logOut } from "../../store/authSlice";

function LogoutBtn({ className }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logOut());
    });
  };

  return (
    <button className={className} onClick={logoutHandler}>
      Logout
    </button>
  );
}

export default LogoutBtn;
