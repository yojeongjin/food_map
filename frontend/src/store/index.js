import { createStore } from "vuex"
import place from "./place"
import save from "./save"

export default createStore({
  modules: {
    place,
    save,
  }
})