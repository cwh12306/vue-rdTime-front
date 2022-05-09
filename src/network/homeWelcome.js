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

export function getNewReply(uid) {
  return request({
    url: "/tb/getNewReply",
    params: { uid },
  });
}
export function getCommentAndReply(uid) {
  return request({
    url: "/tb/getCommentAndReply",
    params: { uid },
  });
}
