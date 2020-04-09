import {request} from "@/util/request.js"
const mem = require("mem");
/*歌单分类（全部）  */
export function getPlayListCatlist() {
  return request({
    url: '/playlist/catlist',
    withCredentials: true
  })
}
/*获取歌单 ( 网友精选碟 )  */
export function getPlayList(data) {
  return request({
    url: '/top/playlist',
    withCredentials: true,
    params: {
      limit: 20,
      cat: data.cat ? data.cat : '',
      offset: data.offset ? data.offset : 0
    }
  })
}
/* 获取歌单详情 */
export function getPlaylistDetail(data) {
  return request({
    url: '/playlist/detail',
    withCredentials: true,
    params: {
      id: data
    }
  })
}