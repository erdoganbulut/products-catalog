<template>
  <section class="category-content-component">
    <div class="container">
      <div class="filter-items">
        <div class="filter-item filter-item--horizontal filter-item--categories">
          <h3>(Sub)Kategoriler</h3>
          <div class="filter--inner-items">
            <select name="" id="" v-model="subCategoriesCheckeds">
              <option v-for="subCategory in subCategories" :key="'sub' + subCategory.id" :value="subCategory.id">{{ subCategory.name }}</option>
            </select>
          </div>
          {{ subCategoriesCheckeds }}
        </div>
        <div class="filter-item filter-item--horizontal filter-item--functions">
          <h3>Functions</h3>
          <div class="filter--inner-items">
            <label v-for="functionItem in functions" :key="'func' + functionItem.id" :for="'functionCheck' + functionItem.id">
              <input type="checkbox" :id="'functionCheck' + functionItem.id" :value="functionItem.id" v-model="functionsCheckeds">
              <img :src="'http://placehold.it/256x256?text=' + functionItem.name" width="150" alt="">
            </label>
          </div>
          {{ functionsCheckeds }}
        </div>
        <div class="filter-item filter-item--horizontal filter-item--series">
          <h3>Series</h3>
          <div class="filter--inner-items">
            <label v-for="serieItem in series" :key="'serie' + serieItem.id" :for="'functionCheck' + serieItem.id">
              <input type="checkbox" :id="'functionCheck' + serieItem.id" :value="serieItem.id" v-model="seriesCheckeds">
              <img :src="'http://placehold.it/256x256?text=' + serieItem.name" width="150" alt="">
            </label>
          </div>
          {{ seriesCheckeds }}
        </div>
      </div>
      <div class="serie-items">
        <div class="serie-item">
          <div class="info-bar">
            <h3>ürünler ({{ products.length }})</h3>
          </div>
          <div class="product-items" v-if="status === 'done'">
            <router-link v-for="product in products" :key="product.id" :to="'/' + lang.url + '/product/' + product.id" class="product-item">
              <span class="product-item--inner">
                <img :src="'http://placehold.it/540x540?text=' + product.name" alt="">
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
      selectedCatalog: '',
      selectedCategory: '',
      isCategories: false,
      subCategoriesCheckeds: '',
      functionsCheckeds: [],
      seriesCheckeds: [],
    };
  },
  computed: {
    ...mapGetters({
      products: 'products/products',
      status: 'products/status',
      response: 'products/response',
      catalogStatus: 'catalogs/status',
      catalogs: 'catalogs/catalogs',
      categories: 'categories/categories',
      categoriesSstatus: 'categories/status',
      lang: 'lang/lang',
      subCategories: 'subCategories/subCategories',
      functions: 'functions/functions',
      series: 'series/series',
    }),
  },
  methods: {
    ...mapMutations({
      receiveFunctions: 'functions/receiveFunctions',
      receiveStatusCategories: 'categories/receiveStatus',
      receiveProductsFilter: 'products/receiveProductsFilter',
    }),
    ...mapActions({
      getSubCategories: 'subCategories/getSubCategories',
      getFunctions: 'functions/getFunctions',
      getSeries: 'series/getSeries',
      getCategories: 'categories/getCategories',
      getProducts: 'products/getProducts',
      getCatalog: 'catalogs/getCatalog',
    }),
    makeFilter() {

    },
    getCategoriesIsDoneCatalog() {
      if (!this.isCategories) {
        if (this.catalogStatus === 'done') {
          this.selectedCatalog = JSON.parse(JSON.stringify(
                                    window.$lodash.find(
                                      this.catalogs, { url: this.$route.params.catalog })));
          this.receiveStatusCategories('on-request');
          this.getCategories(this.selectedCatalog.id);
          this.isCategories = true;
        }
      }
    },
    getProductsIsDoneCategories() {
      if (this.isCategories) {
        if (this.categoriesSstatus === 'done' && this.categories.length > 0) {
          this.selectedCategory = JSON.parse(JSON.stringify(
                                    window.$lodash.find(
                                      this.categories, { url: this.$route.params.category })));
          this.getProducts(this.selectedCategory.id);
          this.getSubCategories(this.selectedCategory.id);
        }
      }
    },
    filterProducts() {
      const filter = {
        subCategory: this.subCategoriesCheckeds,
        functions: this.functionsCheckeds,
        series: this.seriesCheckeds,
      }
      this.receiveProductsFilter(filter);
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
    categories() {
      this.getProductsIsDoneCategories();
    },
    subCategoriesCheckeds() {
      this.getFunctions(this.subCategoriesCheckeds);
      this.getSeries(this.subCategoriesCheckeds);
      this.filterProducts();
    },
    functionsCheckeds() {
      this.filterProducts();
    },
    seriesCheckeds() {
      this.filterProducts();
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
