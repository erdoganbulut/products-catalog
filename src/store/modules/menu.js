import Vue from 'vue';

const getters = {
  menu: state => state.menu,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getMenu({ commit, rootState }) {
    Vue.http.get(`http://admin.pasabahcecatalogues.com/api/${rootState.lang.lang.url}/menuItems`).then((response) => {
      const Response = response;
      commit('receiveMenu', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveMenu', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  menu: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveMenu(State, menu) {
    state.menu = menu;
  },
  receiveStatus(State, status) {
    state.status = status;
  },
  receiveResponse(State, response) {
    state.response = response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
