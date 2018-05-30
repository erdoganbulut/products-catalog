<template>
  <main class="page">
    <login-content />
  </main>
</template>

<script>
import LoginContent from './shareds/LoginContent';

export default {
  name: 'Login',
  data() {
    return {
    };
  },
  components: {
    LoginContent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/shareds';
</style>
