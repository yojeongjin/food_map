export default {
  namespaced: true,
  state: () => ({
    datas: [],
    msg: '',
    markersPositions: [],
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
    searchPlaces({ commit }, payload) {
      const { keyword }  = payload
      /* global kakao */
      let ps = new kakao.maps.services.Places()
      ps.keywordSearch(keyword, (data,status) => {
        if(status === kakao.maps.services.Status.OK) {
          let markersPosition = []
          for (let i=0; i<data.length; i++) {
            let lat = data[i].y
            let lng = data[i].x
            markersPosition.push([lat, lng])
          }
          commit('updateState', {
            datas: data,
            msg: '',
            markersPositions: markersPosition
          })
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          commit('updateState', {
            datas: [],
            msg: '검색결과를 찾을 수 없습니다.'
          })
        } else if (status === kakao.maps.services.Status.ERROR) {
          commit('updateState', {
            datas: [],
            msg: '검색 중 오류가 발생하였습니다.'
          })
        }
      })
    }
  }
}
