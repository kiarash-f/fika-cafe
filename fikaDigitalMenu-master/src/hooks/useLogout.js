import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../services/userService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoggedOut, mutateAsync: getLoggedOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      Cookies.remove("token");
      toast.success("Sara, از حساب خود خارج شدید");
      navigate("/", { replace: true });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error?.message),
  });

  return { isLoggedOut, getLoggedOut };
}
