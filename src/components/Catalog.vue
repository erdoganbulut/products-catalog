<template>
  <main class="page">
    <header-bar />
    <catalog-banner />
  </main>
</template>

<script>
import HeaderBar from './shareds/HeaderBar';
import CatalogBanner from './shareds/CatalogBanner';

export default {
  name: 'Catalog',
  data() {
    return {
    };
  },
  components: {
    HeaderBar,
    CatalogBanner,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
