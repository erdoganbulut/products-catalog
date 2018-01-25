<template>
  <section class="category-content-component">
    <div class="filter-control-bar">
      <span class="product-amount--text">{{ products.length }} {{ lang.products_product }}</span>
      <a href="javascript:;" class="open-filter-btn" v-on:click="isOpenFilterItems = !isOpenFilterItems">
        <svg>
          <use xlink:href="#svgIconFilter" />
        </svg>
        <span>{{ lang.filtre_baslik }}</span>
      </a>
    </div>
    <div class="filter-items" v-show="isOpenFilterItems">
      <div class="filter--title-bar">
        <h2>{{ lang.filtre_baslik_2 }}</h2>
        <a href="javascript:;" class="close-filter-btn" v-on:click="isOpenFilterItems = !isOpenFilterItems">
          <svg>
            <use xlink:href="#svgIconClose" />
          </svg>
        </a>
      </div>
      <div class="filter-item filter-item--horizontal filter-item--categories">
        <h3>{{ lang.filtre_kategoriler }}</h3>
        <div class="filter--inner-items">
          <select class="form-control ui-select" name="" id="" v-model="subCategoriesCheckeds">
            <option value="" disabled selected>{{ lang.filtre_kategori_sec }}</option>
            <option v-for="subCategory in subCategories" :key="'sub' + subCategory.id" :value="subCategory.id">{{ subCategory.name }}</option>
          </select>
        </div>
      </div>
      <div class="filter-item filter-item--horizontal filter-item--functions" v-if="functions.length > 0">
        <h3>{{ lang.filtre_fonksiyonlar }}</h3>
        <div class="filter--inner-items">
          <div class="filter--inner-item" v-for="functionItem in functions" :key="'func' + functionItem.id">
            <input type="checkbox" :id="'functionCheck' + functionItem.id" :value="functionItem.id" v-model="functionsCheckeds">
            <label :for="'functionCheck' + functionItem.id">
              <img :src="functionItem.photo" alt="">
            </label>
          </div>
        </div>
      </div>
      <div class="filter-item filter-item--horizontal filter-item--series" v-if="series.length > 0">
        <h3>{{ lang.filtre_seriler }}</h3>
        <div class="filter--inner-items">
          <div class="filter--inner-item" v-for="serieItem in series" :key="'func' + serieItem.id">
            <input type="checkbox" :id="'functionCheck' + serieItem.id" :value="serieItem.id" v-model="seriesCheckeds">
            <label :for="'functionCheck' + serieItem.id">
              <img :src="serieItem.photo" alt="">
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="serie-items">
      <div class="serie-item" v-for="(pSerie, index) in productsGrouped4Series" :key="'pSerie' + index">
        <div class="info-bar">
          <h3>{{ pSerie.name }}</h3>
        </div>
        <div class="product-items" v-if="status === 'done'">
          <router-link v-for="product in pSerie.items.slice(0, pSerie.max)" :key="product.id" :to="'/' + lang.url + '/product/' + product.slug" class="product-item">
            <span class="product-item--inner">
              <img :src="product.photo" alt="">
              <span class="product-item--info"><span v-html="product.sku"></span><br><span v-html="product.name"></span></span>
            </span>
          </router-link>
          <a class="product-item is-more-items-text" href="javascript:;" v-if="pSerie.items.length > pSerie.max" v-on:click="pSerie.max = pSerie.items.length"><span>+{{ pSerie.items.length - pSerie.max }}<br>{{ lang.products_product }}</span></a>
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
      productsGrouped4Series: [],
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
      resetFunctions: 'functions/resetFunctions',
      getSeries: 'series/getSeries',
      resetSeries: 'series/resetSeries',
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
    fillProductsGrouped4Series() {
      let productsGrouped4Series = [];
      window.$lodash.forEach(window.$lodash.groupBy(this.products, 'series.name'), (val, key) => {
        productsGrouped4Series.push({ name: key, items: val, max: 5 });
      });
      productsGrouped4Series = window.$lodash.orderBy(productsGrouped4Series, ['name']);
      this.productsGrouped4Series = productsGrouped4Series;
    },
  },
  mounted() {
    this.resetFunctions();
    this.resetSeries();
    if (this.catalogStatus !== 'done') this.getCatalog();
    else this.getCategoriesIsDoneCatalog();
    this.fillProductsGrouped4Series();
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
    products() {
      this.fillProductsGrouped4Series();
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
        .filter--inner-items {
          display: block;
          overflow: auto;
          white-space: nowrap;
          .filter--inner-item {
            display: inline-block;
            width: 40%;
            position: relative;
          }
          input {
            display: none;
            &:checked {
              + label {
                &:after {
                  background: transparent;
                }
              }
            }
          }
          label {
            display: block;
            position: relative;
            &:after {
              display: block;
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
            }
            img {
              display: block;
              width: 100%;
            }
          }
        }
      }
    }
  }
  .serie-items {
    .serie-item {
      .info-bar {
        display: block;
        background:#C31B2E;
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
        .product-item {
          display: block;
          width: 50%;
          padding: 20px 5px;
          color: inherit;
          text-decoration: none;
          border-bottom: solid 1px #D8D8D8;
          &.is-more-items-text {
            font-size: 24px;
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
          }
          &:nth-child(odd) {
            border-right: solid 1px #D8D8D8;
          }
          &:nth-child(1) {
            border-top: solid 1px #D8D8D8;
          }
          &:nth-child(2) {
            border-top: solid 1px #D8D8D8;
          }
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
              margin-bottom: 30px;
            }
            .product-item--info {
              display: block;
              margin: 0;
              font-size: 12px;
              color: inherit;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
