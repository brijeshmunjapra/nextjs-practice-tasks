"use client";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";

const Navbar = ({children}) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        setTextColor("#000000");
      } else {
        setColor("transparent");
        setTextColor("#ffffff");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: color }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="flex items-center justify-between text-white max-w-[1240px] m-auto p-4">
        <div className="flex items-center justify-around w-[30%]">
        <Link href={"/"}>
          <h1 style={{ color: textColor }} className="font-bold text-4xl">
            Captur
          </h1>
        </Link>
        {children}
        </div>
        <ul style={{ color: textColor }} className="hidden sm:flex">
          <li className="p-4">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="p-4">
            <Link href={"/#gallery"}>Gallery</Link>
          </li>
          <li className="p-4">
            <Link href={"/work"}>Work</Link>
          </li>
          <li className="p-4">
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>

        {/* mobile view */}
        <div className="block sm:hidden z-10">
          {open ? (
            <AiOutlineClose
              style={{ color: textColor, cursor: "pointer" }}
              onClick={() => setOpen(false)}
              size={20}
            />
          ) : (
            <AiOutlineMenu
              style={{ color: textColor, cursor: "pointer" }}
              onClick={() => setOpen(true)}
              size={20}
            />
          )}
        </div>
        <div
          className={
            open
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-orange-100 dark:bg-slate-700 text-center ease-in duration-300 text-black dark:text-orange-100"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-red-600 text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              className="p-4 text-4xl hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              <Link href={"/"}>Home</Link>
            </li>
            <li
              className="p-4 text-4xl hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              <Link href={"/#gallery"}>Gallery</Link>
            </li>
            <li
              className="p-4 text-4xl hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              <Link href={"/work"}>Work</Link>
            </li>
            <li
              className="p-4 text-4xl hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
