import {request} from "@/util/request.js";
/* 获取歌曲URL */
export function getSongUrl(data) {
	return request({
		url: '/song/url',
		withCredentials: true,
		params: {
			id: data
		}
	})
}
/* 获取歌词 */
export function getLyric(data) {
	return request({
		url: '/lyric',
		withCredentials: true,
		params: {
			id: data
		}
	})
}
/* 音乐是否可用 */
export function checkMusic(data) {
	return request({
		url: '/check/music',
		withCredentials: true,
		params: {
			id: data
		}
	})
}
/* 歌曲评论 */
export function getCommentMusic(data) {
	return request({
		url: '/comment/music',
		withCredentials: true,
		params: {
			id: data,
			limit: 30
		}
	})
}
/* 获取相似歌曲 */
export function getSimilarSong(data) {
	return request({
		url: '/simi/song',
		withCredentials: true,
		params: {
			id: data
		}
	})
}
/* 获取歌曲详情 */
export function getSongDetail(data) {
	return request({
		url: '/song/detail',
		withCredentials: true,
		params: {
			ids: data
		}
	})
}
