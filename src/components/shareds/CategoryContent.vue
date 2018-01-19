<template>
  <section class="category-content-component">
    <div class="filter-control-bar">
      <span class="product-amount--text">{{ products.length }} ÜRÜN</span>
      <a href="javascript:;" class="open-filter-btn" v-on:click="isOpenFilterItems = !isOpenFilterItems">
        <svg>
          <use xlink:href="#svgIconFilter" />
        </svg>
        <span>FİLTRE</span>
      </a>
    </div>
    <div class="filter-items" v-show="isOpenFilterItems">
      <div class="filter--title-bar">
        <h2>FİLTRELEME</h2>
        <a href="javascript:;" class="close-filter-btn" v-on:click="isOpenFilterItems = !isOpenFilterItems">
          <svg>
            <use xlink:href="#svgIconClose" />
          </svg>
        </a>
      </div>
      <div class="filter-item filter-item--horizontal filter-item--categories">
        <h3>KATEGORİLER</h3>
        <div class="filter--inner-items">
          <select class="form-control ui-select" name="" id="" v-model="subCategoriesCheckeds">
            <option value="" disabled selected>Kategori Seçin</option>
            <option v-for="subCategory in subCategories" :key="'sub' + subCategory.id" :value="subCategory.id">{{ subCategory.name }}</option>
          </select>
        </div>
      </div>
      <div class="filter-item filter-item--horizontal filter-item--functions" v-if="functions.length > 0">
        <h3>FONKSİYONLAR</h3>
        <div class="filter--inner-items">
          <label v-for="functionItem in functions" :key="'func' + functionItem.id" :for="'functionCheck' + functionItem.id">
            <input type="checkbox" :id="'functionCheck' + functionItem.id" :value="functionItem.id" v-model="functionsCheckeds">
            <img :src="functionItem.photo" width="150" alt="">
          </label>
        </div>
      </div>
      <div class="filter-item filter-item--horizontal filter-item--series" v-if="series.length > 0">
        <h3>SERİLER</h3>
        <div class="filter--inner-items">
          <label v-for="serieItem in series" :key="'serie' + serieItem.id" :for="'functionCheck' + serieItem.id">
            <input type="checkbox" :id="'functionCheck' + serieItem.id" :value="serieItem.id" v-model="seriesCheckeds">
            <img :src="serieItem.photo" width="150" alt="">
          </label>
        </div>
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
      isOpenFilterItems: false,
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
      };
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
  .filter-control-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1px;
    margin-top: 1px;
    > a,
    > span {
      display: block;
      flex-grow: 1;
      flex-basis: 0;
      text-align: center;
      padding: 12px;
      background: #222;
      color: #fff;
    }
    > span {
      margin-right: 1px;
    }
    a.open-filter-btn {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      text-decoration: none;
      justify-content: center;
      svg {
        display: block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }
  .filter-items {
    .filter--title-bar {
      position: relative;
      padding: 12px;
      background: #222;
      margin-bottom: 1px;
      h2 {
        font-size: 12px;
        font-weight: 300;
        color: #fff;
      }
      a {
        display: block;
        position: absolute;
        right: 12px;
        top: 10px;
        bottom: 10px;
        width: 24px;
        height: 24px;
        padding: 6px;
        overflow: hidden;
        color: #fff;
        svg {
          display: block;
          height: 12px;
          width: 12px;
        }
      }
    }
    .filter-item {
      background: #222;
      color: #fff;
      padding: 12px;
      h3 {
        font-size: 12px;
        font-weight: 300;
        color: #fff;
        padding-bottom: 12px;
        border-bottom: solid 1px #fff;
      }
      &.filter-item--functions,
      &.filter-item--series {

      }
    }
  }
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
