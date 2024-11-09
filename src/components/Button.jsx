import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-slate-900",
  textColor = "text-white",
  hoverColor = "",
  className = "",
  ...props
}) {
  return (
    <button
      className={` mx-auto py-2 px-6  rounded-lg mt-4 font-medium  cursor-pointer transition-colors duration-500 ${bgColor} ${textColor} ${className} ${hoverColor}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
