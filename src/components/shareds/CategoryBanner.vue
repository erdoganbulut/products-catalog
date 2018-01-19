<template>
  <section class="category-banner-component" v-if="selectedCategory !== ''">
    <img :src="selectedCategory.photo" alt="">
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
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.category-banner-component {
  position: relative;
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
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
  }
}
</style>
