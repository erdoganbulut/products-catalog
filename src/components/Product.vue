<template>
  <main class="page">
    <header-bar />
  </main>
</template>

<script>
import HeaderBar from './shareds/HeaderBar';

export default {
  name: 'Product',
  data() {
    return {
    };
  },
  components: {
    HeaderBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
