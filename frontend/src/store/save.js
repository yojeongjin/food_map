import axios from "axios"


export default {
  namespaced: true,
  state: () => ({
    saveDatas: []
  }),
  getters: {},
  mutations: {
    updateState(state,payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async getSave({commit}) {
      const res = await axios.get('http://localhost:3000/api/find')
      const { data } = res.data
      commit('updateState', {
        saveDatas: data
      })
    }
  }
}
