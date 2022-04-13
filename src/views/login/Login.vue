<template>
  <div class="login">
    <div class="login-header">
      <div class="flag" @click="backToHome">
        <i class="fa-regular fa-flag"></i>
      </div>
    </div>
    <div class="login-content"></div>
    <div class="login-footer">
      <p class="text">Go Look At Some TLSBooks</p>
      <p class="copyright">Copyright &copy 2000-2022 Publishing</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    methods: {
      backToHome() {
        this.$router.replace("/");
      },
    },
  };
</script>

<style scoped>
  .login-header {
    background: white;
    height: 74px;
    width: 100%;
    box-shadow: 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.025);
    position: relative;
  }
  .login-content {
    height: calc(100vh - 162px);
    width: 100%;
    background: url(~$assets/img/login-bg.png);
  }
  .flag {
    color: #538dd7;
    font-size: 20px;
    position: absolute;
    left: 20%;
    top: 25px;
  }
  .flag:hover {
    cursor: pointer;
    color: #264977;
  }
  .login-footer {
    background: #183153;
    width: 100%;
    height: 88px;
    position: fixed;
    bottom: 0;
    line-height: 88px;
  }
  .text {
    margin-left: 200px;
    color: white;
    font-weight: bold;
    font-size: 14px;
    font-family: "Aktiv Grotesk", "Segoe UI", Helvetica, Arial, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  .copyright {
    position: absolute;
    right: 200px;
    top: 0;
    font-size: 14px;
    color: #c3c6d1;
    font-family: "Aktiv Grotesk", "Segoe UI", Helvetica, Arial, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
</style>
