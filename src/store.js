import Vuex from 'vuex'

export default new Vuex.Store({
	state: {
		username: '',
		photoURL: ''
	},
	mutations: {
		setUsername (state, payload) {
			state.username = payload
		},
		setPhotoURL (state, payload) {
			state.photoURL = payload
		}
	},
	actions: {},
	modules: {}
})
