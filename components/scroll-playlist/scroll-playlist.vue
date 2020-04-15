<template>
	<view class="container">
		<span class="title">{{title}}</span>
		<scroll-view scroll-x="true" class="scrollx">
			<view v-for="item in playlist" :key="item.id" class="playlist" @tap="goPlaylistDetail(item.id)">
				<view class="playlist-cover">
					<image :src="item.picUrl+'?param=100y100'" mode="aspectFill" lazy-load="true"></image>
				</view>
				<p>{{item.name}}</p>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		props: {
			title: {
				required: true,
				type: String
			},
			playlist: {
				required: true,
				type: Array
			}
		},
		data() {
			return {

			};
		},
		methods:{
			goPlaylistDetail(id){
				uni.navigateTo({
					url: '/pages/playlistDetail/playlist-detail?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		width: 100%;
		padding: 10px 10px;
	}

	.title {
		font-weight: bold;
	}
	
	.scrollx {
		width: 100%;
		white-space: nowrap;
	}

	.playlist {
		display: inline-block;
		margin-top: 20rpx;
		margin-right: 20rpx;
		width: 200rpx;
		font-size: 12px;
		overflow: hidden;

		&-cover {
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
