<template>
	<view class="container">
		<span class="title" @tap="goRankingDetail(0)">{{title}}</span>
		<view class="ranking" @tap="goRankingDetail(0)">
			<span class="ranking-title">飙升榜</span>
			<ol>
				<li v-for="(item,index) in rankingRisingTracks.tracks" :key="item.id">{{index+1}}. {{item.name}} - <span>{{item.artist}}</span></li>
			</ol>
			<image :src="rankingRisingTracks.cover+'?param=200y200'" mode="aspectFill" class="cover"></image>
		</view>
		<view class="ranking" @tap="goRankingDetail(1)">
			<span class="ranking-title">热歌榜</span>
			<ol>
				<li v-for="(item,index) in rankingHotTracks.tracks" :key="item.id">{{index+1}}. {{item.name}} - <span>{{item.artist}}</span></li>
			</ol>
			<image :src="rankingHotTracks.cover+'?param=200y200'" mode="aspectFill" class="cover"></image>
		</view>
		<view class="ranking" @tap="goRankingDetail(2)">
			<span class="ranking-title">新歌榜</span>
			<ol>
				<li v-for="(item,index) in rankingNewSongTracks.tracks" :key="item.id">{{index+1}}. {{item.name}} - <span>{{item.artist}}</span></li>
			</ol>
			<image :src="rankingNewSongTracks.cover+'?param=200y200'" mode="aspectFill" class="cover"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		props: {
			title: {
				required: true,
				type: String
			},
			rankingRising: {
				required: true,
				type: Object
			},
			rankingHot: {
				required: true,
				type: Object
			},
			rankingNewSong: {
				required: true,
				type: Object
			},
			rankingRisingTracks: {
				required: true,
				type: Object
			},
			rankingHotTracks: {
				required: true,
				type: Object
			},
			rankingNewSongTracks: {
				required: true,
				type: Object
			}
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations(['setRanking']),
			goRankingDetail(idx) {
				uni.navigateTo({
					url: '/pages/ranking/ranking',
					success: res => {
						if (idx === 0) {
							this.setRanking(this.rankingRising);
						} else if (idx === 1) {
							this.setRanking(this.rankingHot);
						} else if (idx === 2) {
							this.setRanking(this.rankingNewSong);
						}
					},
					fail: (e) => {
						console.log(e);
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		position: relative;
		width: 100%;
		padding: 10px 0;
	}

	.title {
		font-weight: bold;
		margin-left: 10px;
	}

	.ranking {
		position: relative;
		height: 93px;
		margin: 10px;
		padding: 15px 10px;
		background-color: #f6f6f6;
		border-radius: 10rpx;
		white-space: nowrap;

		&-title {
			font-size: 14px;
		}

		li {
			font-size: 12px;
			max-width: 60%;
			line-height: 2em;
			letter-spacing: 1px;
			overflow: hidden;
			text-overflow: ellipsis;

			span {
				padding-left: 8rpx;
				color: $uni-text-color-grey;
			}
		}

		image {
			width: 123px;
			height: 123px;
			position: absolute;
			top: 0;
			right: 0;
			border-radius: 0 5px 5px 0;
		}
	}
</style>
