import { request } from "$network/request";

export function getUser(email, password, switchLogin) {
  return request({
    url: "/tb/getUser",
    params: { email, password, switchLogin },
  });
}
