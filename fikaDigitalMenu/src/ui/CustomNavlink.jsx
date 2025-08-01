import { NavLink, useLocation } from "react-router-dom";
import { useThemeMode } from "../context/useThemeModeContext";

function CustomNavlink({ to, category }) {
  const location = useLocation();
  const { darkMode } = useThemeMode();

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-center relative transition-all ${
          isActive ? "" : ""
        }`
      }
    >
      <div className="">
        <span
          className={`flex items-center justify-center transition-all duration-700 ease-in-out transform text-black ${
            location.pathname === to ? "block" : "hidden"
          }`}
        >
          {category.name}
        </span>
        <div
          className={`flex flex-col items-center justify-center text-white ${
            location.pathname === to && "hidden"
          }`}
        >
          <img
            src={`${darkMode === "dark" ? category.icon : category.icon_2}`}
            alt={category.name}
            className="w-8 h-8 mt-1"
          />
          <span className="text-black dark:text-neutral-200">
            {category.name}
          </span>
        </div>
      </div>
    </NavLink>
  );
}

export default CustomNavlink;
