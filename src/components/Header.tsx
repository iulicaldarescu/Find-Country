import { useState, useEffect } from "react";
import { IoIosMoon } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    darkMode
      ? htmlElement.classList.add("dark")
      : htmlElement.classList.remove("dark");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 dark:bg-slate-500 px-4 py-7 dark:text-white sm:px-10 md:px-20">
      <div>
        <h1 className="text-xl font-semibold">The world</h1>
      </div>

      <div className="flex items-center gap-3" onClick={toggleDarkMode}>
        {darkMode ? (
          <IoIosMoon size={"1.5rem"} color={darkMode ? "white" : "black"} />
        ) : (
          <IoSunnyOutline
            size={"1.5rem"}
            color={darkMode ? "white" : "black"}
          />
        )}
        <p>{darkMode ? "Dark mode" : "Light mode"}</p>
      </div>
    </div>
  );
}

export default Header;
