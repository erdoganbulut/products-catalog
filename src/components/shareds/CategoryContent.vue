<template>
  <section class="category-content-component">
    <div class="container">
      <div class="filter-items">
        <div class="filter-item filter-item--horizontal filter-item--categories">
          <h3>Kategoriler</h3>
          <div class="filter--inner-items">
            <label v-for="subCategoryItem in subCategories" :key="subCategoryItem.id" :for="'subCategoryCheck' + subCategoryItem.id">
              <input type="checkbox" :id="'subCategoryCheck' + subCategoryItem.id" :value="subCategoryItem.id" v-model="subCategoriesCheckeds">
              <img :src="subCategoryItem.photo" width="150" alt="">
            </label>
          </div>
          {{ subCategoriesCheckeds }}
        </div>
        <div class="filter-item filter-item--horizontal filter-item--functions">
          <h3>Functions</h3>
          <div class="filter--inner-items">
            <label v-for="functionItem in functions" :key="functionItem.id" :for="'functionCheck' + functionItem.id">
              <input type="checkbox" :id="'functionCheck' + functionItem.id" :value="functionItem.id" v-model="functionsCheckeds">
              <img :src="functionItem.photo" width="150" alt="">
            </label>
          </div>
          {{ functionsCheckeds }}
        </div>
        <div class="filter-item filter-item--horizontal filter-item--series">
          <h3>Series</h3>
          <div class="filter--inner-items">
            <label v-for="serieItem in series" :key="serieItem.id" :for="'functionCheck' + serieItem.id">
              <input type="checkbox" :id="'functionCheck' + serieItem.id" :value="serieItem.id" v-model="seriesCheckeds">
              <img :src="serieItem.photo" width="150" alt="">
            </label>
          </div>
          {{ seriesCheckeds }}
        </div>
      </div>
      <div class="serie-items">
        <div class="serie-item">
          <div class="info-bar">
            <h3>çay tabakları bardakları</h3>
          </div>
          <div class="product-items" v-if="status === 'done'">
            <router-link v-for="product in products.slice(0, 5)" :key="product.id" :to="'/' + lang.url + '/product/' + product.id" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
          </div>
        </div>
        <div class="serie-item">
          <div class="info-bar">
            <h3>kadehler</h3>
          </div>
          <div class="product-items" v-if="status === 'done'">
            <router-link v-for="product in products.slice(0, 5)" :key="product.id" :to="'/' + lang.url + '/product/' + product.id" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'CategoryContent',
  data() {
    return {
      selectedCategory: {},
      subCategoriesCheckeds: [],
      functionsCheckeds: [],
      seriesCheckeds: [],
    };
  },
  computed: {
    ...mapGetters({
      products: 'products/products',
      status: 'products/status',
      response: 'products/response',
      categories: 'categories/categories',
      lang: 'lang/lang',
      subCategories: 'subCategories/subCategories',
      functions: 'functions/functions',
      series: 'series/series',
    }),
  },
  methods: {
    ...mapMutations({
      receiveFunctions: 'functions/receiveFunctions',
    }),
    ...mapActions({
      getSubCategories: 'subCategories/getSubCategories',
      getFunctions: 'functions/getFunctions',
      getSeries: 'series/getSeries',
      getCategories: 'categories/getCategories',
    }),
    getProducts() {
      this.$store.dispatch('products/getProducts');
    },
    makeFilter() {

    },
  },
  mounted() {
    this.getCategories();
    this.getProducts();
    this.getFunctions();
  },
  watch: {
    categories() {
      if (typeof this.categories.categoryItems !== 'undefined') {
        this.selectedCategory = JSON.parse(JSON.stringify(
          window.$lodash.find(
            this.categories.categoryItems, { url: this.$route.params.category })));
        this.getSubCategories(this.selectedCategory.id);
      }
    },
    subCategoriesCheckeds() {
      this.receiveFunctions();
    },
    functionsCheckeds() {
      this.getSeries();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.category-content-component {
  .serie-items {
    padding: 10px 0;
    .serie-item {
      padding: 10px 0;
      .info-bar {
        display: block;
        background:red;
        color: #fff;
        padding: 10px 20px;
        text-align: center;
        h3 {
          font-size: 18px;
          font-weight: 300;
          margin: 0;
        }
      }
      .product-items {
        display: flex;
        flex-wrap: wrap;
        margin-left: -5px;
        margin-right: -5px;
        padding: 5px 0;
        .product-item {
          display: block;
          width: 50%;
          padding: 5px;
          @media (min-width: 768px) {
            width: 25%;
          }
          @media (min-width: 992px) {
            width: 16.666666%;
          }
          .product-item--inner {
            display: block;
            width: 100%;
            img {
              display: block;
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }
  }
}
</style>
