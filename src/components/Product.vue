<template>
  <main class="page">
    <product-content />
  </main>
</template>

<script>
import ProductContent from './shareds/ProductContent';

export default {
  name: 'Product',
  data() {
    return {
    };
  },
  components: {
    ProductContent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
