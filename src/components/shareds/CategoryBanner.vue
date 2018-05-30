<template>

  <section class="category-banner-component" v-if="selectedCategory !== ''" :style="`background-image: url(${selectedCategory.banner})`">
  <div class="pb-carousel-outer">
      <div class="pb-carousel--items">
        <div class="pb-carousel--item" v-for="(carouselItem, index) in carousel" :key="`carouselItem${index}`" :style="`background-image: url(${carouselItem.photo});`" v-bind:class="{'active': carouselItem.isActive }"></div>
      </div>
    </div>
    <div class="overlay">
      <h1 v-html="selectedCategory.name"></h1>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CategoryBanner',
  data() {
    return {
      selectedCatalog: '',
      selectedCategory: '',
      isCategories: false,
      carousel: [],
      carouselInterval: '',
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
    getCategoryIsDoneCategories() {
      if (this.isCategories) {
        if (this.status === 'done' && this.categories.length > 0) {
          this.selectedCategory = JSON.parse(JSON.stringify(
                                    window.$lodash.find(
                                      this.categories, { url: this.$route.params.category })));
        }
      }
    },
    startCarousel() {
      if (typeof this.selectedCategory.carousel !== 'undefined') {
        const carousel = [];
        window.$lodash.forEach(this.selectedCategory.carousel, (val, index) => {
          carousel.push({ photo: val, isActive: index === 0 });
        });
        this.carousel = carousel;
      }
      this.carouselInterval = setInterval(() => {
        if (this.carousel.length > 0) this.nextCarousel();
      }, 5000);
    },
    nextCarousel() {
      clearInterval(this.carouselInterval);
      const activeIndex = window.$lodash.findIndex(this.carousel, { isActive: true });
      const newIndex = activeIndex >= this.carousel.length - 1 ? 0 : activeIndex + 1;
      this.carousel[activeIndex].isActive = false;
      this.carousel[newIndex].isActive = true;
      this.carouselInterval = setInterval(() => {
        if (this.carousel.length > 0) this.nextCarousel();
      }, 5000);
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
      this.getCategoryIsDoneCategories();
      this.startCarousel();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.category-banner-component {
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  @media (max-width: 767px) {
    background-image: none !important;
  }
  @media (min-width: 768px) {
    height: 80vh;
    background-image: none !important;
  }
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 40px;
    color: #fff;
    h1 {
      font-weight: 300;
      font-size: 32px;
    }
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    @media (min-width: 768px) {
      display: none;
      background-image: none !important;
    }
  }
  .pb-carousel-outer {
    width: 100%;
    display: block;
    position: relative;
    padding-bottom: 56.25%;
    backface-visibility: hidden;
    @media (min-width: 768px) {
      height: 80vh;
    }

    .pb-carousel--items {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .pb-carousel--item {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s;
        transition-delay: 0.5s;
        @media (max-width: 767px) {
          top: 0 !important;
        }
        @media (min-width: 768px) {
          height: 100vh;
          bottom: auto;
        }
        &.active {
          opacity: 1;
          visibility: visible;
          transition-delay: 0s;
        }
      }
    }
  }
}
</style>
