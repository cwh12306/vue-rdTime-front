import { request } from "$network/request";

export function getMediaResource(pageSize, pageNumber) {
  return request({
    url: "/tb/getMediaResource",
    params: { pageSize, pageNumber },
  });
}
export function getDetail(id) {
  return request({
    url: "/tb/getDetail",
    params: { id },
  });
}
