import React from "react";

function Cell({ value, colorClass }) {
  return (
    <>
      <input
        type="text"
        className={`w-full aspect-square text-center text-lg font-semibold hover:cursor-pointer caret-transparent select-none touch-none ${colorClass} rounded-[6px]`}
        value={value}
      />
    </>
  );
}

export default Cell;
