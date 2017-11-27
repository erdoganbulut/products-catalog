<template>
  <main class="page">
    <header-bar />
    <category-banner />
  </main>
</template>

<script>
import HeaderBar from './shareds/HeaderBar';
import CategoryBanner from './shareds/CategoryBanner';

export default {
  name: 'Category',
  data() {
    return {
    };
  },
  components: {
    HeaderBar,
    CategoryBanner,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
