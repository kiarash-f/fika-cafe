import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCategories from "../hooks/useCategories";
import Nav from "./Nav";
import Category from "./Category";
import Loading from "./Loading";
import toast from "react-hot-toast";

export default function MenuPageLayout() {
  const { categories, isLoading, isError, error } = useCategories();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/menu" &&
      categories?.length > 0 &&
      !isLoading &&
      !isError
    ) {
      navigate(`items/${categories[0]._id}`, { replace: true });
    }
  }, [location.pathname, categories, isLoading, isError, navigate]);

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(
      error?.response?.data?.message ||
        "مشکلی در بارگذاری دسته‌بندی‌ها پیش آمده"
    );

  return (
    <div className="relative">
      <Nav />
      <Category />
      <Outlet />
    </div>
  );
}
