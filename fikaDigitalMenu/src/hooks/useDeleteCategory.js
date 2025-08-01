import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryApi } from "../services/CategoryService";
import toast from "react-hot-toast";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutateAsync: deleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });
  return { isDeleting, deleteCategory };
}
