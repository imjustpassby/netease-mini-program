<template>
	<view class="container">
		<p class="title">网友精选歌单</p>
		<view class="g-container">
			<view class="g-item" v-for="item in playlists" :key="item.id" @tap="goPlaylistDetail(item.id)">
				<view class="playlist-cover">
					<image :src="item.coverImgUrl+'?param=200y200'" mode="aspectFill" lazy-load="true"></image>
				</view>
				<view class="playlist-detail">
					<h2>{{item.name? item.name : ""}}</h2>
					<p>{{item.trackCount? item.trackCount : ""}}首 - {{item.creator ? item.creator:  ""}} </p>
				</view>
			</view>
		</view>
		<p class="load-more" @tap="loadMore()">点击加载更多</p>
	</view>

</template>

<script>
	import {
		getPlayList
	} from "@/api/playList.js"
	export default {
		data() {
			return {
				cat: "全部",
				offset: 0,
				playlists: []
			}
		},
		computed: {
			count() {
				return this.playlists.length;
			}
		},
		async onLoad() {
			await this.getPlayList()
		},
		methods: {
			async getPlayList() {
				let res = await getPlayList({
					cat: this.cat,
					offset: this.offset++
				});
				let playlistFmt = res.playlists.map(item => {
					return {
						coverImgUrl: item.coverImgUrl,
						name: item.name,
						id: item.id,
						creator: item.creator.nickname,
						trackCount: item.trackCount
					};
				});
				this.playlists = this.playlists.concat(playlistFmt);
			},
			async loadMore() {
				await this.getPlayList();
			},
			goPlaylistDetail(id) {
				uni.navigateTo({
					url: '/pages/playlistDetail/playlist-detail?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		min-height: 100vh;

		.title {
			margin: 40rpx 20rpx 20rpx 20rpx;
			font-weight: bold;
		}
	}

	.load-more {
		text-align: center;
		color: $uni-text-color-grey;
		margin: 40rpx 0;
		font-size: 12px;
	}


	.g-container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		overflow: hidden;
	}

	.g-item {
		position: relative;
		width: 48%;
		margin: 10upx 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		.playlist-cover {
			width: 100%;
			position: relative;
			height: 0;
			padding-bottom: 100%;

			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}

		.playlist-detail {
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
</style>
