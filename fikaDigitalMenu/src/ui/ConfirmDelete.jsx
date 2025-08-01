import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";
import { ThreeDotsLoading } from "./Loading";

function ConfirmDelete({ name, onClose, disabled, onConfirm, isDeleting }) {
  return (
    <div className="mb-4 mx-5">
      <h2 className="mb-4 text-neutral-200">
        {`آیا از حذف آیتم ${name} مطمئن هستید ؟`}
      </h2>
      <div className="flex justify-between items-center gap-x-16">
        <button
          className="btn w-24 cursor-pointer flex items-center justify-between flex-1 bg-red-600 text-neutral-200"
          onClick={onConfirm}
          disabled={disabled}
        >
          {isDeleting ? <ThreeDotsLoading /> : <span>تایید</span>}
          <IoCheckmarkDoneSharp className="w-5 h-5" />
        </button>
        <button
          className="btn w-24 cursor-pointer flex items-center justify-between flex-1 bg-teal-600 text-neutral-200"
          onClick={onClose}
          disabled={disabled}
        >
          {isDeleting ? <ThreeDotsLoading /> : <span>لغو</span>}
          <IoMdRemove className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
