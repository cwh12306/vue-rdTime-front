// 作为欢迎页个人中心的二级菜单
<template>
  <div class="secondNav2" ref="secondNav2">
    <div class="personalCenter" @click="pushToPC">
      <i class="fa-solid fa-user"></i>
      个人中心
    </div>
    <div class="signOut" @click="signOut">
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
      退出登录
    </div>
  </div>
</template>

<script>
  export default {
    name: "SecondNav2",
    mounted() {
      const secondNav2 = this.$refs.secondNav2;
      //监听鼠标移入二级菜单栏
      secondNav2.onmouseenter = () => {
        this.secondNavEnter(true);
      };
      secondNav2.onmouseleave = () => {
        this.secondNavEnter(false);
      };
    },
    methods: {
      //发送事件给父组件
      secondNavEnter(data) {
        this.$emit("nav-active", data);
      },
      pushToPC() {
        this.$router.push("/personalCenter");
      },
      signOut() {
        if (localStorage.getItem("rememberMe")) {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("isLogin");
          localStorage.removeItem("username");
          localStorage.removeItem("avatar");
          localStorage.removeItem("role");
        } else {
          sessionStorage.removeItem("isLogin");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("avatar");
          sessionStorage.removeItem("role");
        }
        this.isLogin = false;
        this.username = "";
        this.avatar = "";
        this.role = 1;
        this.$router.go(0);
      },
    },
  };
</script>

<style scoped>
  .secondNav2 {
    background: white;
    width: 110px;
    border-radius: 12px;
    position: absolute;
    text-align: center;
    padding: 8px 0;
    line-height: 25px;
    right: 100px;
    top: 50px;
    cursor: pointer;
    z-index: 99;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    font-size: 13px;
    color: #333;
  }
  .signOut:hover,
  .personalCenter:hover {
    color: #455ab8;
    font-weight: 300;
  }
  .signOut,
  .personalCenter {
    margin: 3px 16px 3px 16px;
  }
</style>
