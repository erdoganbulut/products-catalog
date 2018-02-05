<template>
  <section class="user-content-component">
    <div class="container">
      <form v-on:submit.prevent="handleSubmit">
        <div class="user-list-add--form-item">
          <label>{{ lang.shortlist_ad }}</label>
          <input class="form-control" type="text" v-model="newList.name">
        </div>
        <div class="user-list-add--form-item">
          <label>{{ lang.shortlist_aciklama }}</label>
          <textarea class="form-control" v-model="newList.description"></textarea>
        </div>
        <div class="user-list-add--form-item">
          <label>{{ lang.shortlist_email }}</label>
          <input class="form-control" type="text" v-model="newList.email">
        </div>
        <div class="user-list-add--form-item">
          <label>{{ lang.shortlist_durum }}</label>
          <select class="form-control ui-select" v-model="newList.status">
            <option value="lang.shortlist_teklif">{{ lang.shortlist_teklif }}</option>
            <option value="lang.shortlist_donus">{{ lang.shortlist_donus }}</option>
            <option value="lang.shortlist_onay">{{ lang.shortlist_onay }}</option>
          </select>
        </div>
        <div class="user-list-add--form-item">
          <label>{{ lang.shortlist_para_birimi }}</label>
          <select class="form-control ui-select" v-model="newList.currency">
            <option>USD</option>
          </select>
        </div>
        <div class="user-list-add--form-item">
          <div class="checkbox--yes-no">
            <input name="showPriceInput" v-model="newList.showprice" type="checkbox" class="form-control">
            <div>
              <label v-on:click="newList.showprice = true" v-bind:class="{'active': newList.showprice}">{{ lang.shortlist_fiyat_goster }}</label>
            </div>
            <div>
              <label v-on:click="newList.showprice = false" v-bind:class="{'active': !newList.showprice}" class="is--no">{{ lang.shortlist_fiyat_gosterme }}</label>
            </div>
          </div>
        </div>
        <div class="user-list-add--form-item">
          <button class="btn btn-block btn-lg btn--red" type="submit">{{ lang.shortlist_shortlist_gonder }}</button>
        </div>
        <p class="text--form-eror" v-if="isError"><br>Bir hata oluştu.</p>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'ListAddContent',
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
      isError: false,
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
    }),
    ...mapMutations({
      receiveStatus: 'list/receiveStatus',
    }),
    handleSubmit() {
      const params = {
        accesstoken: this.accesstoken,
        newList: this.newList,
      };
      this.addList(params);
    },
  },
  mounted() {
    this.receiveStatus('non-request');
    if (this.accesstoken.length > 0) this.getLists(this.accesstoken);
  },
  watch: {
    listsStatus() {
      if (this.listsStatus === 'added') this.$router.push(`/${this.lang.url}/user`);
      else { this.isError = true; }
      if (this.listsStatus === 'done') this.isError = false;
    },
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.user-content-component {
  padding: 30px 0;
  font-size: 12px;
  .user-list-add--form-item {

    padding: 5px 0;
    input, select , textarea {
      font-size: 12px;
    }
  }
  .text--form-eror {
    color: #B40023;
  }
}
</style>
