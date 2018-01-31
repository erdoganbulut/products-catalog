<template>
  <section class="list-update-component">
    <div class="container">
      <div class="delete-email-controls">
        <button class="btn" v-on:click="handleClickDelete"><i class="fa fa-close"></i></button>
        <button class="btn" v-b-toggle.emailSendCollapse><i class="fa fa-envelope-o"></i></button>
      </div>
      <b-collapse class="ui-collapse" id="emailSendCollapse">
        <div class="ui-collapse--inner">
          <div class="user-list-add--form-item">
            <label>E-mail Address</label>
            <input class="form-control" type="text" v-model="sendemailaddress">
          </div>
        </div>
        <div class="user-list-add--form-item">
          <button v-on:click="handleSendEmail()" class="btn btn-block btn-lg btn--red" type="submit">SEND E-MAIL</button>
        </div>
        <div class="user-list-add--form-item" v-if="apireturn !== ''">
          <p>
            <span v-if="apireturn">E-mail gönderildi.</span>
            <span v-if="!apireturn">E-mail gönderilirken hata oluştu.</span>
          </p>
        </div>
      </b-collapse>
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
          <select class="form-control" v-model="newList.status">
            <option value="lang.shortlist_teklif">{{ lang.shortlist_teklif }}</option>
            <option value="lang.shortlist_donus">{{ lang.shortlist_donus }}</option>
            <option value="lang.shortlist_onay">{{ lang.shortlist_onay }}</option>
          </select>
        </div>
        <div class="user-list-add--form-item">
          <label>{{ lang.shortlist_para_birimi }}</label>
          <select class="form-control" v-model="newList.currency">
            <option>TRY</option>
            <option>USD</option>
            <option>EUR</option>
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
          <div class="product-list">
            <div class="product-list--item" v-for="(detail, index) in newList.details" :key="`detail${index}`">
              <img :src="detail.product.photo" alt="">
              <div class="product--content">
                <h3>{{ detail.product.name }} {{ detail.product.pattern }} - {{ detail.product.sku }}</h3>
                <div class="product--control">
                  <div class="product--control__item">
                    <label>Fiyat: ₺</label>
                    <input type="text" class="form-control" value="10" disabled>
                  </div>
                  <div class="product--control__item">
                    <label>Adet</label>
                    <input type="number" class="form-control" v-model="detail.quantity">
                  </div>
                  <div class="product--control__item">
                    <button v-on:click="newList.details.splice(index, 1)" class="btn"><i class="fa fa-close"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="user-list-add--form-item">
          <button class="btn btn-block btn-lg btn--red" type="submit">{{ lang.shortlist_shortlist_guncelle }}</button>
        </div>
        <p class="text--form-eror" v-if="isError"><br>Bir hata oluştu.</p>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

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
      isError: false,
      sendemailaddress: '',
      apireturn: '',
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
      sendEmail: 'list/sendEmail',
    }),
    ...mapMutations({
      receiveStatus: 'list/receiveStatus',
    }),
    handleSendEmail() {
      const params = {
        accesstoken: this.accesstoken,
        email: this.sendemailaddress,
        id: this.newList.id,
      };
      this.sendEmail(params).then((apireturn) => {
        this.apireturn = apireturn;
      });
    },
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
    this.receiveStatus('non-request');
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
        this.$router.push(`/${this.lang.url}/user`);
      }
    },
    listsStatus() {
      if (this.listsStatus === 'updated' || this.listsStatus === 'deleted') {
        this.$router.push(`/${this.lang.url}/user`);
        console.log('listsStatus');
      }
      else if (this.listsStatus !== 'done') {
        this.isError = true;
      } else {
        this.isError = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.list-update-component {
  font-size: 12px;
  .delete-email-controls {
    display: flex;
    flex-wrap: wrap;
    button {
      display: block;
      flex-grow: 1;
      flex-basis: 0;
      background: #222222;
      color: #fff;
      &:first-child {
        margin-right: 5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:last-child {
        margin-right: 5px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .user-list-add--form-item {
    padding: 5px 0;
    input, select, label {
      font-size: 12px;
    }
    .product-list {
      .product-list--item {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        border-bottom: solid 1px#EBEBEB;
        padding-top: 20px;
        padding-bottom: 20px;
        img {
          display: block;
          width: 100px;
          height: 100px;
          height: auto;
          margin-right: 5px;
          border: solid 1px #CED1D2;
        }
        .product--content {
          flex-grow: 1;
          flex-basis: 0;
          h3 {
            margin: 0;
            margin-bottom: 15px;
            margin-left: 10px;
            font-size: 12px;
          }
          .product--control {
            display: flex;
            align-items: flex-end;
            .product--control__item {
              margin-left: 10px;
              input {
                min-width: 0;
              }
              button {
                background: transparent;
                color: #B40023;
                border: solid 1px #CED1D2;
                border-radius: 2px;
                padding-top: 0.20rem;
                padding-bottom: 0.20rem;
              }
            }
          }
        }
      }
    }
  }
  .text--form-eror {
    color: #B40023;
  }
}
</style>
