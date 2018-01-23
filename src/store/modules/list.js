import Vue from 'vue';

const getters = {
  lists: state => state.lists,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getLists({ commit }) {
    Vue.http.post('http://bline.digital/pasabahce2018/Backend/public/api/userlist', {}).then((response) => {
      const Response = response;
      commit('receiveLists', Response.body.lists);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveLists', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  lists: [],
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveLists(State, lists) {
    state.lists = lists;
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
