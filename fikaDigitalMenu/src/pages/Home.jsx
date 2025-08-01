import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi";
import ItemModal from "../ui/ItemModal";
import { IoCloseOutline } from "react-icons/io5";
import Login from "../features/admin/Login";

function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const token = Cookies.get("token") || "";

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  const loginClickHandler = (event) => {
    event.stopPropagation();
    setIsLoginOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center font-exo">
      <div className="absolute w-full h-full bg-[url('/coffee.jpg')] bg-cover bg-center brightness-50"></div>
      <div className="drop-shadow-2xl w-4/5 flex-1 gap-y-6 flex flex-col justify-between pt-14 pb-24">
        <div className="w-full space-y-5">
          <div
            className="flex items-center justify-between"
            data-aos="fade-right"
          >
            <p className="sm:tracking-[7px] tracking-widest">
              Savoring a moment in life
            </p>
            <button className="cursor-pointer">
              {!token ? (
                <div
                  className="w-full flex gap-x-2 items-center cursor-pointer"
                  onClick={loginClickHandler}
                >
                  <HiOutlineLockClosed className="w-7 h-7" />
                </div>
              ) : (
                <Link
                  className="w-full flex gap-x-2 items-center cursor-pointer"
                  to="/admin"
                >
                  <HiOutlineLockOpen className="w-7 h-7" />
                </Link>
              )}
            </button>
          </div>
          <div
            className="sm:text-6xl text-5xl flex space-x-4 max-[370px]:space-x-2"
            data-aos="fade-up"
          >
            <p className="bg-linear-to-b from-cobalt-blue via-berkeley-blue rounded-t-md h-72 p-2">
              <img
                src="/images/Fika Sidebar.png"
                alt="Fika Logo"
                className="w-24 sm:h-18 h-15"
              />
            </p>
            <p className="pt-3">Cafe</p>
          </div>
        </div>
        <Link
          data-aos="fade-down"
          data-aos-anchor-placement="top-bottom"
          to="/menu"
          className="rounded-lg bg-cobalt-blue text-center py-2 text-2xl cursor-pointer"
        >
          Menu
        </Link>
      </div>
      {isLoginOpen && (
        <ItemModal onClose={() => setIsLoginOpen(false)}>
          <div
            className="flex items-center justify-between border-b  border-gray-300 px-2 mb-2 mt-1.5"
            style={{ direction: "rtl" }}
          >
            <div className="flex items-center gap-x-2 py-2 font-arsoo">
              <button className="w-9">
                <img src="/images/Fika Sidebar.png" alt="" />
              </button>
              <h1 className="text-xl">ورود</h1>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => setIsLoginOpen(false)}
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>
          </div>
          <Login setIsLoginOpen={setIsLoginOpen} />
        </ItemModal>
      )}
    </div>
  );
}

export default Home;
