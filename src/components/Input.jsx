import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { type = "text", label, className = "", ...props },
  ref
) {
  const uniqueId = useId();

  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className='text-lg font-medium text-white'>{label}</label>
      )}
      <input
        type={type}
        className={`bg-white/10 text-white placeholder-gray-400 border border-yellow-50 rounded-lg px-4 py-2 focus:border-yellow-400" ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
