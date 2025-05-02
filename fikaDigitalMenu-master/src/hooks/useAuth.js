import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function useAuth() {
  const navigate = useNavigate();

  const { isPending: isLoggedIn, mutateAsync: getLoggedIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      Cookies.set("token", data?.token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      if (data.token) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      toast.success(`${data?.data?.user?.name}، خوش آمدید!`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  return { isLoggedIn, getLoggedIn };
}
