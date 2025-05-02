import toast from "react-hot-toast";
import useCategories from "../hooks/useCategories";
import { ThreeDotsLoading } from "./Loading";

function CategoriesSelectOption({
  name,
  required,
  register,
  validationSchema,
  errors,
}) {
  const { categories, error, isError, isLoading } = useCategories();

  if (isLoading) return <ThreeDotsLoading />;
  if (isError)
    return toast.error(error?.response?.data?.message || error?.message);

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block mb-1 text-neutral-200 text-right">
        دسته بندی {required && <span className="text-red-600">*</span>}
      </label>
      <select
        name={name}
        id={name}
        {...register(name, validationSchema)}
        className="inputTextField"
      >
        {categories.map((category) => (
          <option value={category._id} key={category._id} className="">
            {category.name}
          </option>
        ))}
        {errors && errors[name] && errors[name].message && (
          <span className="text-red-600 block text-sm mt-2">
            {errors[name]?.message}
          </span>
        )}
      </select>
    </div>
  );
}

export default CategoriesSelectOption;
