import { useQuery } from "@tanstack/react-query";
import getItemsApi from "../services/ItemsService";

export default function useItems() {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: getItemsApi,
  });

  const items = data?.item || [];
  return { items, isLoading, isError, error };
}
