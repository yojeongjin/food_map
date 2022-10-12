import axios from "axios"

export default {
  namespaced: true,
  state: () => ({
    saveDatas: [],
    newlyDatas: [],
    boardDatas: [],
    menuDatas: []
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
      const res = await axios.get('http://http://3.36.188.55/api/find')
      const { data } = res.data
      commit('updateState', {
        saveDatas: data
      })
    },
    async getNewly({commit}) {
      const res = await axios.get('http://3.36.188.55/api/newly')
      const { data } = res.data
      commit('updateState', {
        newlyDatas: data
      })
    },
    async getList({commit}) {
      const res = await axios.get('http://3.36.188.55/api/board')
      const data = res.data.data

      commit('updateState', {
        boardDatas: data
      })
    },
    async getMenu({commit}) {
      const res = await axios.get('http://3.36.188.55/api/menu')
      const data = res.data.data

      let randomData = data.sort(() => Math.random() - 0.5)
      randomData.length = 15

      commit('updateState', {
        menuDatas: randomData
      })
    }
  }
}
