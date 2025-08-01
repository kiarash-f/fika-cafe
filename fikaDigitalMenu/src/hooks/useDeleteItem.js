import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItemApi } from "../services/ItemsService";
import toast from "react-hot-toast";

export default function useDeleteItem() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutateAsync: deleteItem } = useMutation({
    mutationFn: deleteItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error?.message),
  });

  return { isDeleting, deleteItem };
}
