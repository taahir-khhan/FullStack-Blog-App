import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { type = "text", label, className = "", ...props },
  ref
) {
  const uniqueId = useId();

  return (
    <div className="text-left">
      {label && (
        <label
          className="inline-block mb-1 pl-1 font-medium text-xl"
          htmlFor={uniqueId}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        className={`px-3 py-2 rounded-lg block bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-[300px] ${className}`}
        ref={ref}
        id={uniqueId}
        {...props}
      />
    </div>
  );
});

export default Input;
