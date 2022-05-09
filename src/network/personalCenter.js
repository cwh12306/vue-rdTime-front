import { request } from "$network/request";
//修改用户名
export function updUsername(username, id) {
  return request({
    url: "/tb/changeUsername",
    params: { username, id },
  });
}
export function getAvatar(id) {
  return request({
    url: "/tb/getAvatar",
    params: { id },
    responseType: "blob",
  });
}

export function delMediaResource(id) {
  return request({
    url: "/tb/delMediaResource",
    params: { id },
  });
}
