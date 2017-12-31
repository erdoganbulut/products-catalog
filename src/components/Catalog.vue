<template>
  <main class="page">
    <category-list />
  </main>
</template>

<script>
import CategoryList from './shareds/CategoryList';

export default {
  name: 'Catalog',
  data() {
    return {
    };
  },
  components: {
    CategoryList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
