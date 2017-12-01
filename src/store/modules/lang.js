import Vue from 'vue';

const getters = {
  lang: state => state.lang,
  langList: state => state.langList,
  langListStatus: state => state.langListStatus,
};

const actions = {
  setLang({ commit }, lang) {
    Vue.http.get(`./static/api/lang_${lang}.json`).then((response) => {
      const Response = response;
      commit('receiveLang', Response.body);
      commit('receiveLangResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveLang', {});
      commit('receiveLangResponse', Response);
    });
  },
  getLangList({ commit }) {
    Vue.http.get('./static/api/lang_list.json').then((response) => {
      const Response = response;
      commit('receiveLangList', Response.body);
      commit('receiveLangListStatus', 'done');
      commit('receiveLangListResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveLangList', {});
      commit('receiveLangListStatus', 'error');
      commit('receiveLangListResponse', Response);
    });
  },
};

const state = {
  lang: {},
  langResponse: {},
  langList: {},
  langListStatus: 'non-request',
  langListResponse: {},
};

const mutations = {
  receiveLang(State, lang) {
    state.lang = lang;
  },
  receiveLangResponse(State, response) {
    state.langResponse = response;
  },
  receiveLangList(State, langList) {
    state.langList = langList;
  },
  receiveLangListStatus(State, status) {
    state.langListStatus = status;
  },
  receiveLangListResponse(State, response) {
    state.langListResponse = response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
