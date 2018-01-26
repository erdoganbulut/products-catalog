<template>
  <header v-bind:class="{'is-nav--open': isNavOpen}">
    <div class="header--inner">
      <router-link :to="'/' + lang.url + '/'" class="logo">
        <img src="../../assets/logo.svg" alt="Logo" class="logo-normal">
        <img src="../../assets/logo-w.svg" alt="Logo" class="logo-nav">
      </router-link>
      <div class="right-outer">
        <b-dropdown id="ddown1" :text="lang.url" class="ui-dropdown ui-dropdown--sm">
          <b-dropdown-item v-for="(langItem, index) in langList.langItems" :key="'langlistItem' + index" :href="`#/${langItem.url}`">{{ langItem.name }}</b-dropdown-item>
        </b-dropdown>
        <a href="javascript:;" class="toggle-navigation" v-bind:class="{'active': isNavOpen}" v-on:click="isNavOpen = !isNavOpen">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconHamburger"></use>
          </svg>
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconClose"></use>
          </svg>
        </a>
      </div>
    </div>
    <nav>
      <div class="lists-outer" v-bind:class="[`level-${navLevel}`]">
        <ul>
          <li class="item-type--title">
            <span>MENU</span>
          </li>
          <li v-if="accesstoken !== ''">
            <router-link :to="'/' + lang.url" v-on:click.native="handleClickRouterLink()">
              <span>{{ lang.menu_profil }}</span>
            </router-link>
            <span class="item--icon">
              <svg width="26" height="26">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconProfile"></use>
              </svg>
            </span>
          </li>
          <li v-if="accesstoken !== ''">
            <a href="javascript:;" v-on:click="handleClickRouterLink(); logout();">
              <span>{{ lang.menu_logout }}</span>
            </a>
            <span class="item--icon">
              <svg width="26" height="26">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconProfile"></use>
              </svg>
            </span>
          </li>
          <li v-if="accesstoken === ''">
            <router-link :to="`/${lang.url}/login`" v-on:click.native="handleClickRouterLink()">
              <span>{{ lang.menu_login }}</span>
            </router-link>
            <span class="item--icon">
              <svg width="26" height="26">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconProfile"></use>
              </svg>
            </span>
          </li>
          <li v-for="catalog in menu" :key="'headercatalog' + catalog.id">
            <a href="javascript:;" v-on:click="rightToMenu(2, catalog)">
              <span>{{ catalog.name }}</span>
            </a>
            <span class="item--icon">
              <svg width="7" height="13">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconRight"></use>
              </svg>
            </span>
          </li>
          <li>
            <router-link :to="'/' + lang.url" v-on:click.native="handleClickRouterLink()">
              <span>{{ lang.menu_hakkimizda }}</span>
            </router-link>
          </li>
          <li>
            <router-link :to="'/' + lang.url" v-on:click.native="handleClickRouterLink()">
              <span>{{ lang.menu_iletisim }}</span>
            </router-link>
          </li>
          <li class="item-type--social">
            <a href="/" target="_blank">
              <svg width="20" height="20">
                <use xmlns:xlink="https://www.facebook.com/Pasabahce/" xlink:href="#svgIconFacebook"></use>
              </svg>
            </a>
            <a href="/" target="_blank">
              <svg width="22" height="18">
                <use xmlns:xlink="https://twitter.com/pasabahce" xlink:href="#svgIconTwitter"></use>
              </svg>
            </a>
            <a href="/" target="_blank">
              <svg width="22" height="16">
                <use xmlns:xlink="https://www.youtube.com/channel/UCv92-wt46VpQlsjcOo9NNog" xlink:href="#svgIconYoutube"></use>
              </svg>
            </a>
            <a href="/" target="_blank">
              <svg width="20" height="20">
                <use xmlns:xlink="https://www.instagram.com/pasabahce/" xlink:href="#svgIconInstagram"></use>
              </svg>
            </a>
          </li>
        </ul>
        <ul>
          <li class="item-type--back">
            <span class="item--icon">
              <svg width="7" height="13">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconLeft"></use>
              </svg>
            </span>
            <a href="javascript:;" v-on:click="leftToMenu()">{{ levelTwoContent.name }}</a>
          </li>
          <li>
            <router-link :to="'/' + lang.url + '/catalog/' + levelTwoContent.url" v-on:click.native="handleClickRouterLink()">
              <span>{{ lang.menu_hepsini_gor }}</span>
            </router-link>
            <span class="item--icon">
              <svg width="14" height="13">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconDoubleRight"></use>
              </svg>
            </span>
          </li>
          <li v-for="category in levelTwoContent.items" :key="'headercategory' + category.id">
            <a href="javascript:;" v-on:click="rightToMenu(3, category)">
              <span>{{ category.name }}</span>
            </a>
            <span class="item--icon">
              <svg width="7" height="13">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconRight"></use>
              </svg>
            </span>
          </li>
        </ul>
        <ul>
          <li class="item-type--back">
            <span class="item--icon">
              <svg width="7" height="13">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconLeft"></use>
              </svg>
            </span>
            <a href="javascript:;" v-on:click="leftToMenu()">{{ levelThreeContent.name }}</a>
          </li>
          <li>
            <router-link :to="'/' + lang.url + '/catalog/' + levelTwoContent.url + '/category/' + levelThreeContent.url" v-on:click.native="handleClickRouterLink()">
              <span>{{ lang.menu_hepsini_gor }}</span>
            </router-link>
            <span class="item--icon">
              <svg width="14" height="13">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconDoubleRight"></use>
              </svg>
            </span>
          </li>
          <li v-for="subCategory in levelThreeContent.items" :key="'headersubCategory' + subCategory.id">
            <router-link :to="`/${lang.url}/catalog/${levelTwoContent.url}/category/${levelThreeContent.url}?sub=${subCategory.id}`" v-on:click.native="handleClickRouterLink()">
              <span>{{ subCategory.name }}</span>
            </router-link>
            <span class="item--icon">
              <svg width="7" height="13">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgIconRight"></use>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HeaderBar',
  data() {
    return {
      isNavOpen: false,
      navLevel: 0,
      menu: [],
      levelTwoContent: [],
      levelThreeContent: [],
    };
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      langList: 'lang/langList',
      langListStatus: 'lang/langListStatus',
      menu4Api: 'menu/menu',
      menuStatus: 'menu/status',
      accesstoken: 'auth/accesstoken',
    }),
  },
  methods: {
    ...mapActions({
      getMenu: 'menu/getMenu',
      logout: 'auth/logout',
    }),
    rightToMenu(level, content) {
      this.navLevel += 1;
      if (level === 2) this.levelTwoContent = content;
      else this.levelThreeContent = content;
    },
    leftToMenu() {
      this.navLevel -= 1;
    },
    fillMenuData() {
      if (this.menuStatus === 'done') {
        let menu = JSON.parse(JSON.stringify(this.menu));
        menu = [];
        window.$lodash.forEach(this.menu4Api.catalogs, (val) => {
          menu.push(val);
        });
        window.$lodash.forEach(this.menu4Api.category, (val) => {
          window.$lodash.forEach(menu, (valCatalog, indexCatalog) => {
            if (valCatalog.id === val.catalog) {
              if (typeof menu[indexCatalog].items === 'undefined') menu[indexCatalog].items = [];
              menu[indexCatalog].items.push(val);
            }
          });
        });
        window.$lodash.forEach(this.menu4Api.subcategories, (val) => {
          window.$lodash.forEach(menu, (valCatalog, indexCatalog) => {
            window.$lodash.forEach(menu[indexCatalog].items, (valCategory, indexCategory) => {
              if (valCategory.id.toString() === val.category.toString()) {
                if (typeof menu[indexCatalog].items[indexCategory].items === 'undefined') menu[indexCatalog].items[indexCategory].items = [];
                menu[indexCatalog].items[indexCategory].items.push(val);
              }
            });
          });
        });
        this.menu = menu;
      }
    },
    handleClickRouterLink() {
      this.navLevel = 0;
      this.isNavOpen = false;
    },
  },
  watch: {
    menu4Api() {
      this.fillMenuData();
    },
  },
  mounted() {
    this.getMenu();
    this.fillMenuData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

header {
  padding-left: 15px;
  transition-delay: 0.25s;
  .header--inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;
    padding: 20px 35px 20px 20px;
    .logo {
      display: block;
      position: relative;
      img {
        display: block;
        height: 24px;
        width: auto;
        opacity: 1;
        transition: 0.25s;
        &.logo-normal {
          transition-delay: 0.25s;
        }
        &.logo-nav {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transition-delay: 0s;
        }
      }
    }
    .right-outer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .ui-dropdown {
        margin-right: 10px;
      }
    }
    .toggle-navigation {
      display: block;
      position: relative;
      color: #000;
      width: 24px;
      height: 24px;
      svg {
        position: absolute;
        transform-origin: left center;
        transition: 0.25s;
        &:first-child {
          top: 7.5px;
          left: 6px;
          height: 9px;
          width: 12px;
          opacity: 1;
          transition-delay: 0.25s;
          transform: scale(1);
        }
        &:last-child {
          top: 6px;
          left: 6px;
          height: 12px;
          width: 13px;
          opacity: 0;
          transition-delay: 0s;
          transform: scale(0);
        }
      }
      &.active {
        svg {
          &:first-child {
            opacity: 0;
            transition-delay: 0s;
            transform: scale(0);
          }
          &:last-child {
            opacity: 1;
            transition-delay: 0.25s;
            transform: scale(1);
          }
        }
      }
    }
  }
  nav {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: 0px;
    right: 0;
    background: rgba(56, 56, 56, 1);
    transition: 0.25s;
    transition-delay: 0.25s;
    top: 64px;
    border-left: solid 15px rgba(56, 56, 56, 1);
    color: #fff;
    font-size: 12px;
    overflow: hidden;
    z-index: 1;
    a {
      color: inherit;
      &:hover {
        text-decoration: none;
      }
    }
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        line-height: 20px;
        position: relative;
        border-bottom: solid 1px rgba(75, 75, 75, 1);
        &:nth-child(odd) {
          background: rgba(43, 43, 43, 1);
        }
        &.item-type--title,
        a {
          display: block;
          padding: 12px 20px;
          position: relative;
          z-index: 1;
        }
        &.item-type--social {
          display: flex;
          a {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 25%;
            height: 44px;
            border-right: solid 1px rgba(75, 75, 75, 1);
            &:last-child {
              border-right: none;
            }
          }
        }
        .item--icon {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: absolute;
          width: 44px;
          right: 20px;
          top: 0;
          bottom: 0;
          svg {
            display: block;
          }
        }
        &.item-type--back {
          padding-left: 20px;
          .item--icon {
            width: 20px;
            right: auto;
            left: 20px;
            justify-content: flex-start;
          }
        }
      }
    }
    .lists-outer {
      display: flex;
      transition: 0.5s;
      @for $i from 1 through 3 {
        &.level-#{$i} {
          transform: translateX($i * -100%);
        }
      }
      ul {
        background: rgba(34, 34, 34, 1);
        min-height: 100vh;
        display: block;
        width: 100%;
        flex-shrink: 0;
      }
    }
  }
  &.is-nav--open {
    background: rgba(56, 56, 56, 1);
    nav {
      opacity: 1;
      visibility: visible;
    }
    .header--inner {
      background: rgba(34, 34, 34, 1);
      .logo {
        img {
          &.logo-normal {
            opacity: 0;
            transition-delay: 0s;
          }
          &.logo-nav {
            opacity: 1;
            transition-delay: 0.25s;
          }
        }
      }
      .toggle-navigation {
        color: #fff;
      }
    }
  }
}
</style>
