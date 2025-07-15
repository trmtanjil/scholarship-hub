import React, { useState, useEffect } from "react";
import { IoSunny } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  // Theme change handle korbe
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className=" mx-4 flex flex-col items-center justify-center bg-base-100 text-base-content transition-colors duration-500">

      <button className="btn  " onClick={toggleTheme}>
      {theme === "light" ?  <MdDarkMode /> : <IoSunny></IoSunny>}  
      </button>

     
    </div>
  );
}