<template>
  <div id="app">
    <icons />
    <header-bar />
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Library</a></li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
    <router-view/>
    <footer-bar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderBar from './components/shareds/HeaderBar';
import FooterBar from './components/shareds/FooterBar';
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
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      langList: 'lang/langList',
      langListStatus: 'lang/langListStatus',
    }),
  },
  methods: {
    setLang() {
      this.$store.dispatch('lang/setLang', this.$route.params.lang);
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
  },
};
</script>

<style lang="scss">
@import './scss/global';
</style>
