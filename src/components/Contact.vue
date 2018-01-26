<template>
  <main class="page">
    <section class="static-page-component">
      <div class="container">
        <div class="page--image">
          <img src="../assets/statics/sisecam_b.jpg" alt="">
        </div>
        <div class="page--content">
          <h1 v-html="lang.contact_title"></h1>
          <div class="content" v-html="lang.contact_content">
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Contact',
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
