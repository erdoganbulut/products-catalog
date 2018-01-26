<template>
  <section class="product-content-component" v-if="productStatus === 'done'">
    <div class="container flex-container">
      <div class="product-image">
        <img :src="product.photo" alt="">
      </div>
      <div class="product-info-areas">
        <div class="product-top-info">
          <h1>
            <span class="product-serie-name">{{ product.series.name }}</span>
            <span class="product-code">{{ product.sku }}</span> -
            <span class="product-name">{{ product.name }}</span>
          </h1>
          <div class="package-info">
            <p>{{ lang.product_sku_paketleme }} <span>{{ product.sku }}</span></p>
            <p class="package-inner-outer-text">{{ product.innercode.code }}-{{ product.outercode.code }}</p>
          </div>
          <div class="product-icons">
            <img v-for="(icon, index) in product.icons" :key="'productIcons' + index" height="25" :src="icon" alt="">
          </div>
        </div>
        <div class="technical-detail">
          <h2>
            <a v-b-toggle.collapseTechnical href="javascript:;">
              {{ lang.product_technical }}
              <svg>
                <use xlink:href="#svgIconMinus" transform="translate(1)" fill="#C31B2E"/>
              </svg>
            </a>
          </h2>
          <b-collapse class="ui-collapse" id="collapseTechnical">
            <div class="ui-collapse--inner">
              <div class="technical-detail-content">
                <table>
                  <tr>
                    <td>{{ lang.product_volume }}:</td>
                    <td>&nbsp;&nbsp;&nbsp;<span v-for="(vol, index) in product.volume" :key="'vol' + index">{{ vol }} / </span> cc.</td>
                  </tr>
                  <tr>
                    <td>{{ lang.product_volumeUS }}:</td>
                    <td>&nbsp;&nbsp;&nbsp;<span v-for="(vol, index) in product.volume" :key="'volus' + index">{{ parseFloat(vol / 29.5735296875).toFixed(2) }} / </span> US oz.</td>
                  </tr>
                  <tr>
                    <td>{{ lang.product_volumeUK }}:</td>
                    <td>&nbsp;&nbsp;&nbsp;<span v-for="(vol, index) in product.volume" :key="'voluk' + index">{{ parseFloat(vol / 28.4130625).toFixed(2) }} / </span> oz.</td>
                  </tr>
                  <tr>
                    <td>{{ lang.product_yukseklik }}:</td>
                    <td>&nbsp;&nbsp;&nbsp;{{ product.height[0] }} mm.</td>
                  </tr>
                  <tr>
                    <td>{{ lang.product_agiz_capi }}:</td>
                    <td>&nbsp;&nbsp;&nbsp;{{ product.edag[0] }} mm.</td>
                  </tr>
                  <tr>
                    <td>{{ lang.product_taban_capi }}:</td>
                    <td>&nbsp;&nbsp;&nbsp;{{ product.base[0] }} mm.</td>
                  </tr>
                  <tr>
                    <td>{{ lang.product_maxwidth }}:</td>
                    <td>&nbsp;&nbsp;&nbsp;{{ product.width[0] }} mm.</td>
                  </tr>
                </table>
              </div>
            </div>
          </b-collapse>
        </div>
        <div class="product-share">
          <h2>
            <a v-b-toggle.collapseSocial href="javascript:;">
              {{ lang.product_share }}
              <svg>
                <use xlink:href="#svgIconMinus" transform="translate(1)" fill="#C31B2E"/>
              </svg>
            </a>
          </h2>
          <b-collapse class="ui-collapse" id="collapseSocial">
            <div class="ui-collapse--inner">
              <div class="product-share-content">
                <a href="javascript:;" class="social-link social-link--facebook"><i class="fa fa-facebook"></i></a>
                <a href="javascript:;" class="social-link social-link--twitter"><i class="fa fa-twitter"></i></a>
                <a href="javascript:;" class="social-link social-link-mail"><i class="fa fa-envelope-o"></i></a>
              </div>
            </div>
          </b-collapse>
        </div>
        <div class="add-to-favorite" v-if="typeof user.id !== 'undefined'">
          <a href="javascript:;" v-on:click="handleAdd2Fav()" class="btn btn-danger btn-block"><i class="fa fa-heart-o"></i> {{ lang.product_add2shortList }}</a>
          <select class="form-control ui-select" v-model="selectedList">
            <option selected value="" disabled>{{ lang.shorlist_select_text }}</option>
            <option v-if="lists.length > 0" v-for="(list, index) in lists" :key="'listp' + index" :value="index">{{list.name}}</option>
            <option value="-1">{{ lang.product_create_list }}</option>
          </select>
          <input v-model="createListName" v-if="selectedList === '-1'" type="text" placeholder="list name" class="form-control">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductContent',
  data() {
    return {
      selectedList: '',
      createListName: '',
    };
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      product: 'product/product',
      productStatus: 'product/status',
      accesstoken: 'auth/accesstoken',
      lists: 'list/lists',
      listsStatus: 'list/status',
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      getProduct: 'product/getProduct',
      getLists: 'list/getLists',
      addList: 'list/addList',
      updateList: 'list/updateList',
    }),
    handleAdd2Fav() {
      const params = {
        accesstoken: this.accesstoken,
      };
      if (this.selectedList === '-1') {
        params.newList = {
          name: this.createListName,
          status: 'waiting for repoend',
          currency: 'USD',
          description: '',
          email: 'amg2255@gmail.com',
          details: [
            {
              product: parseInt(this.product.id, 10),
              quantity: 1,
            },
          ],
        };
        this.addList(params);
        this.selectedList = `${this.lists.length}`;
      } else {
        params.updateList = this.lists[parseInt(this.selectedList, 10)];
        params.updateList.currency = "EUR";
        params.updateList.email = "asasa@asasa.com";
        params.updateList.details.push({ product: parseInt(this.product.id, 10), quantity: 1, });
        this.updateList(params);
      }
    },
  },
  mounted() {
    if (this.accesstoken.length > 0) this.getLists(this.accesstoken);
    const params = {
      slug: this.$route.params.productslug,
    };
    this.getProduct(params);
  },
  watch: {
    accesstoken() {
      if (this.accesstoken.length > 0) this.getLists(this.accesstoken);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.product-content-component {
  padding: 0 15px;
  .flex-container {
    @media (min-width: 992px) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .product-info-areas,
      .product-image {
        flex-grow: 1;
        flex-basis: 0;
      }
      .product-image {
        margin-right: 20px;
      }
    }
  }
  .product-image {
    padding: 15px 0;
    border-bottom: 1px solid #D8D8D8;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .product-top-info {
    padding: 15px 0;
    h1 {
      font-size: 14px;
      color: #B40023;
      margin: 0;
      span {
        &.product-serie-name {
          display: block;
        }
      }
    }
  }
  .package-info {
    padding: 15px 0;
    p {
      margin: 0;
      font-size: 12px;
    }
  }
  .product-icons {
    img {
      margin-right: 10px;
    }
  }
  .technical-detail,
  .product-share {
    padding-bottom: 20px;
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
  .add-to-favorite {
    margin-bottom: 10px;
    a {
      margin-bottom: 10px;
    }
    select {
      margin-bottom: 10px;
    }
    input {
      margin-bottom: 10px;
      font-size: 0.75rem;
    }
  }
}
</style>
