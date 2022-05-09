import { request } from "$network/request";

export function addComment(uid, comment, eid) {
  return request({
    url: "/tb/addComment",
    params: { uid, comment, eid },
  });
}

export function getComments(eid, pageNumber, pageSize) {
  return request({
    url: "/tb/getComments",
    params: { eid, pageNumber, pageSize },
  });
}
export function addReply(uid, reply, cid, eid) {
  return request({
    url: "/tb/addReply",
    params: { uid, reply, cid, eid },
  });
}

export function getReplys(eid) {
  return request({
    url: "/tb/getReplys",
    params: { eid },
  });
}

export function delReply(id) {
  return request({
    url: "/tb/delReply",
    params: { id },
  });
}

export function delComment(id) {
  return request({
    url: "/tb/delComment",
    params: { id },
  });
}
