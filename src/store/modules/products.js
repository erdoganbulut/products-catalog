import Vue from 'vue';

const filterProducts = (arr, filter) => {
  let Arr = JSON.parse(JSON.stringify(arr));
  const Filter = JSON.parse(JSON.stringify(filter));

  console.log(Filter);

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
  if (Filter.selectedInner !== '') {
    Arr = window.$lodash.filter(Arr, (o) => {
      return o.innercode.id.toString() === Filter.selectedInner.toString();
    });
  }
  if (Filter.hacimMin !== '') {
    let hacim = '';
    if (Filter.hacimType === 'us') {
      hacim = parseInt(Filter.hacimMin * 29.5735296875, 10);
    } else if (Filter.hacimType === 'uk') {
      hacim = parseInt(Filter.hacimMin * 28.4130625, 10);
    } else {
      hacim = Filter.hacimMin;
    }
    Arr = window.$lodash.filter(Arr, (o) => {
      return o.volume[0] >= hacim;
    });
  }
  if (Filter.hacimMax !== '') {
    let hacim = '';
    if (Filter.hacimType === 'us') {
      hacim = parseInt(Filter.hacimMax * 29.5735296875, 10);
    } else if (Filter.hacimType === 'uk') {
      hacim = parseInt(Filter.hacimMax * 28.4130625, 10);
    } else {
      hacim = Filter.hacimMax;
    }
    Arr = window.$lodash.filter(Arr, (o) => {
      return o.volume[0] <= hacim;
    });
  }
  if (Filter.temper !== '') {
    Arr = window.$lodash.filter(Arr, (o) => {
      return o.tempered.toString() === Filter.temper.toString();
    });
  }
  if (Filter.standart !== '') {
    Arr = window.$lodash.filter(Arr, (o) => {
      return o.standard.toString() === Filter.standart.toString();
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
  getProducts({ commit, rootState }, catId) {
    Vue.http.get(`http://bline.digital/pasabahce2018/Backend/public/api/${rootState.lang.lang.url}/${catId}/allproducts`).then((response) => {
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
