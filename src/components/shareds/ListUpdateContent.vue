<template>
  <section class="list-update-component">
    <div class="container">
      <button v-on:click="handleClickDelete">sil</button>
      <form v-on:submit.prevent="handleSubmit">
        <label>{{ lang.shortlist_ad }}</label>
        <input class="form-control" type="text" v-model="newList.name">
        <label>{{ lang.shortlist_aciklama }}</label>
        <textarea class="form-control" v-model="newList.description"></textarea>
        <label>{{ lang.shortlist_email }}</label>
        <input class="form-control" type="text" v-model="newList.email">
        <label>{{ lang.shortlist_durum }}</label>
        <select class="form-control" v-model="newList.status">
          <option value="lang.shortlist_teklif">{{ lang.shortlist_teklif }}</option>
          <option value="lang.shortlist_donus">{{ lang.shortlist_donus }}</option>
          <option value="lang.shortlist_onay">{{ lang.shortlist_onay }}</option>
        </select>
        <label>{{ lang.shortlist_para_birimi }}</label>
        <select class="form-control" v-model="newList.currency">
          <option>TRY</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
        <label>{{ lang.shortlist_fiyat_goster }}</label>
        <input type="checkbox" v-model="newList.showprice"> {{ lang.shortlist_fiyat_goster }}
        <button type="submit">{{ lang.shortlist_guncelle }}</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ListUpdateContent',
  data() {
    return {
      newList: {
        name: '',
        description: '',
        status: '',
        currency: '',
        showprice: false,
        email: '',
        details: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      langList: 'lang/langList',
      langListStatus: 'lang/langListStatus',
      accesstoken: 'auth/accesstoken',
      lists: 'list/lists',
      listsStatus: 'list/status',
    }),
  },
  methods: {
    ...mapActions({
      getProduct: 'product/getProduct',
      getLists: 'list/getLists',
      addList: 'list/addList',
      updateList: 'list/updateList',
      deleteList: 'list/deleteList',
    }),
    handleSubmit() {
      const params = {
        accesstoken: this.accesstoken,
        updateList: this.newList,
      };
      this.updateList(params);
    },
    handleClickDelete() {
      const params = {
        accesstoken: this.accesstoken,
        deleteList: { id: this.newList.id },
      };
      this.deleteList(params);
    },
  },
  mounted() {
    if (this.accesstoken.length > 0) this.getLists(this.accesstoken);
  },
  watch: {
    accesstoken() {
      if (this.accesstoken.length > 0) this.getLists(this.accesstoken);
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
    lists() {
      if (typeof this.lists[this.$route.params.listindex] !== 'undefined') {
        this.newList = this.lists[this.$route.params.listindex];
      } else {
        this.$router.push('/en/user');
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.list-update-component {

}
</style>
