<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    };
  },
  methods: {
    setLang() {
      this.$store.dispatch('setLang', this.$route.params.lang);
    },
  },
  mounted() {
    this.setLang();
  },
  watch: {
    '$route'(to, from) {
      console.log(to, from);
      this.setLang();
    },
  },
};
</script>

<style lang="scss">
@import './scss/global';
</style>
