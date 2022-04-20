<template>
  <div class="login-header">
    <div class="flag" @click="backToHome">
      <i class="fa-regular fa-flag"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginHeader",
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
    z-index: 999;
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
</style>
