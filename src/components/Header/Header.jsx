import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-indigo-200 p-4 mb-8 w-full h-auto border-b-4 border-white">
      <nav className="flex flex-col gap-y-4 md:flex-row justify-between px-5 items-center">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <ul className="flex items-center space-x-4 font-medium">
          {navItems.map((item) =>
            item.active ? (
              <li
                key={item.name}
                className={
                  item.name === "Login" || item.name === "Signup"
                    ? "bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-500 "
                    : "transition-colors duration-300 hover:text-indigo-700"
                }
              >
                <button onClick={() => navigate(item.path)}>{item.name}</button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li className="">
              <LogoutBtn
                className={
                  "bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-500"
                }
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
