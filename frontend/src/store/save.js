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
      // console.log(res)
      const data = res.data.data
      commit('updateState', {
        boardDatas: data
      })
    },
    async getMenu({commit}) {
      const res = await axios.get('http://localhost:3000/api/menu')
      console.log(res.data.data)
      const data = res.data.data

      let randomData = data.sort(() => Math.random() - 0.5)
      randomData.length = 15

      commit('updateState', {
        menuDatas: randomData
      })
    }
  }
}
