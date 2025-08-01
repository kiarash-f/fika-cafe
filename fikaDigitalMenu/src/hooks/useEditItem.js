import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editItemApi } from "../services/ItemsService";
import toast from "react-hot-toast";

export default function useEditItem() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutateAsync: editItem } = useMutation({
    mutationFn: editItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error?.message),
  });
  return { isEditing, editItem };
}
