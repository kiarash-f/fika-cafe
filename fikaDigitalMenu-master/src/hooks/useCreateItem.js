import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItemApi } from "../services/ItemsService";
import toast from "react-hot-toast";

export default function useCreateItem() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync: createItem } = useMutation({
    mutationFn: createItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error?.message),
  });

  return { isCreating, createItem };
}
