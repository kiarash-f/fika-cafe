import toast from "react-hot-toast";
import useItems from "../../../hooks/useItems";
import Loading from "../../../ui/Loading";
import Table from "../../../ui/Table";
import ItemsRow from "./ItemsRow";
import { useState } from "react";
import ItemModal from "../../../ui/ItemModal";
import ItemsForm from "./ItemsForm";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import useDeleteItem from "../../../hooks/useDeleteItem";
import { IoCloseOutline } from "react-icons/io5";

function ItemsTable({ sortItems }) {
  const { error, isError, isLoading, items } = useItems();
  const { deleteItem, isDeleting } = useDeleteItem();
  const [editItem, setEditItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  if (!items.length) return <p className="text-neutral-200">آیتمی یافت نشد</p>;

  const filteredItems =
    sortItems === "بر اساس همه دسته بندی ها"
      ? items
      : items.filter((item) => item.category.name === sortItems);

  return (
    <>
      <Table>
        <Table.Header>
          <th>#</th>
          <th>عنوان</th>
          <th>دسته بندی</th>
          <th>قیمت</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {filteredItems.map((item, index) => (
            <ItemsRow
              key={item._id}
              item={item}
              index={index}
              onEdit={() => setEditItem(item)}
              onDelete={() => setItemToDelete(item)}
            />
          ))}
        </Table.Body>
      </Table>

      {editItem && (
        <ItemModal onClose={() => setEditItem(null)}>
          <div className="flex items-center justify-between border-b  border-gray-300 px-2 mb-2 mt-1.5">
            <div className="flex items-center gap-x-2">
              <button className="w-9">
                <img src="/images/Fika Sidebar.png" alt="" />
              </button>
              <h1 className="text-neutral-200 text-3xl">
                {`ویرایش آیتم ${editItem.name}`}
              </h1>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => setEditItem(null)}
            >
              <IoCloseOutline className="w-5 h-5 text-neutral-200" />
            </button>
          </div>
          <ItemsForm itemToEdit={editItem} onClose={() => setEditItem(null)} />
        </ItemModal>
      )}

      {itemToDelete && (
        <ItemModal onClose={() => setItemToDelete(null)}>
          <ConfirmDelete
            name={itemToDelete.name}
            isDeleting={isDeleting}
            disabled={false}
            onClose={() => setItemToDelete(null)}
            onConfirm={async () =>
              await deleteItem(itemToDelete._id, {
                onSuccess: () => {
                  setItemToDelete(null);
                  toast.success(`آیتم ${itemToDelete.name} با موفقیت حذف شد`);
                },
              })
            }
          />
        </ItemModal>
      )}
    </>
  );
}

export default ItemsTable;
