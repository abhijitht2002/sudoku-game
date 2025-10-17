import React, { useEffect, useState } from "react";
import clockIcon from "../assets/icons/time.png";

function Timer({ status, fetchTime }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (status) return; // kill if the status is true (i.e., game over)

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [status]);

  // When gameOver is triggered, send the final time
  useEffect(() => {
    if (status) {
      fetchTime(seconds);
    }
  }, [status, seconds]);

  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const remainingSeconds = secs % 60;
    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex gap-3 justify-center items-center">
      <img src={clockIcon} alt="" className="w-[40px] h-[40px]" />
      <h1 className="text-2xl font-bold text-gray-600">
        {formatTime(seconds)}
      </h1>
    </div>
  );
}

export default Timer;
