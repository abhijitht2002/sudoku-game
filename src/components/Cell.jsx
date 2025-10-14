import React from "react";

function Cell({ value, colorClass, isFixed, onChange }) {
  return (
    <>
      <input
        type="text"
        maxLength="1"
        className={`w-full aspect-square text-center text-lg font-semibold hover:cursor-pointer caret-transparent select-none touch-none ${colorClass} rounded-[6px] ${
          isFixed ? "text-black" : "text-green-500"
        }`}
        value={value}
        readOnly={isFixed}
        onChange={onChange}
      />
    </>
  );
}

export default Cell;
