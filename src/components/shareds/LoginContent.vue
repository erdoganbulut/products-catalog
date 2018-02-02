<template>
  <section class="login-content-component">
    <div class="container">
      <form v-on:submit.prevent="onSubmit">
        <div class="form-item">
          <p>{{ lang.uyelik_ozelligi }}</p>
        </div>
        <div class="form-item">
          <label for="inputemail">e-mail</label>
          <input id="inputemail" type="email" class="form-control" v-model="tokenparams.username" :placeholder="lang.login_email">
        </div>
        <div class="form-item">
          <label for="inputpassword" class="text-lowercase">{{ lang.login_password }}</label>
          <input id="inputpassword" type="password" class="form-control" v-model="tokenparams.password" :placeholder="lang.login_password">
        </div>
        <div class="form-item">
          <button type="submit" class="btn">{{ lang.login_sign_in }}</button>
        </div>
        <div class="form-item">
          <p v-if="error !== ''">{{ error }}</p>
        </div>
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
  mounted() {
    if (this.authStatus === 'done') {
      this.$router.push('/en/user');
    }
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
        this.$router.push('/en/user');
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
  padding-top: 30px;
  .form-item {
    padding: 10px 0;
    font-size: 0.75rem;
    input {
      font-size: 0.75rem;
      border-left: none;
      border-right: none;
      border-top: none;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
    }
    label {
      font-weight: 300;
      color: #B40023;
    }
    .btn {
      display: block;
      width: 100%;
      background: #C31B2E;
      color: #fff;
      text-decoration: none;
      padding: 0.75rem;
      margin-bottom: 20px;
      &:hover {
        background: darken(#C31B2E, 10%);
      }
    }
    p {
      margin: 0;
    }
  }
}
</style>
