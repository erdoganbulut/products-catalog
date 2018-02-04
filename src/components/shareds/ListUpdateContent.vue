<template>
  <section class="list-update-component">
    <div class="container">
      <div class="popup--delete" v-if="isDeletePopup">
        <div class="container">
          <h3>{{ newList.name }}</h3>
          <p>{{ lang.auw_delete_sl }}</p>
          <div class="popup--buttons">
            <button class="btn" v-on:click="isDeletePopup = false">{{ lang.filtre_temper_hayir }}</button>
            <button class="btn" v-on:click="handleClickDelete">{{ lang.filtre_temper_evet }}</button>
          </div>
        </div>
      </div>

      <form v-on:submit.prevent="handleSubmit">
        <div class="user-list-add--form-item" v-if="newList.code">
          <label>{{ lang.shortlist_create }}</label>
          <p v-if="newList.create">{{ newList.create }}</p>
        </div>
        <div class="user-list-add--form-item" v-if="newList.code">
          <label>{{ lang.shortlist_code }}</label>
           <p v-if="newList.code">{{ newList.code }}</p>
        </div>
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
        <div class="user-list-add--form-item" v-if="false">
          <label>{{ lang.shortlist_para_birimi }}</label>
          <select class="form-control" v-model="newList.currency">
            <option>TRY</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>
        <div class="user-list-add--form-item">
          <label>{{ lang.shortlist_fiyat_goster }}</label>
          <div class="checkbox--yes-no">
            <input name="showPriceInput" v-model="newList.showprice" type="checkbox" class="form-control">
            <div>
              <label v-on:click="newList.showprice = true" v-bind:class="{'active': newList.showprice}">{{ lang.filtre_temper_evet }}</label>
            </div>
            <div>
              <label v-on:click="newList.showprice = false" v-bind:class="{'active': !newList.showprice}" class="is--no">{{ lang.filtre_temper_hayir }}</label>
            </div>
          </div>
        </div>
        <div class="delete-email-controls">
          <button class="btn" v-on:click="isDeletePopup = true"><i class="fa fa-close"></i></button>
          <button class="btn" v-b-toggle.emailSendCollapse><i class="fa fa-envelope-o"></i></button>
        </div>
        <b-collapse class="ui-collapse collapse--email-send" id="emailSendCollapse">
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
        <div class="user-list-add--form-item">
          <div class="product-list">
            <div class="product-list--item" v-for="(detail, index) in newList.details" :key="`detail${index}`">
              <img :src="detail.product.photo" alt="">
              <div class="product--content">
                <h3>{{ detail.product.name }}<br>{{ detail.product.pattern }} - {{ detail.product.sku }}</h3>
                <div class="product--control">
                  <div class="product--control__item">
                    <label>{{ lang.fiyat }}: $</label>
                    <input type="text" class="form-control" v-model="detail.price">
                  </div>
                  <div class="product--control__item">
                    <label>{{ lang.sl_adet }}</label>
                    <input type="number" class="form-control" v-model="detail.quantity">
                  </div>
                  <div class="product--control__item">
                    <a v-on:click="newList.details.splice(index, 1)" class="btn"><i class="fa fa-close"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="sepet--info">
          <br>
          {{ lang.sl_listenizde }}:<br>{{ lang.sl_total_of }} {{ totalParca }} {{ lang.sl_parca }}<br>
          {{ newList.details.length }} {{ lang.sl_urun_b }}<br>
          <br>
          {{ lang.sl_listenizin_td }} $ {{ totalPrice }}.
        </p>
        <div class="user-list-add--form-item">
          <button class="btn btn-block btn-lg btn--red" type="submit">{{ lang.shortlist_shortlist_guncelle }}</button>
        </div>
        <p class="text--form-eror" v-if="isError"><br>{{ lang.sl_error_update }}</p>
        <p class="text--form-success text-center text-success" v-if="isUpdated"><br>{{ lang.sl_success_update }}</p>
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
      isDeletePopup: false,
      isUpdated: false,
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
    totalPrice() {
      let total = 0;
      window.$lodash.forEach(this.newList.details, (val) => {
        const ptotal = parseInt(val.price * val.quantity, 10);
        total += parseInt(ptotal, 10);
      });
      return total;
    },
    totalParca() {
      let total = 0;
      window.$lodash.forEach(this.newList.details, (val) => {
        total += parseInt(val.quantity, 10);
      });
      return total;
    },
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
      params.updateList.details = window.$lodash.forEach(params.updateList.details, (val) => {
        val.product = val.product.id;
      });
      this.updateList(params).then((apireturn) => {
        this.isUpdated = apireturn;
      });
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
      if (this.listsStatus === 'deleted') {
        this.$router.push(`/${this.lang.url}/user`);
        console.log('listsStatus');
      } else if (this.listsStatus !== 'done' && this.listsStatus !== 'updated') {
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
  padding-top: 30px;
  .popup--delete {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.85);
    padding: 100px 0;
    text-align: center;
    font-size: 0.75rem;
    h3 {
      font-size: 0.75rem;
    }
    button {
      font-size: 0.75rem;
      &:first-child {
        border-color: rgba(195, 27, 46, 1);
        background: rgba(195, 27, 46, 0.3);
        color: rgba(195, 27, 46, 1);
      }
      &:last-child {
        border-color: rgba(67, 170, 139, 1);
        background: rgba(67, 170, 139, 0.3);
        color: rgba(67, 170, 139, 1);
      }
    }
  }
  font-size: 12px;
  .collapse--email-send {
    margin-bottom: 30px;
  }
  .delete-email-controls {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    button {
      display: block;
      flex-grow: 1;
      flex-basis: 0;
      background: #222222;
      color: #fff;
      &:first-child {
        margin-right: 1px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:last-child {
        margin-right: 0px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .user-list-add--form-item {
    padding: 5px 0;
    input, select, label, textarea {
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
              label {
                margin-bottom: 4px;
              }
              input {
                min-width: 0;
              }
              button, a {
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
