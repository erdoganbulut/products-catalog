<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
    };
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
  },
  mounted() {
    this.setLang();
    if (this.langListStatus !== 'done') this.getLangList();
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
