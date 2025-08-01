import http from "./httpService";

export default function getItemsApi() {
  return http.get("/items").then(({ data }) => data.data);
}

export function createItemApi(newItem) {
  return http.post("/items", newItem).then(({ data }) => data.data);
}

export function editItemApi({ id, newItem }) {
  return http.patch(`/items/${id}`, newItem).then(({ data }) => data.data);
}

export function deleteItemApi(itemId) {
  return http.delete(`/items/${itemId}`).then(({ data }) => data.data);
}
