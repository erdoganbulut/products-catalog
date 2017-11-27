<template>
  <section class="catalog-list-component">
    <div class="container">
      <div class="catalog-items">
        <router-link to="/" class="catalog-item">
          <span class="catalog-item-inner">
            <img src="http://placehold.it/1080x1080" alt="">
          </span>
        </router-link>
        <router-link to="/" class="catalog-item">
          <span class="catalog-item-inner">
            <img src="http://placehold.it/1080x1080" alt="">
          </span>
        </router-link>
        <router-link to="/" class="catalog-item">
          <span class="catalog-item-inner">
            <img src="http://placehold.it/1080x1080" alt="">
          </span>
        </router-link>
        <router-link to="/" class="catalog-item">
          <span class="catalog-item-inner">
            <img src="http://placehold.it/1080x1080" alt="">
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CatalogList',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.catalog-list-component {
  .catalog-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 -15px; // container paddings use item padding
    padding: 15px 0;
    .catalog-item {
      display: block;
      width: 100%;
      text-decoration: none;
      padding: 15px;
      @media (min-width: 768px) {
        width: 50%;
      }
      .catalog-item-inner {
        display: block;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
