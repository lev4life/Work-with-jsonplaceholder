
import { createStore } from 'vuex'


export const store = createStore({
  state () {
    return {
      selectedUserId: 'nobody',
    }
  },
  mutations: {
    setSelectedUser (state, payload) {
      state.selectedUserId = payload
    }
  }
})