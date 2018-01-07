import Vue from 'vue';

const filterProducts = (arr, filter) => {
  let Arr = JSON.parse(JSON.stringify(arr));
  const Filter = JSON.parse(JSON.stringify(filter));

  if (Filter.subCategory !== '') Arr = window.$lodash.filter(Arr, { category: parseInt(Filter.subCategory, 10) });
  if (Filter.functions.length > 0) {
    Arr = window.$lodash.filter(Arr, (o) => {
      return Filter.functions.indexOf(o.functions.id) > -1;
    });
  }
  if (Filter.series.length > 0) {
    Arr = window.$lodash.filter(Arr, (o) => {
      return Filter.series.indexOf(o.series.id) > -1;
    });
  }

  return Arr;
};

const getters = {
  productsAll: state => state.productsAll,
  products: state => state.products,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getProducts({ commit }, catId) {
    Vue.http.get(`http://bline.digital/pasabahce2018/Backend/public/api/en/${catId}/allproducts`).then((response) => {
      const Response = response;
      commit('receiveProductsAll', Response.body);
      commit('receiveProducts', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveProductsAll', {});
      commit('receiveProducts', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  products: {},
  productsAll: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveProductsAll(State, productsAll) {
    state.productsAll = productsAll;
  },
  receiveProducts(State, products) {
    state.products = products;
  },
  receiveProductsFilter(State, filter) {
    console.log(filter);
    state.products = filterProducts(state.productsAll, filter);
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
