import Vue from 'vue';

const getters = {
  lists: state => state.lists,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getLists({ commit }, accesstoken) {
    Vue.http.post('http://bline.digital/pasabahce2018/Backend/public/api/userlist', {}, { headers: { Authorization: `Bearer ${accesstoken}` } }).then((response) => {
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
  addList({ commit, dispatch }, params) {
    Vue.http.post('http://bline.digital/pasabahce2018/Backend/public/api/addList', params.newList, { headers: { Authorization: `Bearer ${params.accesstoken}` } }).then((response) => {
      const Response = response;
      dispatch('getLists', params.accesstoken);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      dispatch('getLists', params.accesstoken);
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
  updateList({ commit, dispatch }, params) {
    Vue.http.post('http://bline.digital/pasabahce2018/Backend/public/api/updatelist', params.updateList, { headers: { Authorization: `Bearer ${params.accesstoken}` } }).then((response) => {
      const Response = response;
      dispatch('getLists', params.accesstoken);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      dispatch('getLists', params.accesstoken);
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
  deleteList({ commit, dispatch }, params) {
    Vue.http.post('http://bline.digital/pasabahce2018/Backend/public/api/deleteList', params.deleteList, { headers: { Authorization: `Bearer ${params.accesstoken}` } }).then((response) => {
      const Response = response;
      dispatch('getLists', params.accesstoken);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      dispatch('getLists', params.accesstoken);
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
