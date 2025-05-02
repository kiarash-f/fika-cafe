import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import CustomNavlink from "./CustomNavlink";
import { useLocation, NavLink } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { useThemeMode } from "../context/useThemeModeContext";

function Sidebar() {
  const { categories, error, isError, isLoading } = useCategories();
  const { darkMode } = useThemeMode();
  const menuMap = {
    "قهوه گرم": {
      to: "/items/hot-coffee",
      icon: "/icons/hot coffee.png",
      icon_2: "/icons/hot coffee 2.png",
    },
    "قهوه سرد": {
      to: "/items/ice-coffee",
      icon: "/icons/ice coffee.png",
      icon_2: "/icons/ice coffee 2.png",
    },
    "نوشیدنی گرم": {
      to: "/items/hot-drinks",
      icon: "/icons/hot drink.png",
      icon_2: "/icons/hot drink 2.png",
    },
    "میلک شیک": {
      to: "/items/milkshake",
      icon: "/icons/milk shake.png",
      icon_2: "/icons/milk shake 2.png",
    },
    "فیت بار": {
      to: "/items/fit-bar",
      icon: "/icons/energy drink.png",
      icon_2: "/icons/energy drink 2.png",
    },
    فراپه: {
      to: "/items/frappe",
      icon: "/icons/frappe.png",
      icon_2: "/icons/frappe 2.png",
    },
    اسموتی: {
      to: "/items/smoothie",
      icon: "/icons/smoothie.png",
      icon_2: "/icons/smoothie 2.png",
    },
    ماکتیل: {
      to: "/items/mocktail",
      icon: "/icons/mocktail.png",
      icon_2: "/icons/mocktail 2.png",
    },
    کیک: {
      to: "/items/cake",
      icon: "/icons/cake.png",
      icon_2: "/icons/cake 2.png",
    },
  };

  //Add to and icon property to category items
  const enrichedCategories = categories.map((cat) => ({
    ...cat,
    to: menuMap[cat.name]?.to || "",
    icon: menuMap[cat.name]?.icon || "",
    icon_2: menuMap[cat.name]?.icon_2 || "",
  }));

  const location = useLocation();
  useEffect(() => {
    AOS.init({
      duration: 2500,
      easing: "ease-in-out-back",
      once: true,
      delay: 300,
    });
  }, []);

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  return (
    <div
      className="fixed right-0 top-0 w-[65px] sm:w-[75px] dark:bg-putty bg-cobalt-blue h-full overflow-y-auto"
      data-aos="fade-right"
    >
      <ul className="flex flex-col items-center min-h-screen font-farsi-sade">
        <li
          className={`relative flex items-center justify-center w-14 h-14 my-1 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 
              ${
                location.pathname !== "/home" && " dark:bg-cobalt-blue bg-putty"
              }`}
        >
          <span
            className={`absolute text-black/75 bottom-0 left-0 w-full h-full bg-white transition-transform duration-500 ease-in-out ${
              location.pathname === "/home"
                ? "translate-y-0"
                : "translate-y-full"
            }`}
          ></span>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center justify-center relative transition-all ${
                isActive ? "" : ""
              }`
            }
          >
            <div className="">
              <span
                className={`flex items-center justify-center transition-all duration-700 ease-in-out transform text-black ${
                  location.pathname === "/home" ? "block" : "hidden"
                }`}
              >
                صفحه اصلی
              </span>
              <div
                className={`flex flex-col items-center justify-center text-black dark:text-neutral-200 ${
                  location.pathname === "/home" && "hidden"
                }`}
              >
                <img
                  src={`${
                    darkMode === "dark"
                      ? "/images/Fika Sidebar.png"
                      : "/images/Fika Sidebar 2.png"
                  }`}
                  alt="صفحه اصلی"
                  className="w-10 h-auto mt-1"
                />
                <span>صفحه اصلی</span>
              </div>
            </div>
          </NavLink>
        </li>
        {enrichedCategories.map((category) => (
          <li
            key={category._id}
            className={`relative flex items-center justify-center w-14 h-14 my-1 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 
              ${
                location.pathname !== category.to &&
                "dark:bg-cobalt-blue bg-putty"
              }`}
          >
            <span
              className={`absolute text-black bottom-0 left-0 w-full h-full bg-white transition-transform duration-500 ease-in-out ${
                location.pathname === category.to
                  ? "translate-y-0"
                  : "translate-y-full"
              }`}
            ></span>
            <CustomNavlink category={category} to={category.to} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
