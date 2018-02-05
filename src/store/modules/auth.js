import Vue from 'vue';

const getters = {
  user: state => state.user,
  accesstoken: state => state.accesstoken,
  refreshtoken: state => state.refreshtoken,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getUser({ commit }, accesstoken) {
    Vue.http.get('http://admin.pasabahcecatalogues.com/api/user', { headers: { Authorization: `Bearer ${accesstoken}` } }).then((response) => {
      const Response = response;
      commit('receiveUser', Response.body);
    }, () => {
      commit('receiveUser', 'error');
      commit('receiveAccesstoken', '');
      commit('receiveRefreshtoken', '');
    });
  },
  getToken({ commit, dispatch }, params) {
    Vue.http.post('http://admin.pasabahcecatalogues.com/oauth/token', { grant_type: 'password', client_id: '141', client_secret: 'k3WjnCzMTm4WRKfUs17X3yJxxnIkD24YeWtYMVsE', username: params.username, password: params.password, scope: '' }).then((response) => {
      const Response = response;
      dispatch('getUser', Response.body.access_token);
      commit('receiveAccesstoken', Response.body.access_token);
      commit('receiveRefreshtoken', Response.body.refresh_token);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveAccesstoken', '');
      commit('receiveRefreshtoken', '');
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
  logout({ commit }) {
    commit('receiveUser', 'error');
    commit('receiveStatus', 'non-request');
    commit('receiveAccesstoken', '');
    commit('receiveRefreshtoken', '');
  },
};

const state = {
  user: 'non-request',
  accesstoken: localStorage.getItem('accesstoken') === null ? '' : localStorage.getItem('accesstoken'),
  refreshtoken: localStorage.getItem('refreshtoken') === null ? '' : localStorage.getItem('refreshtoken'),
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveAccesstoken(State, accesstoken) {
    state.accesstoken = accesstoken;
    localStorage.setItem('accesstoken', accesstoken);
  },
  receiveRefreshtoken(State, refreshtoken) {
    state.refreshtoken = refreshtoken;
    localStorage.setItem('refreshtoken', refreshtoken);
  },
  receiveStatus(State, status) {
    state.status = status;
  },
  receiveResponse(State, response) {
    state.response = response;
  },
  receiveUser(State, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
