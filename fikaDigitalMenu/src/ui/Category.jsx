import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useCategories from "../hooks/useCategories";
import { BASE_URL } from "./HomePageLayout";
import { ThreeDotsLoading } from "./Loading";
import toast from "react-hot-toast";

export default function Category() {
  const { categories, error, isError, isLoading } = useCategories();

  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <ThreeDotsLoading />;
  if (isError)
    return toast.error(
      error?.response?.data?.message ||
        "عدم اتصال اینترنت، لطفا اینترنت خود را چک کنید"
    );

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollByAmount = (amount) => {
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const filterCategories = categories.sort((a, b) => a.order - b.order);

  return (
    <div
      className={`w-full z-50  backdrop-blur-3xl shadow-[0_0_1px_gray] transition-all duration-300 ${
        isFixed
          ? "fixed top-0 py-2 bg-slate-900"
          : "relative py-6 bg-cobalt-blue"
      }`}
    >
      <div className="relative w-[80%] max-[500px]:w-[78%] max-[420px]:w-[72%] mx-auto">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => (isDragging.current = false)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseMove={handleMouseMove}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide flex md:gap-x-8 gap-x-4 transition-all duration-300"
        >
          <button
            onClick={() => scrollByAmount(-200)}
            className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-putty hover:bg-shade-brown transition-colors duration-300 text-shade-brown hover:text-neutral-200 rounded-full p-2 shadow"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scrollByAmount(200)}
            className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-putty hover:bg-shade-brown transition-colors duration-300 text-shade-brown hover:text-neutral-200 rounded-full p-2 shadow"
          >
            <FaChevronRight />
          </button>
          {filterCategories.map((item) => (
            <NavLink
              key={item._id}
              to={`items/${item._id}`}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-[rgba(248,244,240,0.5)]" : ""
                } relative flex flex-col justify-center items-center min-w-20 h-16 transition duration-200 rounded-lg`
              }
            >
              <img
                src={`${BASE_URL}/uploads/${item.image}`}
                alt={item.name}
                className="w-10 h-10 object-contain"
              />
              <p className="text-xs mt-1 text-white">{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
