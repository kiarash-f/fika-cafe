import toast from "react-hot-toast";
import useCategories from "../hooks/useCategories";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import ThemeModeProvider from "../context/useThemeModeContext";

function HomePageLayout() {
  const { isLoading, isError, error } = useCategories();

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  return (
    <ThemeModeProvider>
      <div
        className={`max-w-screen dark:bg-cobalt-blue bg-putty transition-colors duration-500 relative`}
      >
        <Sidebar />
        <div className="mr-[65px] sm:mr-[75px] h-full text-neutral-200 text-end font-farsi-sade">
          <Outlet />
        </div>
      </div>
    </ThemeModeProvider>
  );
}

export default HomePageLayout;
