import Vue from 'vue';

const getters = {
  accesstoken: state => state.accesstoken,
  refreshtoken: state => state.refreshtoken,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getToken({ commit }, params) {
    Vue.http.post('http://bline.digital/pasabahce2018/Backend/public/oauth/token', { grant_type: 'password', client_id: '141', client_secret: 'k3WjnCzMTm4WRKfUs17X3yJxxnIkD24YeWtYMVsE', username: params.username, password: params.password, scope: '' }).then((response) => {
      const Response = response;
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
};

const state = {
  accesstoken: '',
  refreshtoken: '',
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveAccesstoken(State, accesstoken) {
    state.accesstoken = accesstoken;
  },
  receiveRefreshtoken(State, refreshtoken) {
    state.refreshtoken = refreshtoken;
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
