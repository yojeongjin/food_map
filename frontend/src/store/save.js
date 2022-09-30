import axios from "axios"


export default {
  namespaced: true,
  state: () => ({
    saveDatas: [],
    newlyDatas: [],
    boardDatas: [],
    photo: []
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
    },
    async getNewly({commit}) {
      const res = await axios.get('http://localhost:3000/api/newly')
      console.log(res)
      const { data } = res.data
      commit('updateState', {
        newlyDatas: data
      })
    },
    async getList({commit}) {
      const res = await axios.get('http://localhost:3000/api/board')
      console.log(res)
      const { data } = res.data
      commit('updateState', {
        boardDatas: data
      })
    },
    async getPhoto({commit}) {
      const res = await axios.get('http://localhost:3000/api/upload')
      console.log(res)
      const { data } = res.data
      commit('updateState', {
        photo: data
      })
    }
  }
}
