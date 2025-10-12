import React from "react";

function Cell() {
  return (
    <div>
      <input
        type="text"
        className="w-12 h-12 sm:w-6 sm:h-6 text-center border border-gray-400
        text-lg font-semibold"
      />
    </div>
  );
}

export default Cell;
