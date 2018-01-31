<template>
  <section class="user-content-component">
    <div class="container">
      <div class="welcome--area">
        <span class="welcome--icon">
          <svg>
            <use xlink:href="#svgIconProfile" />
          </svg>
        </span>
        <p>{{ lang.profil_welcome }}<br><span>{{ user.name }}</span></p>
      </div>
      <div class="collapse--area">
        <h2>
          <a v-b-toggle.collapseUserList href="javascript:;">
            {{ lang.product_technical }}
            <svg>
              <use xlink:href="#svgIconMinus" transform="translate(1)" fill="#C31B2E"/>
            </svg>
          </a>
        </h2>
        <b-collapse class="ui-collapse" id="collapseUserList">
          <div class="ui-collapse--inner">
            <div class="user--collapse-content">
              <div class="user-list--item" v-for="(list, index) in lists" :key="'listitem' + index"><span>{{ list.name }}</span><span><a href="javascript:;" v-on:click="handleDuplicate(index)">{{ lang.shortlist_cogalt }}</a><router-link :to="`/${lang.url}/list/update/${index}`">{{ lang.shortlist_duzenle }}</router-link></span></div>
            </div>
          </div>
        </b-collapse>
      </div>

      <p><router-link class="user-list--create-btn" :to="`/${lang.url}/list/add`"><span class="user-list--create-icon"><i class="fa fa-plus"></i></span><span class="user-list--create-text">{{ lang.shortlist_yeni_liste }}</span></router-link></p>
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
  padding: 30px 0;
  .welcome--area {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .welcome--icon {
      display: block;
      width: 26px;
      height: 26px;
      margin-right: 10px;
      svg {
        display: block;
        width: 30px;
        height: 30px;
      }
    }
    p {
      margin: 0;
      span {
        color: #B40023;
      }
    }
  }
  .collapse--area {
    margin-top: 30px;
    h2 {
      font-size: 12px;
      color: #B40023;
      margin: 0;
      a {
        display: block;
        position: relative;
        color: inherit;
        text-decoration: none;
        border-bottom: 1px solid #D8D8D8;
        padding: 5px 0;
        svg {
          position: absolute;
          right: 10px;
          top: 50%;
          margin-top: -1px;
          display: block;
          height: 2px;
          width: 10px;
        }
      }
    }
    .ui-collapse {
      font-size: 12px;
    }
  }
  .user-list--create-btn {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 15px 0;
    color: #B40023;
    text-decoration: none;
    border-bottom: solid 1px #B40023;
    margin-top: 30px;
    font-size: 12px;
    .user-list--create-icon {
      display: block;
      margin-right: 15px;
      width: 50px;
      height: 50px;
      background: #B40023;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
