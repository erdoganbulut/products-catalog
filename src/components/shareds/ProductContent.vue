<template>
  <section class="product-content-component">
    <div class="container">
      <div class="product-image">
        <img src="http://placehold.it/1080x1080" alt="">
      </div>
      <div class="product-top-info">
        <h1>
          <span class="product-serie-name">ALLEGRA</span>
          <span class="product-code">440065</span> -
          <span class="product-name">KIRMIZI ŞARAP</span>
        </h1>
        <div class="package-info">
          <p>SKU / PACKING <span>1022061</span></p>
          <div class="package-icons">
            <img src="http://placehold.it/16x16" alt="">
            <img src="http://placehold.it/16x16" alt="">
          </div>
        </div>
        <div class="product-icons">
          <img src="http://placehold.it/70x35" alt="">
          <img src="http://placehold.it/50x35" alt="">
          <img src="http://placehold.it/35x35" alt="">
          <img src="http://placehold.it/20x35" alt="">
        </div>
      </div>
      <div class="technical-detail">
        <h2><a v-b-toggle.collapseTechnical href="javascript:;">TECHNICAL DETAILS</a></h2>
        <b-collapse id="collapseTechnical">
          <div class="technical-detail-content">
            <table>
              <tr>
                <td>Hacim:</td>
                <td>~490 cc.</td>
              </tr>
              <tr>
                <td>Hacim US:</td>
                <td>16 1/4 US oz.</td>
              </tr>
              <tr>
                <td>Hacim UK:</td>
                <td>17 1/4 US oz.</td>
              </tr>
              <tr>
                <td>Yükseklik:</td>
                <td>217,5 mm. 8 2/4"</td>
              </tr>
              <tr>
                <td>Ağız Çapı:</td>
                <td>63,5 mm. 2 2/4"</td>
              </tr>
              <tr>
                <td>Taban Çapı:</td>
                <td>78 mm. 3"</td>
              </tr>
              <tr>
                <td>Max. Genişlik:</td>
                <td>91 mm. 3 2/4"</td>
              </tr>
            </table>
          </div>
        </b-collapse>
      </div>
      <div class="product-share">
        <h2><a v-b-toggle.collapseSocial href="javascript:;">SHARE</a></h2>
        <b-collapse id="collapseSocial">
          <div class="product-share-content">
            <a href="javascript:;" class="social-link social-link--facebook"><i class="fa fa-facebook"></i></a>
            <a href="javascript:;" class="social-link social-link--twitter"><i class="fa fa-twitter"></i></a>
            <a href="javascript:;" class="social-link social-link-mail"><i class="fa fa-envelope-o"></i></a>
          </div>
        </b-collapse>
      </div>
      <div class="add-to-favorite">
        <a href="javascript:;" class="btn btn-danger btn-block"><i class="fa fa-heart-o"></i> ADD TO FAVORITE</a>
        <select class="form-control">
          <option value="-1">New List</option>
          <option>List 1</option>
          <option>List 2</option>
          <option>List 3</option>
          <option>List 4</option>
        </select>
        <input type="text" placeholder="list name" class="form-control" v-if="true">
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProductContent',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.product-content-component {
  .product-image {
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
}
</style>
