import {request} from "@/util/request"
/* 歌曲评论 */
export function getCommentMusic(data) {
  return request({
    url: '/comment/music',
    withCredentials: true,
    params: {
      id: data,
      limit: 3
    }
  })
}
/* 获取mv评论 */
export function getCommentMv(data) { 
  return request({
    url: '/comment/mv',
    withCredentials: true,
    params: {
      id: data,
      limit: 3,
      offset: 0
    }
  })
}