<template>
  <main class="page">
    <list-add-content />
  </main>
</template>

<script>
import ListAddContent from './shareds/ListAddContent';

export default {
  name: 'ListAdd',
  data() {
    return {
    };
  },
  components: {
    ListAddContent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
