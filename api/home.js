import {request} from '../util/request.js'

/* banner */
export function getBanner() {
  return request({
    url: '/banner',
    withCredentials: true
  }) 
}
/* 推荐mv */
export function getPersonalizedMv() {
  return request({
    url: '/personalized/mv',
    withCredentials: true
  })
}
/* 推荐歌单 */
export function getPersonalized() {
  return request({
    url: '/personalized',
    withCredentials: true
  })
}
/* 推荐新音乐 */
export function getPersonalizedNewSong() {
  return request({
    url: '/personalized/newsong',
    withCredentials: true
  })
}
/* 推荐电台 */
export function getPersonalizedDJProgram() {
  return request({
    url: '/personalized/djprogram',
    withCredentials: true
  })
}
/* 独家放送 */
export function getPersonalizedPrivateContent() {
  return request({
    url: '/personalized/privatecontent',
    withCredentials: true
  })
}