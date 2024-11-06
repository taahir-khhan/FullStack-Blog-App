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
    <header>
      <div className="container">
        <nav className="navbar">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <ul className="nav__list">
            {navItems.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className={
                    item.name === "Login" || item.name === "Signup"
                      ? "auth__btn"
                      : "nav__item"
                  }
                >
                  <button onClick={() => navigate(item.path)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="nav__item">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
