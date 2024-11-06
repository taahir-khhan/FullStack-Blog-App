import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logOut } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logOut());
    });
  };

  return (
    <button className="auth__btn" onClick={logoutHandler}>
      Logout
    </button>
  );
}

export default LogoutBtn;
