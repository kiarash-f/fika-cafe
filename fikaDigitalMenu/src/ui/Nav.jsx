import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";

export default function Nav() {
  return (
    <div className="flex items-center justify-evenly sm:justify-between sm:px-8 py-2 h-28 font-yekan">
      <a
        href="https://www.instagram.com/fikacoffee.anzali"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-x-2"
      >
        <BsInstagram className="w-5 h-5" />
        <span>Fika</span>
      </a>
      <img
        src="/images/Fika Sidebar.png"
        alt="Fika Logo"
        className="h-full max-sm:h-17"
      />
      <Link
        to="/"
        className="sm:px-5 px-3 py-1 rounded-lg border-b-1 border-t-1  md:text-[20px] max-[500px]:text-[13px]"
      >
        صفحه اصلی
      </Link>
    </div>
  );
}
