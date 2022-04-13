<template>
  <div class="welcome">
    <div class="title">Welcome to TLSBooks.com</div>
    <div class="title2">Educational Worksheets</div>
    <div class="login" @click="login" ref="loginSign">
      <i class="fa-solid fa-arrow-right-to-bracket"></i>
    </div>
    <transition name="signIn"
      ><div class="signIn" v-show="isShow">登录</div>
    </transition>
    <transition name="signIn2">
      <div class="triangle" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: "Welcome",
    components: {},
    methods: {
      login() {
        this.$router.push("/login");
      },
    },
    data() {
      return {
        isShow: false,
      };
    },
    mounted() {
      const loginSign = this.$refs.loginSign;
      loginSign.onmouseenter = () => {
        this.isShow = true;
      };
      loginSign.onmouseleave = () => {
        this.isShow = false;
      };
    },
  };
</script>

<style scoped>
  .signIn-enter-active,
  .signIn-leave-active {
    transition: opacity 0.5s;
  }
  .signIn-enter,
  .signIn-leave-to {
    opacity: 0;
  }
  .signIn2-enter-active,
  .signIn2-leave-active {
    transition: opacity 0.5s;
  }
  .signIn2-enter,
  .signIn2-leave-to {
    opacity: 0;
  }
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
    font-size: 18px;
    position: absolute;
    right: 120px;
    color: black;
    line-height: 50px;
  }
  .login:hover {
    color: whitesmoke;
    cursor: pointer;
  }
  .signIn {
    position: absolute;
    right: 150px;
    height: 30px;
    width: 60px;
    line-height: 30px;
    text-align: center;
    color: white;
    font-size: 12px;
    top: 10px;
    background: #146ebe;
  }
  .triangle {
    position: absolute;
    right: 138px;
    top: 18px;
    border: 6px solid transparent;
    border-left: 6px solid #146ebe;
  }
</style>
