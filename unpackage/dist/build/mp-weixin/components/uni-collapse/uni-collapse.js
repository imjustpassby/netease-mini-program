(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-collapse/uni-collapse"],{"2b3c":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c={name:"UniCollapse",props:{accordion:{type:[Boolean,String],default:!1}},data:function(){return{}},provide:function(){return{collapse:this}},created:function(){this.childrens=[]},methods:{onChange:function(){var n=[];this.childrens.forEach((function(t,e){t.isOpen&&n.push(t.nameSync)})),this.$emit("change",n)}}};t.default=c},"45d0":function(n,t,e){"use strict";e.r(t);var c=e("2b3c"),a=e.n(c);for(var u in c)"default"!==u&&function(n){e.d(t,n,(function(){return c[n]}))}(u);t["default"]=a.a},"8fa0":function(n,t,e){"use strict";var c=e("b66c"),a=e.n(c);a.a},af7e:function(n,t,e){"use strict";e.r(t);var c=e("c5a7"),a=e("45d0");for(var u in a)"default"!==u&&function(n){e.d(t,n,(function(){return a[n]}))}(u);e("8fa0");var r,o=e("f0c5"),i=Object(o["a"])(a["default"],c["b"],c["c"],!1,null,"23264eed",null,!1,c["a"],r);t["default"]=i.exports},b66c:function(n,t,e){},c5a7:function(n,t,e){"use strict";var c,a=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return c}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-collapse/uni-collapse-create-component',
    {
        'components/uni-collapse/uni-collapse-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("af7e"))
        })
    },
    [['components/uni-collapse/uni-collapse-create-component']]
]);
