<template>
  <section class="user-content-component">
    <div class="container">
      {{ lang.profil_welcome }}lang. {{ user.name }}
      <div v-for="(list, index) in lists" :key="'listitem' + index">{{ list.name }} <a href="javascript:;" v-on:click="handleDuplicate(index)">{{ lang.shortlist_cogalt }}</a><router-link :to="`/${lang.url}/list/update/${index}`">{{ lang.shortlist_duzenle }}</router-link></div>
      <p><router-link :to="`/${lang.url}/list/add`">{{ lang.shortlist_yeni_liste }}</router-link></p>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserContent',
  data() {
    return {
      tokenparams: {
        username: '',
        password: '',
      },
      error: '',
    };
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      langList: 'lang/langList',
      langListStatus: 'lang/langListStatus',
      accesstoken: 'auth/accesstoken',
      user: 'auth/user',
      lists: 'list/lists',
      listsStatus: 'list/status',
    }),
  },
  methods: {
    ...mapActions({
      getUser: 'auth/getUser',
      getProduct: 'product/getProduct',
      getLists: 'list/getLists',
      addList: 'list/addList',
      updateList: 'list/updateList',
    }),
    handleDuplicate(index) {
      const params = {
        accesstoken: this.accesstoken,
        newList: this.lists[index],
      };
      this.addList(params);
    },
  },
  mounted() {
    if (this.accesstoken.length > 0) {
      this.getLists(this.accesstoken);
      this.getUser(this.accesstoken);
    }
  },
  watch: {
    accesstoken() {
      if (this.accesstoken.length > 0) {
        this.getLists(this.accesstoken);
        this.getUser(this.accesstoken);
      }
    },
    authStatus() {
      if (this.authStatus === 'done') {
        this.$router.push('/en');
      } else if(this.authStatus === 'error') {
        this.error = this.authResponse.body.message;
      } else {
        this.error = '';
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.user-content-component {

}
</style>
