import { useQuery } from "@tanstack/react-query";
import getAllCategoriesApi from "../services/CategoryService";

export default function useCategories() {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesApi,
  });

  const categories = data?.categories || [];
  return { categories, isLoading, isError, error };
}
