import { div } from "framer-motion/client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
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

  const buttons = [
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
  ];

  return (
    <>
      <header className='hidden md:flex items-center justify-between px-10 py-6 bg-black text-white'>
        <div className='hover:scale-105 transition-transform duration-500 cursor-pointer'>
          <Link to='/'>
            <Logo />
          </Link>
        </div>

        {authStatus && (
          <div className='flex items-center gap-3'>
            {navItems.map((item) => (
              <Button
                onClick={() => navigate(item.path)}
                bgColor='bg-white'
                textColor='text-black'
                hoverColor='hover:bg-yellow-500'
                showArrow={false}
                className={"font-medium"}
              >
                {item.name}
              </Button>
            ))}
            <LogoutBtn />
          </div>
        )}

        {!authStatus && (
          <div className='flex items-center gap-2'>
            {buttons.map((item) =>
              item.active ? (
                <Button
                  onClick={() => navigate(item.path)}
                  bgColor='bg-yellow-500'
                  textColor='text-black'
                  hoverColor='hover:bg-white'
                >
                  {item.name}
                </Button>
              ) : null
            )}
          </div>
        )}
      </header>

      {/* Mobile UI */}
      <header className='flex justify-between items-center px-6 py-3 bg-black text-white relative md:hidden '>
        <div className='hover:scale-105 transition-transform duration-500 cursor-pointer'>
          <Link to='/'>
            <Logo />
          </Link>
        </div>

        {showMenu ? (
          <RxCross1
            className='cursor-pointer'
            size={28}
            onClick={() => setShowMenu(false)}
          />
        ) : (
          <GiHamburgerMenu
            className='cursor-pointer'
            size={28}
            onClick={() => setShowMenu(true)}
          />
        )}

        {showMenu && (
          <div className='absolute w-full left-0 top-[60px] bg-white transition-all duration-500 ease-in-out'>
            {authStatus && (
              <>
                {navItems.map((item) => (
                  <Button
                    onClick={() => {
                      navigate(item.path);
                      setShowMenu(false);
                    }}
                    bgColor='bg-white'
                    textColor='text-black'
                    hoverColor='hover:bg-yellow-500'
                    showArrow={false}
                    className={"font-medium w-full border-b rounded-none"}
                  >
                    {item.name}
                  </Button>
                ))}
                <LogoutBtn />
              </>
            )}
            {!authStatus && (
              <>
                {buttons.map((item) =>
                  item.active ? (
                    <Button
                      onClick={() => {
                        navigate(item.path);
                        setShowMenu(false);
                      }}
                      bgColor='bg-white'
                      textColor='text-black'
                      hoverColor='hover:bg-yellow-500'
                      className={"w-full font-medium rounded-none border-b-2"}
                    >
                      {item.name}
                    </Button>
                  ) : null
                )}
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
