import { useEffect, useState } from "react";
import useCreateItem from "../../../hooks/useCreateItem";
import { useForm, Controller } from "react-hook-form";
import useEditItem from "../../../hooks/useEditItem";
import toast from "react-hot-toast";
import InputTextField from "../../../ui/InputTextField";
import { ThreeDotsLoading } from "../../../ui/Loading";
import CategoriesSelectOption from "../../../ui/CategoriesSelectOption";
import useCategories from "../../../hooks/useCategories";

function ItemsForm({ onClose, itemToEdit = {} }) {
  const { categories, error, isError, isLoading } = useCategories();
  const [selectedFile, setSelectedFile] = useState(null);
  const { createItem, isCreating } = useCreateItem();
  const { editItem, isEditing } = useEditItem();
  const { _id: editId } = itemToEdit;
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (editId) {
      reset({
        name: itemToEdit.name,
        description: itemToEdit.description,
        category: itemToEdit.category._id,
        price: itemToEdit.price,
      });
    }
  }, [reset, editId, itemToEdit]);

  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  const itemImagePreview = selectedFile
    ? URL.createObjectURL(selectedFile)
    : itemToEdit.image;

  const onSubmit = async (data) => {
    const formData = new FormData();
    const selectedCategory = categories?.find(
      (category) => category._id === data.category
    );

    formData.append("image", selectedFile);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", selectedCategory.name);
    formData.append("price", data.price);

    const updatedItem = {
      ...formData,
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
    };

    if (editId) {
      await editItem(
        { id: editId, newItem: updatedItem },
        {
          onSuccess: () => {
            toast.success(`آیتم ${data.name} با موفقیت ویرایش شد`);
            onClose();
            reset();
          },
          onError: (error) =>
            toast.error(error?.response?.data?.message || error?.message),
        }
      );
    } else {
      await createItem(formData, {
        onSuccess: () => {
          toast.success(`آیتم ${data.name} با موفقیت ایجاد شد`);
          onClose(), reset();
        },
        onError: (error) =>
          toast.error(error?.response?.data?.message || error?.message),
      });
    }
  };

  return (
    <form
      className="text-xl"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      method="post"
    >
      <div className="flex items-center flex-col gap-y-3">
        <div className="flex flex-col w-[80%]">
          <InputTextField
            label="عنوان آیتم"
            name="name"
            register={register}
            required
            validationSchema={{
              required: "عنوان ضروری است",
              minLength: {
                value: 2,
                message: "عنوان حداقل باید 2 کاراکتر باشد",
              },
            }}
            errors={errors}
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <InputTextField
            label="توضیحات"
            name="description"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <InputTextField
            label="قیمت"
            name="price"
            type="number"
            register={register}
            required
            validationSchema={{
              required: "قیمت ضروری است",
              minLength: {
                value: 2,
                message: "قیمت حداقل باید 2 کاراکتر باشد",
              },
            }}
            errors={errors}
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <div className="flex items-center justify-between relative">
            <label htmlFor="image" className="mb-1 block text-neutral-200">
              بارگذاری عکس <span className="text-red-600">*</span>
            </label>
            {itemImagePreview && (
              <div className="absolute left-2 top-[38px]">
                <img
                  src={itemImagePreview}
                  alt=""
                  className="w-7 h-7 object-cover"
                />
              </div>
            )}
          </div>
          <Controller
            name="image"
            control={control}
            rules={{
              required: "عکس آیتم ضروری است",
              validate: {
                acceptedFormats: (fileList) =>
                  fileList &&
                  fileList.type &&
                  (fileList.type === "image/jpeg" ||
                    fileList.type === "image/jpg")
                    ? true
                    : "فقط فرمت های jpeg و jpg مجاز هستند",
                fileSize: (fileList) =>
                  fileList && fileList.size <= 20 * 1024 * 1024
                    ? true
                    : "حجم فایل نباید بیش از 20 مگابایت باشد",
              },
            }}
            render={({ field: { onChange, ref } }) => (
              <input
                type="file"
                name="image"
                accept="image/jpeg, image/jpg"
                className="inputTextField"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  onChange(file);
                }}
                ref={ref}
              />
            )}
          />
          {errors?.image?.message && (
            <span className="text-red-600 block text-sm mt-2">
              {errors?.image?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-[80%]">
          {isLoading ? (
            <ThreeDotsLoading />
          ) : (
            <CategoriesSelectOption
              name="category"
              required
              register={register}
              errors={errors}
              validationSchema={{
                required: "دسته بندی ضروری است",
              }}
            />
          )}
        </div>
        <div className="w-[80%] mt-2">
          <button
            type="submit"
            disabled={!isValid}
            className="w-full px-4 py-2 mb-4 cursor-pointer text-xl rounded-xl transition-all duration-300 bg-blue-900 text-white hover:bg-blue-800"
          >
            {isCreating || isEditing ? (
              <ThreeDotsLoading />
            ) : editId ? (
              "ذخیره تغییرات"
            ) : (
              "ایجاد آیتم"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ItemsForm;
