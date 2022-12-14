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
      const res = await axios.get('https://www.searcheat.shop/api/find')
      const { data } = res.data
      commit('updateState', {
        saveDatas: data
      })
    },
    async getNewly({commit}) {
      const res = await axios.get('https://www.searcheat.shop/api/newly')
      const { data } = res.data
      commit('updateState', {
        newlyDatas: data
      })
    },
    async getList({commit}) {
      const res = await axios.get('https://www.searcheat.shop/api/board')
      const data = res.data.data

      let sortData = data.sort((a,b) => {return b.boardIdx - a.boardIdx});
      commit('updateState', {
        boardDatas: sortData
      })
    },
    async getMenu({commit}) {
      const res = await axios.get('https://www.searcheat.shop/api/menu')
      const data = res.data.data

      let randomData = data.sort(() => Math.random() - 0.5)
      randomData.length = 15

      commit('updateState', {
        menuDatas: randomData
      })
    }
  }
}
