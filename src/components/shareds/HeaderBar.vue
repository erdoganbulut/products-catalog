<template>
  <header>
    <b-navbar toggleable="md">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand :href="'#/' + lang.url">Logo</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item :href="'#/' + lang.url">{{ lang.header_home_url_text }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" :placeholder="lang.header_search_input_text" />
            <b-button size="sm" class="my-2 my-sm-0" type="submit">{{ lang.header_search_button_text }}</b-button>
          </b-nav-form>

          <b-nav-item-dropdown :text="lang.header_language_button_text" right>
            <b-dropdown-item v-for="langItem in langList.langItems" :href="'#/' + langItem.url">{{ langItem.name }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderBar',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      langList: 'lang/langList',
      langListStatus: 'lang/langListStatus',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';
</style>
