import { useEffect, useState } from "react";
import useCreateItem from "../../../hooks/useCreateItem";
import { useForm, Controller } from "react-hook-form";
import useEditItem from "../../../hooks/useEditItem";
import toast from "react-hot-toast";
import InputTextField from "../../../ui/InputTextField";
import { ThreeDotsLoading } from "../../../ui/Loading";
import CategoriesSelectOption from "../../../ui/CategoriesSelectOption";
import useCategories from "../../../hooks/useCategories";
import { BASE_URL } from "../../../ui/HomePageLayout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation Schema
const itemSchema = yup.object().shape({
  name: yup
    .string()
    .required("عنوان ضروری است")
    .min(2, "عنوان حداقل باید 2 کاراکتر باشد"),
  description: yup.string().nullable(),
  price: yup
    .number()
    .typeError("قیمت باید عدد باشد")
    .required("قیمت ضروری است"),
  order: yup
    .number()
    .typeError("ترتیب باید عدد باشد")
    .required("ترتیب ضروری است"),
  category: yup.string().required("دسته بندی ضروری است"),
  image: yup
    .mixed()
    .test("required", "عکس آیتم ضروری است", function (value) {
      if (!this.options.context?.editMode && !value) return false;
      return true;
    })
    .test("fileType", "فقط فرمت های jpeg و jpg مجاز هستند", (value) => {
      if (!value) return true;
      return (
        value.type === "image/jpeg" ||
        value.type === "image/jpg" ||
        value.type === "image/png"
      );
    })
    .test("fileSize", "حجم فایل نباید بیش از 20 مگابایت باشد", (value) => {
      if (!value) return true;
      return value.size <= 20 * 1024 * 1024;
    }),
});

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
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(itemSchema),
    context: { editMode: Boolean(editId) },
  });

  useEffect(() => {
    if (editId) {
      reset({
        name: itemToEdit.name,
        description: itemToEdit.description,
        category: itemToEdit.category._id,
        price: itemToEdit.price,
        order: itemToEdit.order,
      });
    }
  }, [reset, editId, itemToEdit]);

  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  const itemImagePreview = selectedFile
    ? URL.createObjectURL(selectedFile)
    : itemToEdit.image
    ? `${BASE_URL}/${itemToEdit.image}`
    : null;

  const onSubmit = async (data) => {
    const formData = new FormData();
    const selectedCategory = categories?.find(
      (category) => category._id === data.category
    );

    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("category", selectedCategory.name);
    formData.append("price", data.price);
    formData.append("order", data.order);

    if (editId) {
      await editItem(
        { id: editId, newItem: formData },
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
          onClose();
          reset();
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
            errors={errors}
            required
          />
        </div>

        <div className="flex flex-col w-[80%]">
          <InputTextField
            label="توضیحات"
            name="description"
            register={register}
            errors={errors}
            required
          />
        </div>

        <div className="flex flex-col w-[80%]">
          <InputTextField
            label="قیمت"
            name="price"
            type="number"
            register={register}
            errors={errors}
            required
          />
        </div>

        <div className="flex flex-col w-[80%]">
          <InputTextField
            label="ترتیب"
            name="order"
            type="number"
            register={register}
            errors={errors}
            required
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
            render={({ field: { onChange, ref } }) => (
              <input
                type="file"
                name="image"
                accept="image/jpeg, image/jpg, image/png"
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
              {errors.image.message}
            </span>
          )}
        </div>

        <div className="flex flex-col w-[80%]">
          {isLoading ? (
            <ThreeDotsLoading />
          ) : (
            <CategoriesSelectOption
              name="category"
              register={register}
              errors={errors}
              required
            />
          )}
        </div>

        <div className="w-[80%] mt-2">
          <button
            type="submit"
            disabled={!isValid || isCreating || isEditing}
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
