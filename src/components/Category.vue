<template>
  <main class="page">
    <header-bar />
    <category-banner />
    <category-content />
  </main>
</template>

<script>
import HeaderBar from './shareds/HeaderBar';
import CategoryBanner from './shareds/CategoryBanner';
import CategoryContent from './shareds/CategoryContent';

export default {
  name: 'Category',
  data() {
    return {
    };
  },
  components: {
    HeaderBar,
    CategoryBanner,
    CategoryContent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
