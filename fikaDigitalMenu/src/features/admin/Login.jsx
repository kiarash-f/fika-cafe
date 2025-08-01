import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { ThreeDotsLoading } from "../../ui/Loading";

function Login({ setIsLoginOpen }) {
  const { getLoggedIn, isLoggedIn } = useAuth();

  const schema = Yup.object().shape({
    email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامیست"),
    password: Yup.string()
      .min(8, "کلمه عبور باید حداقل ۸ کاراکتر باشد")
      .required("کلمه عبور الزامیست"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    await getLoggedIn(data);
    setIsLoginOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center flex-col gap-y-3 font-arsoo">
        <div className="flex flex-col w-[80%]">
          <label htmlFor="email" className="text-right text-lg mb-1">
            ایمیل
          </label>
          <input
            type="text"
            className="rounded-xl text-gray-900 border border-gray-100 bg-gray-100 hover:border-blue-500 focus:border-blue-500 focus:bg-gray-50 transition-all duration-300 ease-out focus:shadow-md py-1.5 focus:shadow-sky-500 font-sans"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-sm mt-1 font-bold text-red-600">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="flex flex-col w-[80%]">
          <label htmlFor="password" className="mb-1 text-right text-lg">
            کلمه عبور
          </label>
          <input
            type="password"
            className="rounded-xl text-gray-900 border border-gray-100 bg-gray-100 hover:border-blue-500 focus:border-blue-500 focus:bg-gray-50 transition-all duration-300 ease-out focus:shadow-md py-1.5 focus:shadow-sky-500 font-sans"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-sm mt-1 font-bold text-red-600">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="w-[80%] my-4">
          <button
            type="submit"
            className="w-full px-4 py-1.5 text-2xl rounded-xl transition-all duration-300 bg-cobalt-blue hover:bg-blue-800 cursor-pointer"
            disabled={!isValid}
          >
            {isLoggedIn ? <ThreeDotsLoading /> : "ورود"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
