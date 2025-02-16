import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className='text-lg font-medium text-white'>{label}</label>
      )}
      <select
        ref={ref}
        className={`bg-white/10 text-white placeholder-gray-400 border border-yellow-50 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className='bg-black hover:bg-yellow-400'
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
