<template>
  <div class="personalCenter">
    <LoginHeader />
    <div class="personalCenter-content">
      <div class="side-bar">
        <div class="avatar">
          <img width="80" height="80" :src="avatarUrl" alt="" />
        </div>
        <div class="username">
          <span v-show="!isShow" @click="changeUsername">{{ username }}</span
          ><input type="text" v-show="isShow" v-model="username" />
          <button class="submit" v-show="isShow" @click="submitUsername">
            提交
          </button>
        </div>
      </div>
      <div class="content-container"></div>
    </div>
    <LoginFooter />
  </div>
</template>

<script>
  import LoginHeader from "../login/login-header/LoginHeader.vue";
  import LoginFooter from "../login/login-footer/LoginFooter.vue";

  import { updUsername } from "$network/personalCenter.js";

  export default {
    name: "PersonalCetner",
    components: { LoginHeader, LoginFooter },
    data() {
      return {
        avatarUrl:
          localStorage.getItem("avatar") || sessionStorage.getItem("avatar"),
        username:
          localStorage.getItem("username") ||
          sessionStorage.getItem("username"),
        isShow: false,
        id: localStorage.getItem("id") || sessionStorage.getItem("id"),
        role: localStorage.getItem("role") || sessionStorage.getItem("role"),
        //老用户名用来判断用户有没有对名字进行修改
        oldUsername:
          localStorage.getItem("username") ||
          sessionStorage.getItem("username"),
      };
    },
    methods: {
      changeUsername() {
        this.isShow = !this.isShow;
      },
      submitUsername() {
        //如果新用户名和老的用户名不同，且不为空
        if (this.username !== "" && this.username !== this.oldUsername) {
          //修改用户名
          updUsername(this.username, this.id).then((res) => {
            if (res === 1) {
              this.isShow = !this.isShow;
              this.$toast.show(true, "修改成功");
              //修改成功后记得修改存储的用户名
              if (localStorage.getItem("rememberMe")) {
                localStorage.setItem("username", this.username);
              } else {
                sessionStorage.setItem("username", this.username);
              }
              //修改老的用户名
              this.oldUsername = this.username;
            } else {
              this.$toast.show(false, "修改失败");
            }
          });
        }
        //如果新用户名和老用户名相同，就不发请求了
        else if (this.username === this.oldUsername) {
          this.isShow = !this.isShow;
        } else {
          this.$toast.show(false, "新用户名不能为空");
        }
      },
    },
  };
</script>

<style scoped>
  .personalCenter-content {
    height: calc(100vh - 162px);
    width: 100%;
    background: url(~$assets/img/login-bg.png);
    position: relative;
  }
  .side-bar {
    position: absolute;
    width: 210px;
    height: 483px;
    background: white;
    left: 25%;
    top: 5%;
    border-radius: 20px;
  }
  .content-container {
    height: 690px;
    width: 509px;
    padding: 20px;
    position: absolute;
    background: white;
    left: 40%;
    top: 5%;
    border-radius: 20px;
  }
  .avatar img {
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
  }
  .username {
    position: absolute;
    font-weight: bold;
    color: black;
    font-size: 24px;
    top: 28%;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
  .username input {
    width: 150px;
    padding: 0px 10px;
    font-size: 14px;
    height: 32px;
    color: #333;
    border-left: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    box-shadow: inset 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.05);
    transition: 0.5s;
  }
  .username input:focus {
    outline: none;
  }
  .username .submit {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: white;
    background: #3498db;
    border-radius: 5px;
    border: none;
    padding: 3px;
    cursor: pointer;
    border-bottom: 1px solid #175279;
  }
  .username .submit:active {
    border-top: 1px solid #175279;
    border-bottom: none;
  }
</style>
