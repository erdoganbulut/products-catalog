<template>
  <section class="login-content-component">
    <div class="container">
      <form v-on:submit.prevent="onSubmit">
        <input type="email" class="form-control" v-model="tokenparams.username" placeholder="E-posta Adresi">
        <input type="password" class="form-control" v-model="tokenparams.password" placeholder="Şifre">
        <button type="submit" class="btn btn-primary">Gönder</button>
        <p v-if="error !== ''">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'LoginContent',
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
      authStatus: 'auth/status',
      authResponse: 'auth/response',
    }),
  },
  methods: {
    ...mapActions({
      getToken: 'auth/getToken',
    }),
    onSubmit() {
      this.getToken(this.tokenparams);
    },
  },
  watch: {
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

section.login-content-component {

}
</style>
