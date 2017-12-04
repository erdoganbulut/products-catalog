<template>
  <section class="category-list-component">
    <div class="container">
      <div class="category-items">
        <div class="category-item" v-for="category in categories.categoryItems">
          <router-link :to="'/' + lang.url + '/catalog/' + $route.params.catalog + '/category/' + category.url" class="category-item-inner">
            <img :src="category.photo" :alt="category.name">
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CategoryList',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/categories',
      status: 'categories/status',
      response: 'categories/response',
      lang: 'lang/lang',
    }),
  },
  methods: {
    getCategories() {
      this.$store.dispatch('categories/getCategories');
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.category-list-component {
  .category-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 -15px; // container paddings use item padding
    padding: 15px 0;
    .category-item {
      display: block;
      width: 100%;
      padding: 15px;
      @media (min-width: 768px) {
        width: 50%;
      }
      .category-item-inner {
        display: block;
        text-decoration: none;
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
