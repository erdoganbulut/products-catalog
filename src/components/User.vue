<template>
  <main class="page">
    <user-content />
  </main>
</template>

<script>
import UserContent from './shareds/UserContent';

export default {
  name: 'User',
  data() {
    return {
    };
  },
  components: {
    UserContent
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
