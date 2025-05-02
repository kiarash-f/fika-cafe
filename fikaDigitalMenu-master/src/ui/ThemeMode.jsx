import { PiSunFill } from "react-icons/pi";
import { GoMoon } from "react-icons/go";
import { useThemeMode } from "../context/useThemeModeContext";

export default function ThemeMode() {
  const { darkMode, setDarkMode } = useThemeMode();

  return (
    <div
      className={`rounded-full flex items-center justify-center ${
        darkMode === "dark" ? "bg-putty text-black/75" : "bg-cobalt-blue"
      }`}
    >
      {darkMode === "dark" ? (
        <button className="cursor-pointer" onClick={() => setDarkMode("light")}>
          <PiSunFill className="w-10 h-10 p-2" />
        </button>
      ) : (
        <button className="cursor-pointer" onClick={() => setDarkMode("dark")}>
          <GoMoon className="w-10 h-10 p-2" />
        </button>
      )}
    </div>
  );
}
