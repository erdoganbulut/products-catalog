<template>
  <footer>
    <div class="container">
      <p>PAŞABAHÇE CAM SANAYİ VE TİCARET A.Ş.</p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FooterBar',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      langList: 'lang/langList',
      langListStatus: 'lang/langListStatus',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

footer {
  background: #000;
  font-size: 12px;
  font-weight: $fontWeightMedium;
  color: #ffffff;
  text-align: center;
  padding: 12px;
  p {
    line-height: 20px;
    margin: 0;
  }
}
</style>
