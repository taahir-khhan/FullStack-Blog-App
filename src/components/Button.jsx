import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Button({
  children,
  showArrow = true,
  bgColor = "",
  textColor = "",
  hoverColor = "",
  className,
  ...props
}) {
  return (
    <button
      className={` flex items-center gap-3  text-[18px] rounded-full px-6 py-3   transition-colors duration-500 cursor-pointer group font-semibold ${bgColor} ${textColor} ${hoverColor} ${className}`}
      {...props}
    >
      {children}
      {showArrow && (
        <span className='bg-black text-white rounded-full h-7 w-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-500'>
          <FaArrowRight />
        </span>
      )}
    </button>
  );
}

export default Button;
