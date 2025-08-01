import { HiOutlineTrash } from "react-icons/hi";
import Table from "../../../ui/Table";
import { TbPencilMinus } from "react-icons/tb";
import { BASE_URL } from "../../../ui/HomePageLayout";

function ItemsRow({ item, index, onEdit, onDelete }) {
  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item?.category?.name || "نا مشخص"}</td>
      <td>{item.price} تومان</td>
      <td>
        <img
          src={`${BASE_URL}/${item.image}`}
          alt={item.name}
          className="w-9 h-9 rounded mx-auto object-cover"
        />
      </td>
      <td className="flex items-center justify-center gap-x-6 mx-2 py-2">
        <button
          className="cursor-pointer flex items-center justify-between btn  w-16 sm:w-28 bg-cyan-600"
          onClick={onEdit}
        >
          <span>ویرایش</span>
          <TbPencilMinus className="w-5 h-5" />
        </button>
        <button
          className="cursor-pointer flex items-center justify-between btn  w-16 sm:w-28 bg-red-600"
          onClick={onDelete}
        >
          <span>حذف</span>
          <HiOutlineTrash className="w-5 h-5" />
        </button>
      </td>
    </Table.Row>
  );
}

export default ItemsRow;
