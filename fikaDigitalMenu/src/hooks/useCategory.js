import { useQuery } from "@tanstack/react-query";
import { getCategoryApi } from "../services/CategoryService";

export default function useCategory(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryApi(id),
    enabled: !!id,
  });

  const category = data?.category || [];
  return { category, isLoading, isError, error };
}
