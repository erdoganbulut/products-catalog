<template>
  <section class="catalog-list-component">
    <div class="container">
      <div class="catalog-items">
        <div class="catalog-item" v-for="catalog in catalogs.catalogItems">
          <router-link :to="'/' + lang.url + '/catalog/' + catalog.url" class="catalog-item-inner">
            <img :src="catalog.photo" :alt="catalog.name">
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CatalogList',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      catalogs: 'catalogs/catalogs',
      status: 'catalogs/status',
      response: 'catalogs/response',
      lang: 'lang/lang',
    }),
  },
  methods: {
    getCatalog() {
      this.$store.dispatch('catalogs/getCatalog');
    },
  },
  mounted() {
    this.getCatalog();
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
      padding: 15px;
      @media (min-width: 768px) {
        width: 50%;
      }
      .catalog-item-inner {
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
