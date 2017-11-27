<template>
  <main class="page">
    <header-bar />
    <category-list />
  </main>
</template>

<script>
import HeaderBar from './shareds/HeaderBar';
import CategoryList from './shareds/CategoryList';

export default {
  name: 'Catalog',
  data() {
    return {
    };
  },
  components: {
    HeaderBar,
    CategoryList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
