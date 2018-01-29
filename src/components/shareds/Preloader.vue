<template>
  <section class="preloader-component" v-bind:class="{'inactive': !preloader}">
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.17 83.18"><defs></defs><path class="cls-1" d="M33.12 83.18c27.64 0 50-14.19 50-31.7a15 15 0 0 0-.36-3.48A19.71 19.71 0 0 0 46 42.14c-8 15.43-14.37 37.68-27.34 39.69a77 77 0 0 0 14.46 1.35zM49.8 0C22.16.22-.14 14.59 0 32.1a15 15 0 0 0 .44 3.53 19.71 19.71 0 0 0 36.77 5.52c7.93-15.48 14.08-37.78 27-39.9A77 77 0 0 0 49.8 0z"/></svg>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Preloader',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      preloader: 'preloader/preloader',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/shareds';

section.preloader-component {
  background: #c3202f;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  opacity: 1;
  visibility: visible;
  &.inactive {
    opacity: 0;
    visibility: hidden;
    transition: 0.5s;
    transition-delay: 1s;
  }
  svg {
    display: block;
    width: 32px;
    height: 32px;
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .cls-1 {
    fill: #fff;
  }
  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
}
</style>
