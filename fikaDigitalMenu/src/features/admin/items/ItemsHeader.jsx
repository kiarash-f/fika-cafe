import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import ItemModal from "../../../ui/ItemModal";
import { IoCloseOutline } from "react-icons/io5";
import ItemsForm from "./ItemsForm";
import useCategories from "../../../hooks/useCategories";
import { ThreeDotsLoading } from "../../../ui/Loading";
import toast from "react-hot-toast";

function ItemsHeader({ sortItems, setSortItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const { categories, error, isError, isLoading } = useCategories();

  if (isLoading) return <ThreeDotsLoading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  return (
    <>
      <div className="mb-4 mx-4  flex items-center justify-between flex-col md:flex-row gap-y-2 md:gap-y-0">
        <button
          className="btn flex items-center justify-between w-44 bg-green-700 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-xl">افزودن آیتم جدید</span>
          <HiOutlinePlus className="w-5 h-5" />
        </button>
        <select
          name="preferSearch"
          className="px-3 w-44 border border-gray-400 focus:ring-transparent focus:border-gray-400 focus:outline-none rounded-xl shadow-md shadow-slate-800 transition-all duration-300  bg-neutral-200 text-black"
          value={sortItems}
          onChange={(e) => setSortItems(e.target.value)}
        >
          <option value="بر اساس همه دسته بندی ها">
            براساس همه دسته بندی ها
          </option>
          {categories.map((category) => (
            <option
              key={category._id}
              value={`${category.name}`}
            >{`براساس ${category.name}`}</option>
          ))}
        </select>
      </div>
      {isOpen && (
        <ItemModal onClose={() => setIsOpen(false)}>
          <div className="flex items-center justify-between border-b  border-gray-300 px-2 mb-2 mt-1.5">
            <div className="flex items-center gap-x-2">
              <button className="w-9">
                <img src="/images/Fika Sidebar.png" alt="" />
              </button>
              <h1 className="text-neutral-200 text-3xl">افزودن آیتم جدید</h1>
            </div>
            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
              <IoCloseOutline className="w-5 h-5 text-neutral-200" />
            </button>
          </div>
          <ItemsForm onClose={() => setIsOpen(false)} />
        </ItemModal>
      )}
    </>
  );
}

export default ItemsHeader;
