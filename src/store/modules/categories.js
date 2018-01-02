import Vue from 'vue';

const getters = {
  categories: state => state.categories,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getCategories({ commit }) {
    const categories = [];
    Vue.http.get('http://5a404fa1d033de001230a4a3.mockapi.io/catalogs/1/categories').then((response) => {
      const Response = response;
      window.$lodash.forEach(Response.body, (val) => {
        categories.push(val);
      });
      Vue.http.get('http://5a404fa1d033de001230a4a3.mockapi.io/catalogs/2/categories').then((response2) => {
        const Response2 = response2;
        window.$lodash.forEach(Response2.body, (val) => {
          categories.push(val);
        });
        Vue.http.get('http://5a404fa1d033de001230a4a3.mockapi.io/catalogs/3/categories').then((response3) => {
          const Response3 = response3;
          window.$lodash.forEach(Response3.body, (val) => {
            categories.push(val);
          });
          Vue.http.get('http://5a404fa1d033de001230a4a3.mockapi.io/catalogs/4/categories').then((response4) => {
            const Response4 = response4;
            window.$lodash.forEach(Response4.body, (val) => {
              categories.push(val);
            });
            commit('receiveCategories', categories);
            commit('receiveStatus', 'done');
            commit('receiveResponse', Response4);
          }, (response4) => {
            const Response4 = response4;
            commit('receiveCategories', {});
            commit('receiveStatus', 'error');
            commit('receiveResponse', Response4);
          });
        }, (response3) => {
          const Response3 = response3;
          commit('receiveCategories', {});
          commit('receiveStatus', 'error');
          commit('receiveResponse', Response3);
        });
      }, (response2) => {
        const Response2 = response2;
        commit('receiveCategories', {});
        commit('receiveStatus', 'error');
        commit('receiveResponse', Response2);
      });
    }, (response) => {
      const Response = response;
      commit('receiveCategories', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  categories: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveCategories(State, categories) {
    state.categories = categories;
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
