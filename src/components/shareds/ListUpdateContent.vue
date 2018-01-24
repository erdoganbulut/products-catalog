<template>
  <section class="list-update-component">
    <div class="container">
      <button v-on:click="handleClickDelete">sil</button>
      <form v-on:submit.prevent="handleSubmit">
        <label>name</label>
        <input class="form-control" type="text" v-model="newList.name">
        <label>description</label>
        <textarea class="form-control" v-model="newList.description"></textarea>
        <label>email</label>
        <input class="form-control" type="text" v-model="newList.email">
        <label>status</label>
        <select class="form-control" v-model="newList.status">
          <option value="Teklif Aşamasında">Teklif Aşamasında</option>
          <option value="Dönüş Bekleniyor">Dönüş Bekleniyor</option>
          <option value="Onaylandı">Onaylandı</option>
        </select>
        <label>para birimi</label>
        <select class="form-control" v-model="newList.currency">
          <option>TRY</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
        <label>is show price</label>
        <input type="checkbox" v-model="newList.showprice"> Parayı göster
        <button type="submit">Gönder</button>
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
