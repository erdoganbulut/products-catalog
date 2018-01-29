import Vue from 'vue';

const filterProducts = (arr, filter) => {
  let Arr = JSON.parse(JSON.stringify(arr));
  const Filter = JSON.parse(JSON.stringify(filter));

  if (Filter.searchText !== '' && typeof Filter.searchText !== 'undefined') {
    const newArr = [];
    window.$lodash.forEach(Arr, (val) => {
      const item = JSON.stringify(val).toUpperCase().toLowerCase();
      if (item.indexOf(Filter.searchText.toUpperCase().toLowerCase()) > -1) newArr.push(val);
    });
    console.log(newArr);
    Arr = newArr;
  }
  if (Filter.subCategory !== '' && typeof Filter.subCategory !== 'undefined') {
    Arr = window.$lodash.filter(Arr, { category: parseInt(Filter.subCategory, 10) });
  }
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
  if (Filter.standart !== null && Filter.standart !== '' && Filter.limited !== '') {
    console.log('burada');
    if (Filter.standart && Filter.limited) {
      Arr = window.$lodash.filter(Arr, (o) => {
        let fVal = true;
        if (o.standard === null) {
          fVal = true;
        } else {
          fVal = true;
        }
        return fVal;
      });
    } else if (!Filter.standart && Filter.limited) {
      Arr = window.$lodash.filter(Arr, (o) => {
        let fVal = true;
        if (o.standard === null) {
          fVal = false;
        } else {
          fVal = o.standard.toString() === '0';
        }
        return fVal;
      });
    } else if (Filter.standart && !Filter.limited) {
      Arr = window.$lodash.filter(Arr, (o) => {
        let fVal = true;
        if (o.standard === null) {
          fVal = false;
        } else {
          fVal = o.standard.toString() === '1';
        }
        return fVal;
      });
    } else {
      Arr = window.$lodash.filter(Arr, (o) => {
        let fVal = true;
        if (o.standard === null) {
          fVal = true;
        } else {
          fVal = true;
        }
        return fVal;
      });
    }
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
  async getProducts({ commit, rootState }, catId) {
    commit('receiveStatus', 'on-request');
    await Vue.http.get(`http://bline.digital/pasabahce2018/Backend/public/api/${rootState.lang.lang.url}/${catId}/allproducts`).then((response) => {
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
