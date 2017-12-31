import Vue from 'vue';

const subCatFilter2CatId = (arr, categoryId) => {
  let Arr = JSON.parse(JSON.stringify(arr));
  Arr = window.$lodash.filter(Arr, { categorieId: parseInt(categoryId) });
  return Arr;
};

const getters = {
  subCategories: state => state.subCategories,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getSubCategories({ commit }, categoryId) {
    console.log(categoryId)
    Vue.http.get('http://5a404fa1d033de001230a4a3.mockapi.io/subcategories').then((response) => {
      const Response = response;
      commit('receiveSubCategories', subCatFilter2CatId(Response.body, categoryId));
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveSubCategories', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  subCategories: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveSubCategories(State, subCategories) {
    state.subCategories = subCategories;
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
