<template>
  <div class="login">
    <div class="login-header">
      <div class="flag" @click="backToHome">
        <i class="fa-regular fa-flag"></i>
      </div>
    </div>
    <div class="login-content">
      <div class="threeD-stage">
        <div class="face" :class="{ faceRotate: isRotate }">
          <div class="login-container">
            <div class="login-title">Sign In</div>
            <p class="inputText">Email邮箱地址</p>
            <input
              @blur="validateEmail"
              v-model="email"
              class="login-input"
              type="email"
              name="email"
              placeholder="请输入邮箱地址"
              :class="[
                { correct: loginArr[0].check === 'correct' },
                { error: loginArr[0].check === 'error' },
              ]"
            />
            <div class="login-icon icon-email">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <p class="inputText">密码</p>
            <input
              @blur="validatePassword"
              v-model="password"
              class="login-input"
              type="password"
              name="password"
              placeholder="请输入密码"
              :class="[
                { correct: loginArr[1].check === 'correct' },
                { error: loginArr[1].check === 'error' },
              ]"
            />
            <div class="login-icon icon-lock">
              <i class="fa-solid fa-lock"></i>
            </div>
            <input
              v-model="rememberMe"
              id="rememberMe"
              class="checkbox"
              type="checkbox"
              name="rememberMe"
            />
            <label class="rememberMe" for="rememberMe"
              ><i class="fa-solid fa-check"></i
            ></label>
            <span class="rememberMe-text">记住我</span>
            <span class="switch-text">管理员</span>
            <div class="switchLogin">
              <input v-model="switchLogin" type="checkbox" id="switchLogin" />
              <label for="switchLogin"></label>
              <div class="switchLogin-bg"></div>
            </div>
            <button class="button-login" @click="login">
              登录 <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          </div>
        </div>
        <div class="backface" :class="{ backfaceRotate: isRotate }">
          <div class="login-title">Register</div>
          <p class="inputText">用户名</p>
          <input
            v-model="username"
            class="login-input"
            type="text"
            name="username"
            placeholder="请输入用户名"
          />
          <p class="inputText">Email邮箱地址</p>
          <input
            v-model="registerEmail"
            class="login-input"
            type="email"
            name="registerEmail"
            placeholder="请输入新的邮箱地址"
          />
          <p class="inputText">密码</p>
          <input
            v-model="registerPassword"
            class="login-input"
            type="password"
            name="registerPassword"
            placeholder="请输入密码"
          />
          <p class="inputText">确认密码</p>
          <input
            v-model="confirmPassword"
            class="login-input"
            type="password"
            name="confirmPassword"
            placeholder="请再次输入密码"
          />
          <button class="button-login">注册</button>
        </div>
      </div>
      <div class="register" @click="rotateLogin">
        {{ isRotate ? "注册完毕？返回登录" : "没有账号，点击这里注册" }}
        <i class="fa-solid fa-hand-point-left"></i>
      </div>
    </div>
    <div class="login-footer">
      <p class="text">Go Look At Some TLSBooks</p>
      <p class="copyright">Copyright &copy 2000-2022 Publishing</p>
    </div>
  </div>
</template>

<script>
  import { getUser } from "$network/login.js";

  export default {
    name: "Login",
    data() {
      return {
        //是否旋转（注册or登录）
        isRotate: false,
        //表单收集
        username: "",
        registerEmail: "",
        registerPassword: "",
        confirmPassword: "",
        email: "",
        password: "",
        switchLogin: false,
        rememberMe: false,
        //check用来判断表单验证，flag用来最终判断能否提交表单
        loginArr: [
          { id: "email", flag: false, check: "", msg: "请输入正确的邮箱格式" },
          { id: "password", flag: false, check: "", msg: "密码不能为空" },
        ],
        registerArr: [],
      };
    },
    methods: {
      backToHome() {
        this.$router.replace("/");
      },
      rotateLogin() {
        this.isRotate = !this.isRotate;
      },
      login() {
        const errArr = [];
        this.loginArr.forEach((err) => {
          if (!err.flag) {
            errArr.push(err.msg);
          }
        });
        if (errArr.length === 0) {
          getUser(this.email, this.password, this.switchLogin).then((res) => {
            if (res) {
              sessionStorage.setItem("isLogin", true);
              sessionStorage.setItem("username", res.username);
              sessionStorage.setItem("avatar", res.avatar);
              sessionStorage.setItem(
                "role",
                res.role === 0 ? "管理员" : "普通用户"
              );
              this.$router.replace("/");
              this.$toast.show(true, "登录成功🎉🎉🎉");
            } else {
              this.$toast.show(false, "登录失败，邮箱或密码错误");
            }
          });
        } else {
          const errMsg = errArr.pop();
          this.$toast.show(false, errMsg);
        }
      },
      validateEmail() {
        const reg = new RegExp(
          /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        );
        let res = reg.test(this.email);
        res
          ? (this.loginArr[0].check = "correct")
          : (this.loginArr[0].check = "error");
        this.loginArr[0].flag = res;
      },
      validatePassword() {
        this.loginArr[1].flag = this.password !== "";
        this.password !== ""
          ? (this.loginArr[1].check = "correct")
          : (this.loginArr[1].check = "error");
      },
    },
  };
</script>

<style scoped>
  .switchLogin {
    height: 22px;
    width: 45px;
    position: absolute;
    border-radius: 20px;
    right: 10px;
    transform: translate(-50%, -175%);
  }
  .switchLogin-bg {
    width: 100%;
    height: 100%;
    background: #bfbfbf;
    border-radius: 10px;
    transition: all 0.7s ease;
  }
  .switchLogin label {
    display: block;
    width: 21px;
    height: 21px;
    top: 0;
    left: 0;
    border-radius: 50%;
    transition: all 0.5s ease;
    cursor: pointer;
    position: absolute;
    background: white;
  }
  .switchLogin input[type="checkbox"]:checked + label {
    transform: translateX(23px);
  }
  .switchLogin input[type="checkbox"]:checked ~ .switchLogin-bg {
    background: #1890ff;
  }
  .register {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 78%;
    color: #538dd7;
    border-bottom: 1px solid #d3d4d5;
  }
  .register:hover {
    color: #1c7ed6;
    cursor: pointer;
    border-bottom: 1px solid #1c7ed6;
  }
  .register:hover i {
    animation: move 1.2s infinite;
  }
  @keyframes move {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  .login-header {
    background: white;
    height: 74px;
    width: 100%;
    box-shadow: 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.025);
    position: relative;
    z-index: 999;
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
  .threeD-stage {
    position: absolute;
    perspective: 1500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    transform-style: preserve-3d;
  }
  .login-container {
    background: white;
    box-shadow: 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.025);
    color: #495057;
    padding: 34px;
    height: 545px;
    width: 384px;
    border: 0.125rem solid #e9ecef;
    border-radius: 0.25rem;
    font-family: "Aktiv Grotesk", "Segoe UI", Helvetica, Arial, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  .login-title {
    text-align: center;
    font-size: 2.44rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  .inputText {
    font-family: fa5-proxima-nova, "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    font-family: 600;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  .login-input {
    position: relative;
    z-index: 2;
    padding: 1.5rem;
    font-size: 1.25rem;
    width: 100%;
    line-height: 1;
    box-shadow: inset 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.05);
    border: 0.125rem solid #dee2e6;
    border-radius: 0.25rem;
    overflow: hidden;
    transition: 0.5s;
    background: transparent;
    margin-bottom: 1rem;
  }
  .login-input:focus {
    outline: none;
    border: 0.125rem solid #1c7ed6;
    box-shadow: 2px 2px 5px #2b5070;
  }
  .login-icon {
    position: absolute;
    transform: translateY(-280%);
    font-size: 20px;
    color: #e4e5e6;
    margin-right: 15px;
    right: 40px;
    z-index: 1;
  }
  input[type="checkbox"] {
    display: none;
  }
  .rememberMe {
    margin: 10px 0 0 0;
    border: 2px solid #adb5bd;
    height: 18px;
    width: 18px;
    border-radius: 2px;
    display: inline-block;
    cursor: pointer;
    color: white;
    font-size: 13px;
    line-height: 14px;
    text-align: center;
    background: white;
  }
  .checkbox:checked + .rememberMe {
    background: #339af0;
    border: 2px solid transparent;
  }
  .rememberMe-text {
    transform: translate(9%, -105%);
    display: block;
  }
  .switch-text {
    position: absolute;
    transform: translate(-16%, -200%);
    display: block;
    right: 72px;
  }
  .button-login {
    margin-top: 0.5rem;
    background: #228be6;
    color: white;
    font-size: 1.25rem;
    padding: 1.5rem 2rem 1.5rem 2rem;
    width: 100%;
    font-weight: 600;
    border-radius: 0.25rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 4px solid #1665ab;
  }
  .button-login:active {
    border-top: 4px solid #1665ab;
    border-bottom: none;
  }
  .button-login:hover {
    cursor: pointer;
    background: #1c7ed6;
  }
  .face,
  .backface {
    transition: 1s transform;
    backface-visibility: hidden;
    overflow: auto;
  }
  .backface {
    position: absolute;
    background: white;
    box-shadow: 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.025);
    color: #495057;
    padding: 34px;
    height: 545px;
    top: 0;
    width: 384px;
    border: 0.125rem solid #e9ecef;
    border-radius: 0.25rem;
    font-family: "Aktiv Grotesk", "Segoe UI", Helvetica, Arial, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    transform: rotateY(180deg);
  }
  .faceRotate {
    transform: rotateY(180deg);
  }
  .backfaceRotate {
    transform: rotateY(360deg);
  }
  .correct {
    border: 0.125rem solid #2ecc71;
    box-shadow: 2px 2px 5px #1a8a49;
  }
  .error {
    border: 0.125rem solid #e74c3c;
    box-shadow: 2px 2px 5px #a13023;
  }
</style>
