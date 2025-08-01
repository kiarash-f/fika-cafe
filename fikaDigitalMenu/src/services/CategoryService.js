import http from "./httpService";

export default function getAllCategoriesApi() {
  return http.get("/category").then(({ data }) => data.data);
}

export function getCategoryApi(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}

export function deleteCategoryApi(id) {
  return http.delete(`/category/${id}`).then(({ data }) => data.data);
}

export function editCategoryApi({ id, newCategory }) {
  const isFormData = newCategory instanceof FormData;
  return http
    .patch(`/category/${id}`, newCategory, {
      headers:
        isFormData && newCategory.has("image")
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    })
    .then(({ data }) => data.data);
}

export function createCategoryApi(newCategory) {
  return http
    .post("/category", newCategory, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}
