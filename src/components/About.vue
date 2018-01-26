<template>
  <main class="page">
    <section class="static-page-component">
      <div class="container">
        <div class="page--image">
          <img src="../assets/statics/pasabahce.jpg" alt="">
        </div>
        <div class="page--content">
          <h1 v-html="lang.about_title"></h1>
          <div class="content" v-html="lang.about_content">
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'About',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      langList: 'lang/langList',
      langListStatus: 'lang/langListStatus',
    })
  },
  components: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
