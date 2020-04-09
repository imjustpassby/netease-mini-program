import {request} from "@/util/request.js"

export function getSearchHot(){
	return request({
		url: "/search/hot/detail",
		withCredentials: true
	})
}

export function getSearchSuggest(data){
	return request({
		url: "/search/suggest",
		withCredentials: true,
		params: {
			keywords: data.keywords,
			type: "mobile"
		}
	})
}

/* 搜索 */
/*  type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 
    100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 
    1009: 电台, 1014: 视频, 1018:综合
*/
export function search(data) {
  return request({
    url: '/search',
    withCredentials: true,
    params: {
      keywords: data.keywords,
      limit: 100,
      offset: data.offset ? data.offset : 0,
      type: data.type ? data.type : 1018
    }
  })
}