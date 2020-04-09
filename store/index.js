import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		ranking: {},
		playingSong: {}
	},
	mutations: {
		setRanking(state, data) {
			state.ranking = data;
		},
		setPlayingSong(state, data) {
			state.playingSong = data;
		}
	}
})

export default store
