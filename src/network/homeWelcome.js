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

export function getEnglish() {
  return request({
    url: "/tb/getEnglish",
  });
}

export function getEnglishDetail(id) {
  return request({
    url: "/tb/getEnglishDetail",
    params: { id },
  });
}

export function getTeacherById(id) {
  return request({
    url: "/tb/getTeacherById",
    params: { id },
  });
}

export function getSubject(subject) {
  return request({
    url: "/tb/getSubject",
    params: { subject },
  });
}
