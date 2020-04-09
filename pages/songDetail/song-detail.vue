<template>
	<view class="container">
		<view class="background" scroll-y="true" v-bind:style="{ background:'#FFFFFF url(' + playingSong.cover + '?param=200y200) no-repeat center center', backgroundSize: 'cover'}">
			<view class="detail">
				<h1>{{playingSong.artist}}</h1>
				<view class="cover">
					<image :src="playingSong.cover+'?param=200y200'" mode="aspectFill"></image>
				</view>
				<view class="lyric" scroll-y="true">
					<text>{{lyric}}</text>
				</view>
				<view>
					<song-list title="猜你喜欢" :songList="similarSong"></song-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLyric,
		getSimilarSong,
		getSongDetail
	} from "@/api/song.js"
	import songList from "@/components/song-list.vue"
	import {
		mapState
	} from "vuex"
	export default {
		components: {
			songList
		},
		data() {
			return {
				lyric: "",
				similarSong: []
			};
		},
		computed: mapState(['playingSong']),
		async onLoad() {
			await this.init(this.playingSong);
		},
		methods: {
			async getLyric(id) {
				let res = await getLyric(id);
				if (res.hasOwnProperty('lrc')) {
					this.lyric = res.lrc.lyric.replace(/[\[d{2}:d{2}\.\d{3}\]]/g, "");
				}
			},
			async getSimilarSong(id) {
				let res = await getSimilarSong(id);
				if (res.songs.length > 1) {
					let ids = res.songs.map(item => {
						return item.id;
					});
					let covers = await this.getCover(ids.join(","));
					this.similarSong = res.songs.map((item, index) => {
						let artist = [];
						let artistId = item.artists[0].id;
						for (const ar of item.artists) {
							artist.push(ar.name);
						}
						return {
							id: item.id,
							name: item.name,
							artist: artist.join("/"),
							artistId: artistId,
							cover: covers[index],
							albumName: item.album.name,
							albumId: item.album.id,
							theme: [255, 255, 255]
						};
					});
				}
			},
			async getCover(data) {
				let res = await getSongDetail(data);
				let covers = res.songs.map(item => {
					return item.al.picUrl;
				});
				return covers;
			},
			async init(song) {
				uni.setNavigationBarTitle({
					title: this.playingSong.name
				})
				await this.getLyric(song.id);
				await this.getSimilarSong(song.id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
	}

	.background {
		width: 100%;
		height: 100%;
	}

	.detail {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #000000, $alpha: 0.9);
		color: #fafafa;

		h1 {
			text-align: center;
			color: $uni-text-color-grey;
		}

		.cover {
			margin: 20px 0;

			image {
				width: 200px;
				height: 200px;
				border-radius: 10px;
			}
		}

		.lyric {
			height: 150px;
			margin: 0 aoto;
			overflow: scroll;
			text-align: center;
			color: $uni-text-color-grey;
		}
	}
</style>
