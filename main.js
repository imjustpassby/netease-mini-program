import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$bgAudioMannager = uni.getBackgroundAudioManager();
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
