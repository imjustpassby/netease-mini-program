<template>
	<view class="container">
		<view class="search-box">
			<mSearch class="mSearch-input-box" :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(keyword)"
			 @input="inputChange" @confirm="doSearch(keyword)" v-model="keyword"></mSearch>
		</view>
		<view class="search-keyword" v-if="searchResult.code!==200">
			<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<block v-for="(row,index) in keywordList" :key="index">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<view class="keyword-text" @tap.stop="doSearch(keywordList[index].keyword)">
							<rich-text :nodes="row.htmlStr"></rich-text>
						</view>
						<view class="keyword-img" @tap.stop="setKeyword(keywordList[index].keyword)">
							<image src="/static/img/HM-search/back.png"></image>
						</view>
					</view>
				</block>
			</scroll-view>
			<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="/static/img/HM-search/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword.toString())" :key="index">{{keyword}}</view>
					</view>
				</view>
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'/static/img/HM-search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<scroll-view class="search-result" scroll-y v-else>
			<uni-collapse>
				<uni-collapse-item title="单曲" open="true">
					<uni-list>
						<uni-list-item v-for="(item,index) in searchResult.songs" :key="item.id" class="list-item" @tap="playSong(item)">
							<view class="list-item-index">
								{{index+1}}
							</view>
							<view class="list-item-detail">
								<p>{{item.name}}</p>
								<p style="color: #999;">{{item.artists[0].name}} - {{item.album.name}}</p>
							</view>
						</uni-list-item>
						<uni-list-item>
							<p class="load-more" @tap="loadMore(1)">点击加载更多</p>
						</uni-list-item>
					</uni-list>
				</uni-collapse-item>
				<uni-collapse-item title="歌单" open="true">
					<uni-list class="playlist">
						<uni-list-item v-for="item in searchResult.playlists" :key="item.id" class="playlist-item" @tap="goPlaylistDetail(item.id)">
							<view class="playlist-cover">
								<image :src="item.coverImgUrl+'?param=50y50'" mode="aspectFill" lazy-load="true"></image>
							</view>
							<view class="playlist-detail">
								<h2>{{item.name? item.name : ""}}</h2>
								<p>{{item.trackCount? item.trackCount : ""}}首 - {{item.creator.nickname ? item.creator.nickname:  ""}} </p>
							</view>
						</uni-list-item>
						<uni-list-item>
							<p class="load-more" @tap="loadMore(1000)">点击加载更多</p>
						</uni-list-item>
					</uni-list>
				</uni-collapse-item>
			</uni-collapse>
		</scroll-view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import {
		getSearchHot,
		search
	} from "@/api/search.js"
	import {
		getSongUrl,
		getSongDetail
	} from "@/api/song.js"
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				searchResult: {
					code: 0,
					songs: [],
					playlists: []
				},
				songOffset: 0,
				playlistOffset: 0
			}
		},
		onLoad() {
			this.init();
		},
		components: {
			mSearch
		},
		methods: {
			...mapMutations(['setPlayingSong']),
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();

			},
			blur() {
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "默认关键字";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			async loadHotKeyword() {
				let res = await getSearchHot();
				this.hotKeywordList = res.data.map(item => {
					return item.searchWord;
				});
			},
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail ? event.detail.value : event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				// this.isShowKeywordList = true;
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setKeyword(index) {
				this.keyword = this.keywordList[index].keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			async doSearch(keyword) {
				if (keyword === "") return;
				this.keyword = keyword ? keyword : this.keyword;
				this.saveKeyword(this.keyword); //保存为历史 
				uni.showToast({
					title: "搜索 " + this.keyword + " ...",
					icon: 'loading',
					duration: 2000
				});
				this.searchResult.songs = [];
				this.searchResult.playlists = [];
				this.songOffset = 0;
				this.playlistOffset = 0;
				await this.loadMore(1,this.keyword);
				await this.loadMore(1000,this.keyword);
				this.searchResult.code = 200;
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			},
			async playSong(song) {
				await this.getUrl(song);
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route;
				uni.navigateTo({
					url: '/pages/songDetail/song-detail',
					success: r => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async getUrl(song) {
				let artist = [];
				for (const ar of song.artists) {
					artist.push(ar.name);
				}
				let cover = await this.getCover(song.id);
				let songFmt = {
					id: song.id,
					name: song.name,
					artist: artist.join("/"),
					cover: cover,
					albumName: song.album.name,
					albumId: song.album.id,
					theme: [255, 255, 255]
				};
				this.setPlayingSong(songFmt);
				let res = null;
				getSongUrl(songFmt.id).then(res => {
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
			async getCover(data) {
				let res = await getSongDetail(data);
				let song = res.songs[0];
				return song.al.picUrl;
			},
			goPlaylistDetail(id) {
				uni.navigateTo({
					url: '/pages/playlistDetail/playlist-detail?id=' + id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async loadMore(type,keywords) {
				if (type == 1) { //单曲
					let res = await search({
						keywords: keywords ? keywords : this.oldKeywordList[0],
						offset: this.songOffset++,
						type: 1
					});
					this.searchResult.songs = this.searchResult.songs.concat(res.result.songs);
				} else if (type == 1000) { //歌单
					let res = await search({
						keywords: keywords ? keywords : this.oldKeywordList[0],
						offset: this.playlistOffset++,
						type: 1000
					});
					this.searchResult.playlists = this.searchResult.playlists.concat(res.result.playlists);
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.container {
		width: 100vw;
		background-color: $uni-bg-color-hover;
	}

	view {
		display: block;
	}

	.search-box {
		width: 95%;
		background-color: rgb(242, 242, 242);
		padding: 15upx 2.5%;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
	}

	.search-box .mSearch-input-box {
		width: 100%;
	}

	.search-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-box .search-btn {
		width: 15%;
		margin: 0 0 0 2%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		font-size: 28upx;
		color: #fff;
		background: linear-gradient(to right, #ff9801, #ff570a);
		border-radius: 60upx;
	}

	.search-box .input-box>input {
		width: 100%;
		height: 60upx;
		font-size: 32upx;
		border: 0;
		border-radius: 60upx;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}

	.keyword-list-box {
		min-height: calc(100vh - 110upx);
		padding-top: 10upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 94%;
		height: 80upx;
		margin: 0 3%;
		font-size: 30upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1upx #e7e7e7;
	}

	.keyword-entry image {
		width: 60upx;
		height: 60upx;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 80upx;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	.keyword-box {
		min-height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-box .keyword-block {
		padding: 10upx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10upx 3%;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40upx;
		height: 40upx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 48upx;
		font-size: 24upx;
		background-color: $uni-bg-color-grey;
		color: $uni-text-color-grey;
	}

	.search-result {
		background-color: $uni-bg-color-hover;

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

		.load-more {
			text-align: center;
			color: $uni-text-color-grey;
			margin-bottom: 20rpx;
			font-size: 12px;
		}

		.playlist {
			display: flex;
			flex-direction: column;

			&-item {
				padding: 10rpx 20rpx;
				display: flex;
				flex-direction: row;

				.playlist-cover {
					display: flex;
					align-items: flex-start;
					justify-content: center;

					image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 10rpx;
					}
				}

				.playlist-detail {
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
