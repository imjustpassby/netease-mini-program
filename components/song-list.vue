<template>
	<view class="container">
		<span class="title">{{title}}</span>
		<uni-list class="list">
			<uni-list-item v-for="item in songList" :key="item.id" class="list-item" @tap="playSong(item)">
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
</template>

<script>
	import {
		getSongUrl
	} from "@/api/song.js"
	import {
		mapMutations
	} from 'vuex'
	export default {
		props: {
			title: {
				type: String,
				required: true
			},
			songList: {
				type: Array,
				required: true
			}
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations(['setPlayingSong']),
			async playSong(song) {
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route;
				if (curRoute != "pages/songDetail/song-detail") {
					uni.navigateTo({
						url: '/pages/songDetail/song-detail',
						success: r => {
							this.getUrl(song);
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					this.getUrl(song);
				}
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
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
