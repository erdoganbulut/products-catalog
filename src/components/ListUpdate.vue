<template>
  <main class="page">
    <list-update-content />
  </main>
</template>

<script>
import ListUpdateContent from './shareds/ListUpdateContent';

export default {
  name: 'ListUpdate',
  data() {
    return {
    };
  },
  components: {
    ListUpdateContent
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
