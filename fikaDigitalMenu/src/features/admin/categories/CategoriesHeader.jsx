import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import ItemModal from "../../../ui/ItemModal";
import CategoriesForm from "./CategoriesForm";
import { IoCloseOutline } from "react-icons/io5";

function CategoriesHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="mb-4 mx-4  flex items-center justify-between flex-col md:flex-row gap-y-2 md:gap-y-0">
        <button
          className="btn flex items-center justify-between w-44 bg-green-700 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-xl">افزودن دسته بندی جدید</span>
          <HiOutlinePlus className="w-5 h-5" />
        </button>
      </div>
      {isOpen && (
        <ItemModal onClose={() => setIsOpen(false)}>
          <div className="flex items-center justify-between border-b  border-gray-300 px-2 mb-2 mt-1.5">
            <div className="flex items-center gap-x-2">
              <button className="w-9">
                <img src="/images/Fika Sidebar.png" alt="" />
              </button>
              <h1 className="text-neutral-200 text-3xl">
                افزودن دسته بندی جدید
              </h1>
            </div>
            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
              <IoCloseOutline className="w-5 h-5 text-neutral-200" />
            </button>
          </div>
          <CategoriesForm onClose={() => setIsOpen(false)} />
        </ItemModal>
      )}
    </>
  );
}

export default CategoriesHeader;
