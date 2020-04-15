<template>
	<view class="comment">
		<span class="title">热门评论</span>
		<uni-list class="list">
			<uni-list-item v-for="item in hotComments" :key="item.id" class="list-item">
				<view class="song-album">
					<image :src="item.user.avatarUrl+'?param=50y50'" mode="aspectFill" lazy-load="true"></image>
				</view>
				<view class="song-detail">
					<h2>{{item.user.nickname}}</h2>
					<p>{{item.content}}</p>
				</view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		props: {
			hotComments: {
				required: true,
				type: Array
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment {
		width: 95vw;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		position: relative;
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
						border-radius: 50%;
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
