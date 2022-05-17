<template>
  <div class="login-footer">
    <p class="text">Go Look At Some RDTime</p>
    <p class="copyright">Copyright &copy 2000-2022 Publishing</p>
  </div>
</template>

<script>
  export default {
    name: "LoginFooter",
  };
</script>

<style scoped>
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
