"use client";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { MdOutlineNightlightRound, MdOutlineLightMode } from "react-icons/md";
import Loading from "./Loading";
import BiUpArrow from 'react-icons/bi'



export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isloading) {
    return <Loading/>
  }
  
  return (
    <div>
      <Navbar>
      <button
        onClick={toggleDarkMode}
        className="border border-black rounded-full h-8 w-8 flex items-center justify-center dark:border-white"
      >
        {darkMode ? (
          <MdOutlineLightMode style={{ color: "white" }} />
        ) : (
          <MdOutlineNightlightRound style={{ color: "black" }} />
        )}
      </button>
     
      </Navbar>
      {children}
    </div>
  );
}
