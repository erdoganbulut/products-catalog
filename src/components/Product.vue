<template>
  <main class="page">
    <header-bar />
    <product-content />
  </main>
</template>

<script>
import HeaderBar from './shareds/HeaderBar';
import ProductContent from './shareds/ProductContent';

export default {
  name: 'Product',
  data() {
    return {
    };
  },
  components: {
    HeaderBar,
    ProductContent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
