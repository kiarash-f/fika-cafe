function InputTextField({
  label,
  name,
  register,
  type = "text",
  required,
  validationSchema,
  errors,
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-neutral-200 text-right">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        id={name}
        {...register(name, validationSchema)}
        className="inputTextField"
        autoComplete="off"
      />
      {errors && errors[name] && errors[name].message && (
        <span className="text-red-600 block text-sm mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default InputTextField;
