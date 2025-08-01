import http from "./httpService";

export function loginApi(data) {
  return http.post("/user/signin", data).then(({ data }) => data);
}

export function logoutApi() {
  return http.post("/user/signout").then(({ data }) => data.data);
}
