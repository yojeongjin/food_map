export default {
  namespaced: true,
  state: () => ({
    datas: []
  }),
  getters: {},
  mutations: {},
  actions: {
    searchPlaces(context, payload) {
      const { keyword }  = payload
      /* global kakao */
      let ps = new kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data) => {
        console.log(data)
      })
    }
  }
}