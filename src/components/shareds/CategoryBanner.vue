<template>
  <section class="category-banner-component">
    <div class="container">
      <img src="http://placehold.it/1920x720" alt="">
    </div>
  </section>
</template>

<script>
export default {
  name: 'CategoryBanner',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.category-banner-component {
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
