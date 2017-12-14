import Vue from 'vue';

const getters = {
  products: state => state.products,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getCategory({ commit }) {
    Vue.http.get('./static/api/category.json').then((response) => {
      const Response = response;
      commit('receiveProducts', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveProducts', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  products: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveProducts(State, products) {
    state.products = products;
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
