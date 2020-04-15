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
				<view class="simi">
					<span class="title">猜你喜欢</span>
					<uni-list class="list">
						<uni-list-item v-for="item in similarSong" :key="item.id" class="list-item" @tap="playSong(item)">
							<view class="song-album">
								<image :src="item.cover+'?param=50y50'" mode="aspectFill" lazy-load="true"></image>
							</view>
							<view class="song-detail">
								<h2>{{item.name}}</h2>
								<p>{{item.albumName}} - {{item.artist}}</p>
							</view>
						</uni-list-item>
					</uni-list>
				</view>
				<comment :hotComments="hotComments"></comment>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLyric,
		getSimilarSong,
		getSongDetail,
		getSongUrl
	} from "@/api/song.js"
	import {
		getCommentMusic
	} from "@/api/comment.js"
	import songList from "@/components/song-list/song-list.vue"
	import comment from "@/components/comment/comment.vue"
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		components: {
			songList,
			comment
		},
		data() {
			return {
				lyric: "",
				similarSong: [],
				hotComments: []
			};
		},
		computed: mapState(['playingSong']),
		async onLoad() {
			await this.init(this.playingSong);
		},
		methods: {
			...mapMutations(['setPlayingSong']),
			async getLyric(id) {
				let res = await getLyric(id);
				if (res.hasOwnProperty('lrc')) {
					this.lyric = res.lrc.lyric.replace(/[\[d{2}:d{2}\.\d{3}\]]/g, "");
				} else {
					this.lyric = "暂无歌词";
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
				await this.getLyric(this.playingSong.id);
				await this.getSimilarSong(this.playingSong.id);
				await this.getComments(this.playingSong.id);
			},
			async playSong(song) {
				await this.getUrl(song);
				await this.init(song);
			},
			async getUrl(song) {
				this.setPlayingSong(song);
				getSongUrl(song.id).then(res => {
					let songList = res.data.map(item => {
						return {
							url: item.url,
							id: item.id
						};
					});
					let url = songList[0].url;
					if (!url) {
						uni.showToast({
							title: '暂无版权',
							icon: 'none',
							mask: true,
						});
						return;
					}
					this.$bgAudioMannager.title = song.name;
					this.$bgAudioMannager.singer = song.artist;
					this.$bgAudioMannager.coverImgUrl = song.cover;
					this.$bgAudioMannager.src = url;
				}).catch(e => {
					console.log(e);
				});
			},
			async getComments(id) {
				let res = await getCommentMusic(id);
				res.hotComments.length > 0 ? this.hotComments = res.hotComments.slice(0, 3) : this.hotComments = res.comments;
			},
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

	.simi {
		width: 95vw;
		min-height: 366px;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-top: 20px;
		padding: 20rpx;
		overflow: hidden;

		.title {
			font-weight: bold;
		}

		.list {
			display: flex;
			flex-direction: column;

			&-item {
				margin-top: 20rpx;
				display: flex;
				flex-direction: row;

				.song-album {
					display: flex;
					align-items: flex-start;
					justify-content: center;

					image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 10rpx;
					}
				}

				.song-detail {
					padding: 10rpx 0 20rpx 20rpx;
					line-height: 1.3em;
					text-overflow: ellipsis;

					h2 {
						font-size: 14px;
					}

					p {
						font-size: 12px;
						font-weight: 200;
						color: $uni-text-color-grey;
					}
				}
			}
		}
	}
</style>
