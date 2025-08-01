import toast from "react-hot-toast";
import Loading from "../../../ui/Loading";
import Table from "../../../ui/Table";
import { useState } from "react";
import ItemModal from "../../../ui/ItemModal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import { IoCloseOutline } from "react-icons/io5";
import useCategories from "../../../hooks/useCategories";
import CategoriesRow from "./CategoriesRow";
import useDeleteCategory from "../../../hooks/useDeleteCategory";
import CategoriesForm from "./CategoriesForm";

function CategoriesTable() {
  const { categories, error, isError, isLoading } = useCategories();
  const { deleteCategory, isDeleting } = useDeleteCategory();
  const [editCategory, setEditCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  if (isLoading) return <Loading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  if (!categories.length)
    return <p className="text-neutral-200">دسته بندی ای یافت نشد</p>;

  return (
    <>
      <Table>
        <Table.Header>
          <th>#</th>
          <th>عنوان</th>
          <th>عکس</th>
          <th>ترتیب</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {categories.map((item, index) => (
            <CategoriesRow
              key={item._id}
              item={item}
              index={index}
              onEdit={() => setEditCategory(item)}
              onDelete={() => setCategoryToDelete(item)}
            />
          ))}
        </Table.Body>
      </Table>

      {editCategory && (
        <ItemModal onClose={() => setEditCategory(null)}>
          <div className="flex items-center justify-between border-b  border-gray-300 px-2 mb-2 mt-1.5">
            <div className="flex items-center gap-x-2">
              <button className="w-9">
                <img src="/images/Fika Sidebar.png" alt="" />
              </button>
              <h1 className="text-neutral-200 text-3xl">
                {`ویرایش دسته بندی ${editCategory.name}`}
              </h1>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => setEditCategory(null)}
            >
              <IoCloseOutline className="w-5 h-5 text-neutral-200" />
            </button>
          </div>
          <CategoriesForm
            categoryToEdit={editCategory}
            onClose={() => setEditCategory(null)}
          />
        </ItemModal>
      )}

      {categoryToDelete && (
        <ItemModal onClose={() => setCategoryToDelete(null)}>
          <ConfirmDelete
            name={categoryToDelete.name}
            isDeleting={isDeleting}
            disabled={false}
            onClose={() => setCategoryToDelete(null)}
            onConfirm={async () =>
              await deleteCategory(categoryToDelete._id, {
                onSuccess: () => {
                  setCategoryToDelete(null);
                  toast.success(
                    `دسته بندی ${categoryToDelete.name} با موفقیت حذف شد`
                  );
                },
              })
            }
          />
        </ItemModal>
      )}
    </>
  );
}

export default CategoriesTable;
