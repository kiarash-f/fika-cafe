import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  IoCloseOutline,
  IoMenuOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import ItemModal from "../ui/ItemModal";
import Login from "../features/admin/Login";
import { FaInstagram } from "react-icons/fa6";
import { HiLogin } from "react-icons/hi";
import Cookies from "js-cookie";
import { RiAdminLine } from "react-icons/ri";
import ThemeMode from "../ui/ThemeMode";
import { useThemeMode } from "../context/useThemeModeContext";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { darkMode } = useThemeMode();
  const token = Cookies.get("token") || "";

  useEffect(() => {
    AOS.init({
      duration: 2500,
      easing: "ease-in-out-back",
      once: true,
      delay: 300,
    });
  }, []);

  const loginClickHandler = (event) => {
    event.stopPropagation();
    setIsLoginOpen((prev) => !prev);
  };

  return (
    <>
      <div className="absolute top-2 left-2 z-20">
        <button
          className="cursor-pointer dark:bg-putty rounded dark:text-cobalt-blue bg-cobalt-blue text-putty"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <IoMenuOutline className="w-10 h-10" />
        </button>
      </div>
      <div className="absolute top-2 left-16 z-20">
        <ThemeMode />
      </div>
      <div
        className="h-screen w-full flex items-center justify-center"
        data-aos="fade-down"
      >
        <img
          src={`${
            darkMode === "dark"
              ? "/images/Fika Sidebar.png"
              : "/images/Fika Sidebar 2.png"
          }`}
          alt="Fika Logo"
          className="max-w-md min-w-40"
        />
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 transition-all duration-1000"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`fixed top-0 left-0 h-full w-full dark:bg-putty bg-cobalt-blue z-40 transition-all duration-1000 ease-in-out overflow-y-auto ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-center relative flex-row-reverse p-4">
              <div className="absolute top-3 left-2">
                <button
                  className="cursor-pointer z-50"
                  onClick={() => setIsOpen(false)}
                >
                  <IoCloseOutline className="w-10 h-10" />
                </button>
              </div>
              <div className="flex items-center justify-center">
                <p className="dark:text-black/75 text-neutral-200 font-winky-rough sm:text-xl text-lg">
                  Savoring a moment in life
                </p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center">
                <img
                  src={`${
                    darkMode === "dark"
                      ? "images/Fika_Dictionary-removebg-preview.png"
                      : "images/Fika_Dictionary-removebg-preview 2.png"
                  }`}
                  alt="Fika"
                  className="object-contain w-sm h-auto"
                />
              </div>
              <ul className="space-y-4 text-2xl flex flex-col items-start w-full rounded-md py-4 mx-auto bg-neutral-300 dark:bg-shade-brown dark:text-neutral-200 text-black/75 divide-y divide-cobalt-blue dark:divide-putty ">
                <li className="w-full flex items-start pb-3">
                  <Link
                    className="w-full flex gap-x-2 items-center mr-4"
                    to="https://www.instagram.com/fikacoffee.anzali"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="border rounded-full p-1.5 dark:dark:border-putty border-black/75 cursor-pointer">
                      <FaInstagram className="w-5 h-5" />
                    </button>
                    <span>فیکا در اینستاگرام</span>
                  </Link>
                </li>
                <li className="w-full flex items-start pb-3">
                  <Link
                    className="w-full flex gap-x-2 items-center mr-4"
                    to="https://maps.app.goo.gl/j6GXfrmY3jAK1rQi7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="border rounded-full p-1.5 dark:border-putty border-black/75 cursor-pointer">
                      <IoLocationOutline className="w-5 h-5" />
                    </button>
                    <span>فیکا روی نقشه</span>
                  </Link>
                </li>
                <li className="w-full flex items-start mr-4">
                  {!token ? (
                    <div
                      className="w-full flex gap-x-2 items-center cursor-pointer"
                      onClick={loginClickHandler}
                    >
                      <button className="border dark:border-putty border-black/75 rounded-full p-1.5 cursor-pointer">
                        <HiLogin className="w-5 h-5" />
                      </button>
                      <span>ورود</span>
                    </div>
                  ) : (
                    <Link
                      className="w-full flex gap-x-2 items-center cursor-pointer"
                      to="/admin"
                    >
                      <button className="border dark:border-putty border-black/75 rounded-full p-1.5 cursor-pointer">
                        <RiAdminLine className="w-5 h-5" />
                      </button>
                      <span>دسترسی ادمین</span>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {isLoginOpen && (
        <ItemModal onClose={() => setIsLoginOpen(false)}>
          <div className="flex items-center justify-between border-b  border-gray-300 px-2 mb-2 mt-1.5">
            <div className="flex items-center gap-x-2">
              <button className="w-9">
                <img src="/images/Fika Sidebar.png" alt="" />
              </button>
              <h1 className="text-neutral-200 text-3xl">ورود</h1>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => setIsLoginOpen(false)}
            >
              <IoCloseOutline className="w-5 h-5 text-neutral-200" />
            </button>
          </div>
          <Login setIsLoginOpen={setIsLoginOpen} />
        </ItemModal>
      )}
    </>
  );
}

export default Home;
