
import { createStore } from 'vuex'


export const store = createStore({
  state () {
    return {
      selectedUserId: 'nobody',
      users: [],
    }
  },
  mutations: {
    setSelectedUser (state, payload) {
      state.selectedUserId = payload
    },
    setUsers (state, payload) {
      state.users = payload
    }
  },
  getters: {
    getUserNameById: (state) => (id) => {
      const user = state.users.find(user => user.id === id)
      return user.name
    }
  }
})