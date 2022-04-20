<template>
  <div class="welcome">
    <div class="title">Welcome to TLSBooks.com</div>
    <div class="title2">Educational Worksheets</div>
    <div class="login" @click="login" ref="loginSign" v-show="!isLogin">
      <i class="fa-solid fa-arrow-right-to-bracket"></i>
    </div>
    <div class="personalCenter" v-show="isLogin" ref="personalCenter">
      <div class="cursor">
        <div class="avatar"><Avatar :avatarUrl="avatar" /></div>
        <span>
          {{ username }}
        </span>
      </div>
    </div>

    <transition name="signIn"
      ><div class="signIn" v-show="isShow && !isLogin">登录</div>
    </transition>
    <transition name="signIn2">
      <div class="triangle" v-show="isShow && !isLogin"></div>
    </transition>
    <SecondNav2
      @nav-active="personalCenterActive"
      v-show="isLogin && personalCenterIsShow"
    />
  </div>
</template>

<script>
  import SecondNav2 from "$components/common/SecondNav2.vue";
  import Avatar from "$components/common/avatar/Avatar.vue";
  export default {
    name: "Welcome",
    components: { Avatar, SecondNav2 },
    inject: ["reload"],
    methods: {
      login() {
        this.$router.push("/login");
      },
      personalCenterActive(flag) {
        this.personalCenterIsShow = flag;
      },
    },
    data() {
      return {
        isShow: false,
        isLogin: false,
        username: "",
        avatar: "",
        role: 1,
        personalCenterIsShow: false,
      };
    },
    mounted() {
      if (localStorage.getItem("rememberMe")) {
        this.isLogin = localStorage.getItem("isLogin");
        this.username = localStorage.getItem("username");
        this.avatar = localStorage.getItem("avatar");
        this.role = localStorage.getItem("role");
      } else if (sessionStorage.getItem("isLogin")) {
        this.isLogin = sessionStorage.getItem("isLogin");
        this.username = sessionStorage.getItem("username");
        this.avatar = sessionStorage.getItem("avatar");
        this.role = sessionStorage.getItem("role");
      }
      const loginSign = this.$refs.loginSign;
      loginSign.onmouseenter = () => {
        this.isShow = true;
      };
      loginSign.onmouseleave = () => {
        this.isShow = false;
      };

      const personalCenter = this.$refs.personalCenter;
      personalCenter.onmouseenter = () => {
        this.personalCenterIsShow = true;
      };
      personalCenter.onmouseleave = () => {
        this.personalCenterIsShow = false;
      };
    },
  };
</script>

<style scoped>
  .cursor {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
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
  .personalCenter {
    font-size: 18px;
    position: absolute;
    right: 120px;
    color: black;
    line-height: 50px;
    height: 50px;
  }
</style>
