import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoryApi } from "../services/CategoryService";
import toast from "react-hot-toast";

export default function useCreateCategory() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutateAsync: createCategory } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  return { isCreating, createCategory };
}
