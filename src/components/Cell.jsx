import React from "react";

const getCellColor = (r, c) => {
  const blockRow = Math.floor(r / 3);
  const blockCol = Math.floor(c / 3);

  // return (blockRow + blockCol) % 2 === 0 ? "bg-blue-50" : "bg-blue-100";
  return (blockRow + blockCol) % 2 === 0 ? "bg-[#e3e3e3]" : "bg-[#d0c4e8]";
};

function Cell({ r, c, value, isFixed, onValueChange }) {
  return (
    <>
      <input
        type="text"
        maxLength="1"
        className={`w-full aspect-square text-center text-lg font-semibold hover:cursor-pointer caret-transparent select-none touch-none 
          ${getCellColor(r, c)} 
          rounded-[6px] 
          ${isFixed ? "text-black" : "text-green-500"}`}
        value={value}
        readOnly={isFixed}
        onChange={(e) => {
          const newVal = e.target.value.replace(/[^1-9]/g, "");/* 1-9 digit validation  */
          onValueChange(newVal);
        }}
        onFocus={(e) => e.target.select()}
      />
    </>
  );
}

export default Cell;
