import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategoryApi } from "../services/CategoryService";
import toast from "react-hot-toast";

export default function useEditCategory() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutateAsync: editCategory } = useMutation({
    mutationFn: editCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });
  return { isEditing, editCategory };
}
