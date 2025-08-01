import { Controller, useForm } from "react-hook-form";
import InputTextField from "../../../ui/InputTextField";
import { useEffect, useState } from "react";
import useCreateCategory from "../../../hooks/useCreateCategory";
import useEditCategory from "../../../hooks/useEditCategory";
import { BASE_URL } from "../../../ui/HomePageLayout";
import toast from "react-hot-toast";
import { ThreeDotsLoading } from "../../../ui/Loading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup Validation Schema
const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required("عنوان ضروری است")
    .min(2, "عنوان حداقل باید 2 کاراکتر باشد"),
  order: yup
    .number()
    .typeError("ترتیب باید عدد باشد")
    .required("ترتیب ضروری است"),
  image: yup
    .mixed()
    .test("required", "عکس دسته بندی ضروری است", function (value) {
      if (!this.options.context?.editMode && !value) return false;
      return true;
    })
    .test("fileType", "فقط فرمت‌های JPG، JPEG و PNG مجاز هستند", (value) => {
      if (!value) return true;
      return (
        value.type === "image/jpeg" ||
        value.type === "image/jpg" ||
        value.type === "image/png"
      );
    })
    .test("fileSize", "حجم فایل نباید بیشتر از 20 مگابایت باشد", (value) => {
      if (!value) return true;
      return value.size <= 20 * 1024 * 1024;
    }),
});

function CategoriesForm({ onClose, categoryToEdit = {} }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { createCategory, isCreating } = useCreateCategory();
  const { editCategory, isEditing } = useEditCategory();
  const { _id: editId } = categoryToEdit;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(categorySchema),
    context: { editMode: Boolean(editId) },
  });

  useEffect(() => {
    if (editId) {
      reset({
        name: categoryToEdit.name,
        order: categoryToEdit.order,
      });
    }
  }, [reset, editId, categoryToEdit]);

  const categoryImagePreview = selectedFile
    ? URL.createObjectURL(selectedFile)
    : categoryToEdit.image
    ? `${BASE_URL}/uploads/${categoryToEdit.image}`
    : null;

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    formData.append("name", data.name);
    formData.append("order", data.order);

    if (editId) {
      await editCategory(
        { id: editId, newCategory: formData },
        {
          onSuccess: () => {
            toast.success(`دسته بندی ${data.name} با موفقیت ویرایش شد`);
            onClose();
            reset();
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || error?.message);
          },
        }
      );
    } else {
      await createCategory(formData, {
        onSuccess: () => {
          toast.success(`دسته بندی ${data.name} با موفقیت ایجاد شد`);
          onClose();
          reset();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || error?.message);
        },
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
      <div className="flex flex-col items-center gap-y-3">
        <div className="flex flex-col w-[80%]">
          <InputTextField
            label="عنوان دسته بندی"
            name="name"
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
              بار گذاری عکس <span className="text-red-600">*</span>
            </label>
            {categoryImagePreview && (
              <div className="absolute left-2 top-[38px]">
                <img
                  src={categoryImagePreview}
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
              "ایجاد دسته بندی"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CategoriesForm;
