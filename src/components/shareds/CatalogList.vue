<template>
  <section class="catalog-list-component">
    <div class="catalog-items">
      <div class="catalog-item" v-for="catalog in catalogs">
        <router-link :to="'/' + lang.url + '/catalog/' + catalog.url" class="catalog-item-inner">
          <img :src="catalog.photo" :alt="catalog.name">
          <span class="overlay">
            <span class="overlay-inner">
              <span class="title">{{ catalog.name }}</span>
              <span class="desc">Kataloğu aç</span>
            </span>
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CatalogList',
  data() {
    return {
      selectedCatalogId: '',
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
    ...mapActions({
      getCatalog: 'catalogs/getCatalog',
    }),
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
    //margin: 0 -15px; // container paddings use item padding
    //padding: 15px 0;
    .catalog-item {
      display: block;
      width: 100%;
      padding: 1px 0;
      @media (min-width: 768px) {
        width: 50%;
      }
      .catalog-item-inner {
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
