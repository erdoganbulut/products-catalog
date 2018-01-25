<template>
  <section class="category-list-component">
    <div class="container">
      <div class="category-items">
        <div class="category-item" v-for="category in categories" :key="'cat' + category.id">
          <router-link :to="'/' + lang.url + '/catalog/' + $route.params.catalog + '/category/' + category.url" class="category-item-inner">
            <img :src="category.photo" :alt="category.name">
            <span class="overlay">
              <span class="overlay-inner">
                <span class="title">{{ category.name }}</span>
                <span class="desc">{{ lang.see_products }}</span>
              </span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CategoryList',
  data() {
    return {
      selectedCatalog: '',
      isCategories: false,
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/categories',
      status: 'categories/status',
      response: 'categories/response',
      catalogStatus: 'catalogs/status',
      catalogs: 'catalogs/catalogs',
      lang: 'lang/lang',
    }),
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/getCategories',
      getCatalog: 'catalogs/getCatalog',
    }),
    getCategoriesIsDoneCatalog() {
      if (!this.isCategories) {
        if (this.catalogStatus === 'done') {
          this.selectedCatalog = JSON.parse(JSON.stringify(
                                    window.$lodash.find(
                                      this.catalogs, { url: this.$route.params.catalog })));
          this.getCategories(this.selectedCatalog.id);
          this.isCategories = true;
        }
      }
    },
  },
  mounted() {
    if (this.catalogStatus !== 'done') this.getCatalog();
    else this.getCategoriesIsDoneCatalog();
  },
  watch: {
    catalogStatus() {
      this.getCategoriesIsDoneCatalog();
    },
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
    //padding: 15px 0;
    .category-item {
      display: block;
      width: 100%;
      padding: 1px 0;
      @media (min-width: 768px) {
        width: 50%;
      }
      .category-item-inner {
        display: block;
        text-decoration: none;
        position: relative;
        .overlay {
          position: absolute;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          span {
            display: block;
            width: 100%;
            color: #fff;
            &.overlay-inner {
              padding: 20px 40px;
            }
          }
          .title {
            font-size: 24px;
            font-weight: 500;
          }
        }
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
