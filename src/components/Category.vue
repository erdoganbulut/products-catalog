<template>
  <main class="page">
    <category-banner />
    <category-content />
  </main>
</template>

<script>
import CategoryBanner from './shareds/CategoryBanner';
import CategoryContent from './shareds/CategoryContent';

export default {
  name: 'Category',
  data() {
    return {
    };
  },
  components: {
    CategoryBanner,
    CategoryContent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
