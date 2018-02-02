<template>
  <section class="breadcrumb-component">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" v-if="$route.meta.page === 'start'">
        <li class="breadcrumb-item active" aria-current="page">{{ lang.bread_katalogsecim }}</li>
      </ol>
      <ol class="breadcrumb" v-if="$route.meta.page === 'catalog'">
        <li class="breadcrumb-item"><router-link :to="'/' + lang.url + '/'">{{ lang.bread_katalogsecim }}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ $route.params.catalog }}</li>
      </ol>
      <ol class="breadcrumb" v-if="$route.meta.page === 'category'">
        <li class="breadcrumb-item"><router-link :to="'/' + lang.url + '/'">{{ lang.bread_katalogsecim }}</router-link></li>
        <li class="breadcrumb-item"><router-link :to="'/' + lang.url + '/catalog/' + $route.params.catalog">{{ $route.params.catalog }}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ $route.params.category }}</li>
      </ol>
      <ol class="breadcrumb" v-if="$route.meta.page === 'product'">
        <li class="breadcrumb-item"><router-link :to="'/' + lang.url + '/'">{{ lang.bread_katalogsecim }}</router-link></li>
        <li class="breadcrumb-item"><router-link :to="`/${lang.url}/catalog/${product.breadcrumb.catalog.url}`">{{ product.breadcrumb.catalog.name }}</router-link></li>
        <li class="breadcrumb-item"><router-link :to="`/${lang.url}/catalog/${product.breadcrumb.catalog.url}/category/${product.breadcrumb.category.url}`">{{ product.breadcrumb.category.name }}</router-link></li>
        <li v-if="product.breadcrumb.category.name !== product.breadcrumb.subcategory.name" class="breadcrumb-item"><router-link :to="`/${lang.url}/catalog/${product.breadcrumb.catalog.url}/category/${product.breadcrumb.category.url}?sub=${product.breadcrumb.subcategory.id}`">{{ product.breadcrumb.subcategory.name }}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page" v-if="typeof product.name !== 'undefined'">{{ product.name }}</li>
      </ol>
      <ol class="breadcrumb" v-if="$route.meta.page === 'user'">
        <li class="breadcrumb-item"><router-link :to="'/' + lang.url + '/'">{{ lang.bread_katalogsecim }}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ lang.bread_profil }}</li>
      </ol>
      <ol class="breadcrumb" v-if="$route.meta.page === 'login'">
        <li class="breadcrumb-item"><router-link :to="'/' + lang.url + '/'">{{ lang.bread_katalogsecim }}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ lang.breadcrumb_sign_in }}</li>
      </ol>
      <ol class="breadcrumb" v-if="$route.meta.page === 'about'">
        <li class="breadcrumb-item"><router-link :to="'/' + lang.url + '/'">{{ lang.bread_katalogsecim }}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ lang.about_title }}</li>
      </ol>
      <ol class="breadcrumb" v-if="$route.meta.page === 'ListAdd'">
        <li class="breadcrumb-item"><router-link :to="'/' + lang.url + '/'">{{ lang.bread_katalogsecim }}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ lang.shortlist_yeni_liste }}</li>
      </ol>
      <ol class="breadcrumb" v-if="$route.meta.page === 'ListUpdate' && typeof list !== 'undefined'">
        <li class="breadcrumb-item"><router-link :to="'/' + lang.url + '/'">{{ lang.bread_katalogsecim }}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ list[$route.params.listindex].name }}</li>
      </ol>
    </nav>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Breadcrumb',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      langList: 'lang/langList',
      langListStatus: 'lang/langListStatus',
      product: 'product/product',
      list: 'list/lists',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.breadcrumb-component {
  nav {
    margin: 0;
    ol,
    ul {
      margin: 0;
    }
    .breadcrumb {
      font-size: 12px;
      border-radius: 0px;
      background: #FAFAFA;
      color: #1A1A1A;
      padding-left: 35px;
      .breadcrumb-item {
        text-transform: uppercase;
      }
      a {
        color: inherit;
        text-decoration: none;
        &:hover {
          color: #B40023;
        }
      }
      .breadcrumb-item {
        &.active {
          color: #B40023;
        }
        & + .breadcrumb-item {
          padding-left: 22px;
          position: relative;
          &::before {
            content: "\f105";
            font-family: FontAwesome;
            font-size: 18px;
            position: absolute;
            left: 0;
            top: -5px;
            color: #1A1A1A;
          }
        }
      }
    }
  }
}
</style>
