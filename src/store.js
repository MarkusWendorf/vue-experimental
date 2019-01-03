import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fonts: [],
    fontsByName: {},
  },
  mutations: {
    updateFonts: (state, payload) => {
        state.fonts = payload;

        state.fontsByName = payload.reduce((acc, cur) => {
          acc[cur.family] = cur;
          return acc;
        }, {});
    },
  },
  actions: {
    setFonts: (context, payload) => {
      context.commit("updateFonts", payload);
    }
  }
})
