import { request } from "$network/request";

export function updUsername(username, id) {
  return request({
    url: "/tb/changeUsername",
    params: { username, id },
  });
}
