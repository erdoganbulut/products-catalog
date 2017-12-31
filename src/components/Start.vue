<template>
  <main class="page">
    <catalog-list />
  </main>
</template>

<script>
import CatalogList from './shareds/CatalogList';

export default {
  name: 'Start',
  data() {
    return {
    };
  },
  components: {
    CatalogList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
