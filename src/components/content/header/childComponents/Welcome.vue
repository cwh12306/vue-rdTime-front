<template>
  <div class="welcome">
    <div class="title">Welcome to RDTime.com</div>
    <div class="title2">Educational Worksheets</div>
    <div class="login" @click="login" ref="loginSign" v-show="!isLogin">
      <i class="fa-solid fa-arrow-right-to-bracket"></i>
    </div>
    <div class="personalCenter" v-show="isLogin" ref="personalCenter">
      <div class="cursor">
        <div class="redDot" v-show="total !== 0">您有{{ total }}条新消息!</div>
        <div class="avatar"><Avatar :userId="Number(id)" /></div>
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
  import { getNewReply } from "$network/homeWelcome.js";

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
        role: 1,
        id:
          localStorage.getItem("user-id") || sessionStorage.getItem("user-id"),
        personalCenterIsShow: false,
        total: 0,
      };
    },
    mounted() {
      if (localStorage.getItem("rememberMe")) {
        this.isLogin = localStorage.getItem("isLogin");
        this.username = localStorage.getItem("username");
        this.role = localStorage.getItem("role");
      } else if (sessionStorage.getItem("isLogin")) {
        this.isLogin = sessionStorage.getItem("isLogin");
        this.username = sessionStorage.getItem("username");
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
      //获取用户新的信息列表
      this.id &&
        getNewReply(this.id).then((res) => {
          console.log(res);
          this.total = res;
        });
    },
  };
</script>

<style scoped>
  .cursor {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
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
  .avatar {
    transform: translate(-2px, 4px);
  }
  .redDot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff6b6b;
    cursor: pointer;
    z-index: 100;
    transition: 1s;
    font-size: 12px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    margin: 0 0 0 auto;
    transform: translate(4px, -10px);
  }
  .redDot:hover {
    width: 120px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
  }
</style>
