<template>
	<view class="content">
		<song-list title="新歌速递" :songList="newSong.slice(0,6)"></song-list>
		<scroll-playlist title="热门歌单" :playlist="personalized.slice(0,10)"></scroll-playlist>
		<ranking-list title="巅峰榜" :rankingHotTracks="rankingHotTracks" :rankingRisingTracks="rankingRisingTracks"
		 :rankingNewSongTracks="rankingNewSongTracks" :rankingHot="rankingHot" :rankingRising="rankingRising" :rankingNewSong="rankingNewSong"></ranking-list>
		</ranking-list>
	</view>
</template>

<script>
	import songList from "@/components/song-list.vue"
	import scrollPlaylist from "@/components/scroll-playlist.vue"
	import rankingList from "@/components/ranking-list.vue"
	import {
		getPersonalizedNewSong,
		getPersonalized
	} from "@/api/home.js"
	import {
		getRankingList
	} from "@/api/ranking.js"
	export default {
		components: {
			songList,
			scrollPlaylist,
			rankingList
		},
		data() {
			return {
				newSong: [],
				personalized: [],
				rankingHot: {},
				rankingHotTracks: {},
				rankingRising: {},
				rankingRisingTracks: {},
				rankingNewSong: {},
				rankingNewSongTracks: {}
			};
		},
		async onLoad() {
			await this.getNewSong();
			await this.getPersonalized();

			this.rankingRising = await this.getRanking("3");
			this.rankingRisingTracks.tracks = this.rankingRising.tracks.slice(0, 3);
			this.rankingRisingTracks.cover = "http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg";
			this.rankingRising.title = "飙升榜";

			this.rankingHot = await this.getRanking("1");
			this.rankingHotTracks.tracks = this.rankingHot.tracks.slice(0, 3);
			this.rankingHotTracks.cover = "http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg";
			this.rankingHot.title = "热歌榜";

			this.rankingNewSong = await this.getRanking("0");
			this.rankingNewSongTracks.tracks = this.rankingNewSong.tracks.slice(0, 3);
			this.rankingNewSongTracks.cover = "http://p2.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg";
			this.rankingNewSong.title = "新歌榜";
		},
		methods: {
			//新歌速递
			async getNewSong() {
				let personalizedNewSong = await getPersonalizedNewSong();
				this.newSong = personalizedNewSong.result.map(item => {
					let artist = [];
					let artistId = item.song.artists.map(a => {
						return a.id
					});
					for (const ar of item.song.artists) {
						artist.push(ar.name);
					}
					return {
						name: item.name,
						id: item.id,
						artist: artist.join("/"),
						artists: artist,
						artistId: artistId,
						cover: item.song.album.blurPicUrl,
						albumName: item.song.album.name,
						albumId: item.song.album.id,
						theme: [255, 255, 255]
					};
				});
			},
			//热门歌单
			async getPersonalized() {
				let result = await getPersonalized();
				this.personalized = result.result;
			},
			//获取某个排行榜
			async getRanking(idx) {
				let res = await getRankingList(idx);
				let rankDetail = {
					id: res.playlist.id,
					tracks: [],
					picUrl: res.playlist.coverImgUrl
				};
				rankDetail["tracks"] = res.playlist.tracks.map(item => {
					let artist = [];
					let artistId = item.ar.map(a => {
						return a.id;
					});
					for (const ar of item.ar) {
						artist.push(ar.name);
					}
					return {
						name: item.name,
						id: item.id,
						artist: artist.join("/"),
						artists: artist,
						artistId: artistId,
						cover: item.al.picUrl,
						albumName: item.al.name,
						albumId: item.al.id,
						key: item.id,
						theme: [255, 255, 255]
					};
				});
				return rankDetail;
			},
			//飙升榜
		}
	};
</script>

<style scoped>
	.content {
		width: 100%;
	}
</style>
