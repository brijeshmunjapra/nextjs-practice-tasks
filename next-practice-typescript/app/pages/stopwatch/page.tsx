"use client";
import React, { useState, useEffect } from "react";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (interval !== null) {
      clearInterval(interval);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time: number): string => {
    const totalSeconds = time;
    const seconds = totalSeconds % 60;
    const totalMinutes = (totalSeconds - seconds) / 60;
    const minutes = totalMinutes % 60;
    const hours = (totalMinutes - minutes) / 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{formatTime(time)}</p>
      <button onClick={startStop}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
