<template>
	<view class="container">
		<view class="background" v-bind:style="{ background:'#FFFFFF url(' + playList.picUrl + ') no-repeat center center', backgroundSize: 'cover'}">
			<view class="detail">
				<view class="cover">
					<image :src="playList.picUrl" mode="aspectFill" lazy-load="true"></image>
				</view>
				<view class="info">
					<p>{{playList.name}}</p>
					<p>标签：<span v-for="t in playList.tags" :key="t">{{t}}</span></p>
					<p>by：{{playList.creator.nickname}}</p>
					<p>最近更新：{{playList.createTime}}</p>
				</view>
			</view>
		</view>
		<view>
			<uni-list>
				<uni-list-item v-for="(item,index) in playList.tracks" :key="item.id" class="list-item" @tap="playSong(item)">
					<view class="list-item-index">
						{{index+1}}
					</view>
					<view class="list-item-detail">
						<p>{{item.name}}</p>
						<p style="color: #999;">{{item.artist}} - {{item.albumName}}</p>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		formatTime
	} from "@/util/utils.js"
	import {
		getPlaylistDetail
	} from "@/api/playList.js"
	import {
		getSongUrl
	} from "@/api/song.js"
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				playList: {
					id: "",
					creator: {
						nickname: ""
					},
					createTime: "",
					trackIds: [],
					tracks: [],
					tags: [],
					picUrl: "",
					name: "",
					description: ""
				},
			};
		},
		async onLoad(e) {
			await this.getListDetail(e.id);
		},
		methods: {
			...mapMutations(['setPlayingSong']),
			async getListDetail(data) {
				//获取歌单信息
				let res = await getPlaylistDetail(data);
				this.playList.id = res.playlist.id;
				this.playList.creator = res.playlist.creator;
				this.playList.createTime = formatTime(
					res.playlist.createTime,
					"{y}-{m}-{d}"
				);
				this.playList.trackIds = res.playlist.trackIds;
				this.playList.tracks = res.playlist.tracks.map(item => {
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
				this.playList.tags = res.playlist.tags;
				this.playList.picUrl = res.playlist.coverImgUrl;
				this.playList.name = res.playlist.name;
				this.playList.description = res.playlist.description;
			},
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
		width: 100vw;
		height: 220px;
	}

	.background {
		width: 100%;
		height: 100%;
		margin-bottom: 20px;
		overflow: hidden;
	}

	.detail {
		height: 2520px;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #000000, $alpha: 0.5);
		color: #fafafa;

		.cover {
			margin: 30px 20px 20px 20px;
			width: 30%;

			image {
				width: 100px;
				height: 100px;
			}
		}

		.info {
			margin-top: 30px;
			width: 60%;

			p {
				margin-bottom: 10px;
			}
		}
	}

	.list-item {
		display: flex;
		flex-direction: row;
		height: 60px;
		font-size: 14px;
		overflow: hidden;

		&-index {
			width: 50px;
			height: 50px;
			line-height: 50px;
			text-align: center;
		}

		&-detail {
			height: 50px;
			line-height: 25px;
			max-width: 80%;
			overflow: hidden;

			p {
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
