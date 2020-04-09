<template>
	<view class="container">
		<h1>{{ranking.title}}</h1>
		<uni-list>
			<uni-list-item v-for="(item,index) in ranking.tracks" :key="item.id" class="list-item" @tap="playSong(item)">
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
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		getSongUrl
	} from "@/api/song.js"
	export default {
		data() {
			return {
				list:[]
			};
		},
		computed: {
			...mapState(['ranking'])
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.ranking.title
			})
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
.container{
	width: 100%;
	min-height: 100vh;
	h1{
		font-weight: bold;
		margin: 20px;
	}
}
.list-item{
	display: flex;
	flex-direction: row;
	height: 60px;
	font-size: 14px;
	overflow: hidden;
	&-index{
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
		text-overflow: ellipsis;
		p{
			white-space: nowrap;
		}
	}
}
</style>
