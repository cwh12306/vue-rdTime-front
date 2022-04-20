import { request } from "$network/request";

export function getOneUser(email) {
  return request({
    url: "/tb/validateEmail",
    params: { email },
  });
}

export function register(email, password, username) {
  return request({
    url: "/tb/register",
    params: { email, password, username },
  });
}
