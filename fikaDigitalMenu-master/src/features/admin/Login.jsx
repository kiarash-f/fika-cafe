import useAuth from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeDotsLoading } from "../../ui/Loading";

function Login({ setIsLoginOpen }) {
  const { getLoggedIn, isLoggedIn } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnMount: true,
    onSubmit: async (values) => {
      await getLoggedIn({ email: values.email, password: values.password });
      setIsLoginOpen(false);
    },
    validationSchema: Yup.object({
      email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامیست"),
      password: Yup.string()
        .min(8, "کلمه عبور باید حداقل ۸ کاراکتر باشد")
        .required("کلمه عبور الزامیست"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex items-center flex-col gap-y-3">
        <div className="flex flex-col w-[80%]">
          <label
            htmlFor="email"
            className="text-white text-right text-2xl mb-1"
          >
            ایمیل
          </label>
          <input
            type="text"
            className="rounded-xl text-gray-900 border border-gray-100 bg-gray-100 hover:border-blue-500 focus:border-blue-500 focus:bg-gray-50 transition-all duration-300 ease-out focus:shadow-md py-1.5 focus:shadow-sky-500 font-sans"
            {...formik.getFieldProps("email")}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-sm mt-1 font-bold text-red-600">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="flex flex-col w-[80%]">
          <label
            htmlFor="password"
            className="text-white mb-1 text-right text-2xl"
          >
            کلمه عبور
          </label>
          <input
            type="password"
            className="rounded-xl text-gray-900 border border-gray-100 bg-gray-100 hover:border-blue-500 focus:border-blue-500 focus:bg-gray-50 transition-all duration-300 ease-out focus:shadow-md py-1.5 focus:shadow-sky-500 font-sans"
            {...formik.getFieldProps("password")}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-sm mt-1 font-bold text-red-600">
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className="w-[80%] mt-4">
          <button
            type="submit"
            className="w-full px-4 py-1.5 mb-4 text-3xl rounded-xl transition-all duration-300 bg-cobalt-blue text-white hover:bg-blue-800 cursor-pointer"
            disabled={!formik.isValid}
          >
            {isLoggedIn ? <ThreeDotsLoading /> : "ورود"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
