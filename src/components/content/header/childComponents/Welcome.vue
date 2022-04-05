<template>
  <div class="welcome">
    <div class="title">Welcome to TLSBooks.com</div>
    <div class="title2">Educational Worksheets</div>
    <div class="login">登录</div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: "Welcome",
    components: {},
  };
</script>

<style scoped>
  .welcome {
    position: relative;
    width: 100%;
    height: 50px;
    background: #f0c24b;
  }
  .title {
    position: absolute;
    color: black;
    line-height: 50px;
    left: 384px;
    font-size: 14px;
  }
  .title2 {
    font-size: 14px;
    position: absolute;
    right: 384px;
    color: white;
    line-height: 50px;
    font-weight: bold;
  }
  .login {
    font-size: 14px;
    position: absolute;
    right: 120px;
    color: black;
    line-height: 50px;
  }
  .login:hover {
    color: whitesmoke;
    cursor: pointer;
  }
</style>
