import Vue from 'vue';

const getters = {
  allLang: state => state.all,
};

const actions = {
  setLang({ commit }, lang) {
    Vue.http.get(`./static/api/lang_${lang}.json`).then((response) => {
      const getData = response.body;
      commit('receiveLang', getData);
    }, (response) => {
      console.log(response);
    });
  },
};

const state = {
  all: {},
};

const mutations = {
  receiveLang(State, lang) {
    state.all = lang;
    console.log(state.all);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
