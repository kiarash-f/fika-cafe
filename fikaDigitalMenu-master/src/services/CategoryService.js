import http from "./httpService";

export default function getAllCategoriesApi() {
  return http.get("/category").then(({ data }) => data.data);
}
