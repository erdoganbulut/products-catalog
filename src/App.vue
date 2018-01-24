<template>
  <div id="app">
    <icons />
    <header-bar />
    <breadcrumb />
    <router-view/>
    <footer-bar />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HeaderBar from './components/shareds/HeaderBar';
import FooterBar from './components/shareds/FooterBar';
import Breadcrumb from './components/shareds/Breadcrumb';
import Icons from './components/shareds/Icons';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  components: {
    Icons,
    HeaderBar,
    FooterBar,
    Breadcrumb,
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      langList: 'lang/langList',
      langListStatus: 'lang/langListStatus',
      accesstoken: 'auth/accesstoken',
    }),
  },
  methods: {
    ...mapActions({
      getUser: 'auth/getUser'
    }),
    setLang() {
      if (typeof this.$route.params.lang !== 'undefined') this.$store.dispatch('lang/setLang', this.$route.params.lang);
    },
    getLangList() {
      this.$store.dispatch('lang/getLangList');
    },
    goToLangStart() {
      const langListItems = JSON.parse(JSON.stringify(this.langList)).langItems;
      if (typeof langListItems !== 'undefined') {
        const activeLangListItem = window.$lodash.find(langListItems, { isActive: true });
        this.$router.push(`${activeLangListItem.url}`);
      }
    },
  },
  mounted() {
    if (this.accesstoken.length > 0) this.getUser(this.accesstoken);
    this.setLang();
    if (this.langListStatus !== 'done') this.getLangList();

    if (typeof this.$route.params.lang === 'undefined') {
      if (this.langListStatus !== 'done') {
        this.$watch('langListStatus', () => {
          this.goToLangStart();
        }, {
          deep: true,
          immediate: true,
        });
      } else {
        this.goToLangStart();
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.setLang(to, from);
    },
    accesstoken() {
      if (this.accesstoken.length > 0) this.getUser(this.accesstoken);
    },
  },
};
</script>

<style lang="scss">
@import './scss/global';
</style>
