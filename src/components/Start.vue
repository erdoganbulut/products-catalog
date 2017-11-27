<template>
  <main class="page">
    <header-bar />
    <catalog-list />
  </main>
</template>

<script>
import HeaderBar from './shareds/HeaderBar';
import CatalogList from './shareds/CatalogList';

export default {
  name: 'Start',
  data() {
    return {
    };
  },
  components: {
    HeaderBar,
    CatalogList,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
