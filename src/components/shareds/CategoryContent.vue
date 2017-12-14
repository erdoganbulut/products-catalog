<template>
  <section class="category-content-component">
    <div class="container">
      <div class="serie-items">
        <div class="serie-item">
          <div class="info-bar">
            <h3>Serie Name</h3>
          </div>
          <div class="product-items">
            <router-link v-for="product in products.productItems.slice(0, 5)" to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
          </div>
        </div>
        <div class="serie-item">
          <div class="info-bar">
            <h3>Serie Name</h3>
          </div>
          <div class="product-items">
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item product--more-products">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=15MoreProducts" alt="">
              </span>
            </router-link>
          </div>
        </div>
        <div class="serie-item">
          <div class="info-bar">
            <h3>Serie Name</h3>
          </div>
          <div class="product-items">
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=ProductItem" alt="">
              </span>
            </router-link>
            <router-link to="/" class="product-item product--more-products">
              <span class="product-item--inner">
                <img src="http://placehold.it/540x540?text=15MoreProducts" alt="">
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CategoryContent',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      products: 'category/products',
      status: 'category/status',
      response: 'category/response',
      lang: 'lang/lang',
    }),
  },
  methods: {
    getCategory() {
      this.$store.dispatch('category/getCategory');
    },
  },
  mounted() {
    this.getCategory();
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
