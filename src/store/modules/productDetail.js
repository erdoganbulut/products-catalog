import Vue from 'vue';

const getters = {
  product: state => state.product,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getProduct({ commit }, params) {
    Vue.http.get(`http://bline.digital/pasabahce2018/Backend/public/api/tr/details/${params.slug}`).then((response) => {
      const Response = response;
      commit('receiveProduct', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveProduct', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  product: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveProduct(State, product) {
    state.product = product;
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
