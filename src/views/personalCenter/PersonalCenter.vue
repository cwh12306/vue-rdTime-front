<template>
  <div class="personalCenter">
    <LoginHeader />
    <div class="personalCenter-content">
      <div class="side-bar">
        <div class="avatar">
          <input @change="changeFile" type="file" id="avatar-file" hidden />
          <label for="avatar-file">
            <img ref="avatar" width="80" height="80" alt=""
          /></label>
        </div>
        <div class="username" ref="username">
          <span v-show="!isShow" @click="changeUsername">{{ username }}</span
          ><input type="text" v-show="isShow" v-model="username" />
          <button class="submit" v-show="isShow" @click="submitUsername">
            提交
          </button>
        </div>
        <ul class="manager-side-tab side-tab" v-show="role === '管理员'">
          <router-link to="/personalCenter/insert" replace>
            <li @click="tabActive" :class="{ current: currentClickTab === 1 }">
              新增资源<i class="fa-solid fa-plus"></i></li
          ></router-link>
          <router-link
            to="/personalCenter/delete"
            active-class="current"
            replace
          >
            <li @click="tabActive" :class="{ current: currentClickTab === 2 }">
              删除资源<i class="fa-solid fa-circle-minus"></i></li
          ></router-link>
          <router-link
            to="/personalCenter/update"
            active-class="current"
            replace
          >
            <li @click="tabActive" :class="{ current: currentClickTab === 3 }">
              修改资源<i class="fa-solid fa-pen"></i></li
          ></router-link>
          <router-link
            to="/personalCenter/comment"
            active-class="current"
            replace
          >
            <li @click="tabActive" :class="{ current: currentClickTab === 4 }">
              用户评论<i class="fa-solid fa-comment-dots"></i></li
          ></router-link>
        </ul>
        <ul class="user-side-tab side-tab" v-show="role === '普通用户'">
          <router-link
            to="/personalCenter/userComment"
            active-class="current"
            replace
            ><li @click="tabActive" :class="{ current: currentClickTab === 5 }">
              发表过的评论<i class="fa-solid fa-comment-dots"></i></li
          ></router-link>
          <router-link
            to="/personalCenter/userHistory"
            active-class="current"
            replace
          >
            <li @click="tabActive" :class="{ current: currentClickTab === 6 }">
              浏览过的历史<i class="fa-solid fa-clock-rotate-left"></i></li
          ></router-link>
        </ul>
      </div>
      <div class="content-container">
        <router-view name="personalCenterTab"></router-view>
      </div>
    </div>
    <LoginFooter />
  </div>
</template>

<script>
  import LoginHeader from "../login/login-header/LoginHeader.vue";
  import LoginFooter from "../login/login-footer/LoginFooter.vue";

  import { updUsername, getAvatar } from "$network/personalCenter.js";
  import axios from "axios";

  export default {
    name: "PersonalCetner",
    components: { LoginHeader, LoginFooter },
    data() {
      return {
        file: null,
        username:
          localStorage.getItem("username") ||
          sessionStorage.getItem("username"),
        isShow: false,
        id:
          localStorage.getItem("user-id") || sessionStorage.getItem("user-id"),
        role: localStorage.getItem("role") || sessionStorage.getItem("role"),
        //老用户名用来判断用户有没有对名字进行修改
        oldUsername:
          localStorage.getItem("username") ||
          sessionStorage.getItem("username"),
        //用来判断当前点击的选项卡
        currentClickTab: 0,
      };
    },
    inject: ["reload"],
    methods: {
      //选项卡激活
      tabActive(evt) {
        switch (evt.target.innerText) {
          case "新增资源":
            this.currentClickTab = 1;
            break;
          case "删除资源":
            this.currentClickTab = 2;
            break;
          case "修改资源":
            this.currentClickTab = 3;
            break;
          case "用户评论":
            this.currentClickTab = 4;
            break;
          case "发表过的评论":
            this.currentClickTab = 5;
            break;
          case "浏览过的历史":
            this.currentClickTab = 6;
            break;
        }
      },
      changeFile(e) {
        this.file = e.target.files[0];
        this.uploadAvatar();
      },
      //上传头像
      uploadAvatar() {
        const avatar = this.$refs.avatar;
        //发送formData，后端用multipartFile接收
        let formData = new FormData();
        formData.append("files", this.file);
        formData.append("id", this.id);
        //发送到服务器
        axios
          .post("http://localhost:8088/tb/uploadAvatar", formData)
          .then((res) => {
            if (res.data === 1) {
              //上传成功
              //等待一段时间后刷新页面
              this.$toast.show(true, "上传成功");
              //图片回显
              const reader = new FileReader();
              reader.readAsDataURL(this.file);
              reader.onload = (ev) => {
                avatar.src = ev.target.result;
              };
            } else {
              //上传失败
              this.$toast.show(false, "上传失败");
            }
          });
      },
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
    mounted() {
      window.addEventListener("mousedown", (evt) => {
        // 获取被点击的元素
        const clickedEl = evt.target;
        const el = this.$refs.username;
        // `el` 是你正在检测外部点击的元素
        if (el?.contains(clickedEl)) {
          // 单击“el”内部
        } else {
          // 在`el`之外点击
          if (this.username !== "" && this.username === this.oldUsername)
            this.isShow = false;
        }
      });
      //页面一进入则发起请求获取头像
      getAvatar(this.id).then((res) => {
        const imageUrl = (window.URL || window.webkitURL).createObjectURL(res);
        this.$refs.avatar.src = imageUrl;
      });
    },
  };
</script>

<style scoped>
  .side-tab {
    list-style: none;
    position: absolute;
    top: 40%;
    width: 100%;
    text-align: center;
  }
  .side-tab li {
    width: 160px;
    margin: 25px auto;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;
  }
  .side-tab li i {
    margin-left: 5px;
  }
  .side-tab li:hover {
    background: #edf0fd;
    color: #315efb;
  }
  .side-tab li:hover i {
    animation: iRotate 0.5s;
  }
  @keyframes iRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .personalCenter-content {
    height: calc(100vh - 162px);
    width: 100%;
    background: url(/img/login-bg.png);
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
    overflow: auto;
  }
  .avatar img {
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
    cursor: pointer;
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
  .current {
    background: #edf0fd;
    color: #315efb;
  }
</style>
