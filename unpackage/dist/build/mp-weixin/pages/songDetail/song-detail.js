(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/songDetail/song-detail"],{"1cb7":function(n,t,e){"use strict";var r={comment:function(){return e.e("components/comment/comment").then(e.bind(null,"f26a"))}},o=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return r}))},3404:function(n,t,e){"use strict";var r=e("a52a"),o=e.n(r);o.a},"371f":function(n,t,e){"use strict";(function(n){e("7b77"),e("921b");r(e("66fd"));var t=r(e("7c33"));function r(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},4168:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(e("4795")),o=e("3685"),a=e("7744"),i=e("2f62");function u(n){return n&&n.__esModule?n:{default:n}}function c(n){if("undefined"===typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=s(n))){var t=0,e=function(){};return{s:e,n:function(){return t>=n.length?{done:!0}:{done:!1,value:n[t++]}},e:function(n){throw n},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o,a=!0,i=!1;return{s:function(){r=n[Symbol.iterator]()},n:function(){var n=r.next();return a=n.done,n},e:function(n){i=!0,o=n},f:function(){try{a||null==r.return||r.return()}finally{if(i)throw o}}}}function s(n,t){if(n){if("string"===typeof n)return l(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(n,t):void 0}}function l(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function f(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function d(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?f(Object(e),!0).forEach((function(t){m(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):f(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function m(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function g(n,t,e,r,o,a,i){try{var u=n[a](i),c=u.value}catch(s){return void e(s)}u.done?t(c):Promise.resolve(c).then(r,o)}function p(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var a=n.apply(t,e);function i(n){g(a,r,o,i,u,"next",n)}function u(n){g(a,r,o,i,u,"throw",n)}i(void 0)}))}}var v=function(){Promise.all([e.e("common/vendor"),e.e("components/song-list/song-list")]).then(function(){return resolve(e("e399"))}.bind(null,e)).catch(e.oe)},h=function(){e.e("components/comment/comment").then(function(){return resolve(e("f26a"))}.bind(null,e)).catch(e.oe)},b={components:{songList:v,comment:h},data:function(){return{lyric:"",similarSong:[],hotComments:[]}},computed:(0,i.mapState)(["playingSong"]),onLoad:function(){var n=this;return p(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.init(n.playingSong);case 2:case"end":return t.stop()}}),t)})))()},methods:d({},(0,i.mapMutations)(["setPlayingSong"]),{getLyric:function(n){var t=this;return p(r.default.mark((function e(){var a;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.getLyric)(n);case 2:a=e.sent,a.hasOwnProperty("lrc")?t.lyric=a.lrc.lyric.replace(/[\[d{2}:d{2}\.\d{3}\]]/g,""):t.lyric="暂无歌词";case 4:case"end":return e.stop()}}),e)})))()},getSimilarSong:function(n){var t=this;return p(r.default.mark((function e(){var a,i,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.getSimilarSong)(n);case 2:if(a=e.sent,!(a.songs.length>1)){e.next=9;break}return i=a.songs.map((function(n){return n.id})),e.next=7,t.getCover(i.join(","));case 7:u=e.sent,t.similarSong=a.songs.map((function(n,t){var e,r=[],o=n.artists[0].id,a=c(n.artists);try{for(a.s();!(e=a.n()).done;){var i=e.value;r.push(i.name)}}catch(s){a.e(s)}finally{a.f()}return{id:n.id,name:n.name,artist:r.join("/"),artistId:o,cover:u[t],albumName:n.album.name,albumId:n.album.id,theme:[255,255,255]}}));case 9:case"end":return e.stop()}}),e)})))()},getCover:function(n){return p(r.default.mark((function t(){var e,a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,o.getSongDetail)(n);case 2:return e=t.sent,a=e.songs.map((function(n){return n.al.picUrl})),t.abrupt("return",a);case 5:case"end":return t.stop()}}),t)})))()},init:function(t){var e=this;return p(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.setNavigationBarTitle({title:e.playingSong.name}),t.next=3,e.getLyric(e.playingSong.id);case 3:return t.next=5,e.getSimilarSong(e.playingSong.id);case 5:return t.next=7,e.getComments(e.playingSong.id);case 7:case"end":return t.stop()}}),t)})))()},playSong:function(n){var t=this;return p(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getUrl(n);case 2:return e.next=4,t.init(n);case 4:case"end":return e.stop()}}),e)})))()},getUrl:function(t){var e=this;return p(r.default.mark((function a(){return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.setPlayingSong(t),(0,o.getSongUrl)(t.id).then((function(r){var o=r.data.map((function(n){return{url:n.url,id:n.id}})),a=o[0].url;a?(e.$bgAudioMannager.title=t.name,e.$bgAudioMannager.singer=t.artist,e.$bgAudioMannager.coverImgUrl=t.cover,e.$bgAudioMannager.src=a):n.showToast({title:"暂无版权",icon:"none",mask:!0})})).catch((function(n){console.log(n)}));case 2:case"end":return r.stop()}}),a)})))()},getComments:function(n){var t=this;return p(r.default.mark((function e(){var o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,a.getCommentMusic)(n);case 2:o=e.sent,o.hotComments.length>0?t.hotComments=o.hotComments.slice(0,3):t.hotComments=o.comments;case 4:case"end":return e.stop()}}),e)})))()}})};t.default=b}).call(this,e("543d")["default"])},"7c33":function(n,t,e){"use strict";e.r(t);var r=e("1cb7"),o=e("a2e1");for(var a in o)"default"!==a&&function(n){e.d(t,n,(function(){return o[n]}))}(a);e("3404");var i,u=e("f0c5"),c=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"3d0fcbbc",null,!1,r["a"],i);t["default"]=c.exports},a2e1:function(n,t,e){"use strict";e.r(t);var r=e("4168"),o=e.n(r);for(var a in r)"default"!==a&&function(n){e.d(t,n,(function(){return r[n]}))}(a);t["default"]=o.a},a52a:function(n,t,e){}},[["371f","common/runtime","common/vendor"]]]);