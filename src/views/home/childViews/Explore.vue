<template>
  <div class="explore">
    <div class="explore-container">
      <div class="backTo" @click="backTo">
        <i class="fa-solid fa-backward"></i>
      </div>
      <h3 class="classification">{{ classification }}</h3>
      <h1 class="detail-title">{{ title }}</h1>
      <span class="publicDate">{{ publicDate }}</span>
      <div class="bigImg">
        <img width="900" height="600" :src="bigImgUrl" alt="" />
      </div>
      <div class="wholeContent">
        <p class="newContent">{{ newContent }}</p>
        <div
          class="insertMap"
          v-for="(detail, index) in detailArr"
          :key="index"
        >
          <p class="detail-img-title">
            {{ detail.imgTitle }}
          </p>
          <img
            class="detail-img"
            width="600"
            height="450"
            :src="detail.imgUrl"
            alt=""
          />

          <p class="detail-img-desc">
            {{ detail.imgDesc }}
          </p>
          <p class="detail-text">{{ detail.newText }}</p>
        </div>
      </div>
      <!-- 评论区 -->
      <div class="commentBlock">
        <div class="publicComment" v-show="!isManager && isLogin">
          <div class="userAvatar"><Avatar :size="58" /></div>
          <div class="comment-textarea">
            <textarea
              v-model="userComment"
              cols="60"
              rows="8"
              placeholder="发一条友善的评论吧"
              maxlength="200"
            ></textarea>
          </div>
          <button class="submitCommentButton" @click="publicComment">
            发布评论
          </button>
        </div>
        <span class="noComment" v-if="commentList.length === 0"
          >还没有评论噢~</span
        >
        <span class="spreadComment" @click="spreadComment" v-else
          >展开评论</span
        >
        <div class="comment-container" v-show="isSpread">
          <span class="noLogin" v-show="!isLogin" @click="goSignIn"
            >快登录来加入讨论吧！</span
          >
          <div
            class="userComment"
            v-for="(comment, index) in commentList"
            :key="index"
          >
            <img height="28" width="28" :src="comment.avatar" alt="" />
            <p class="username">{{ comment.username }}</p>
            <p class="publicTime">{{ comment.newPublicTime }}</p>
            <br />
            <p class="userCommentContent">
              {{ comment.newComment }}
            </p>
            <br />
            <span
              class="replyTo"
              v-show="isManager && index + 1 !== currentReply"
              @click="replyTo(index, comment.id)"
              >回复</span
            >
            <span
              class="deleteComment"
              v-show="isManager"
              @click="deleteComment(index, null, comment.id)"
              >删除</span
            >
            <!-- 回复列表 -->
            <div
              class="userComment"
              v-for="(reply, index2) in comment.replys"
              :key="index2"
            >
              <img height="28" width="28" :src="reply.avatar" alt="" />
              <p class="username">{{ reply.username }}</p>
              <p class="publicTime">{{ reply.newPublicTime }}</p>
              <br />
              <p class="userCommentContent">
                {{ reply.newReply }}
              </p>
              <br />
              <span
                class="deleteComment"
                v-show="isManager"
                @click="deleteComment(index, index2, reply.id)"
                >删除</span
              >
            </div>
            <div class="reply-container" v-show="index + 1 === currentReply">
              <textarea
                v-model="managerReply"
                cols="30"
                rows="4"
                maxlength="200"
              ></textarea>
              <button class="submitReplyButton" @click="submitReply">
                回复
              </button>
              <button class="replyCancelButton" @click="cancelReply">
                取消
              </button>
            </div>
          </div>
          <div class="pageButton-container">
            <div
              class="pageButton"
              v-for="index of total"
              :key="index"
              :class="{ currentPage: pageNumber === index }"
              @click="selectPage(index)"
              v-show="total > 1"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from "$components/common/avatar/Avatar.vue";
  import { getDetail } from "$network/homeWelcome.js";
  import {
    addComment,
    getComments,
    addReply,
    getReplys,
    delReply,
    delComment,
  } from "$network/comment.js";

  export default {
    name: "Explore",
    components: { Avatar },
    data() {
      return {
        managerReply: "",
        detailArr: [],
        bigImgUrl: "",
        newContent: "",
        classification: "",
        publicDate: "",
        title: "",
        //是不是管理员
        isManager: false,
        //有没有登录
        isLogin: false,
        //是否展开
        isSpread: false,
        //当前管理员的回复
        currentReply: 0,
        //用户评论
        userComment: "",
        uid:
          localStorage.getItem("user-id") || sessionStorage.getItem("user-id"),
        avatar:
          localStorage.getItem("avatar") || sessionStorage.getItem("avatar"),
        username:
          localStorage.getItem("username") ||
          sessionStorage.getItem("username"),
        //评论列表
        commentList: [],
        pageNumber: 1,
        pageSize: 4,
        total: 0,
        //评论的id
        cid: 0,
        //回复列表
        replyList: [],
      };
    },
    methods: {
      deleteComment(index, index2, id) {
        //说明是删除回复
        if (index2 !== null) {
          delReply(id).then((res) => {
            if (res === 1) {
              //删除成功
              console.log(this.commentList[index].replys);
              this.commentList[index].replys.splice(index2, 1);
              //强制刷新视图，这里数组深层次嵌套后，splice也无法使得视图响应式更新
              this.$forceUpdate();
              this.$toast.show(true, "删除成功!");
            } else {
              this.$toast.show(false, "删除失败");
            }
          });
        } else {
          delComment(id).then((res) => {
            if (res === 1) {
              //删除成功
              this.commentList.splice(index, 1);
              this.$toast.show(true, "删除成功!");
            } else {
              this.$toast.show(false, "删除失败");
            }
          });
        }
      },
      submitReply() {
        if (this.managerReply === "") {
          this.$toast.show(false, "回复不能为空");
        } else {
          addReply(
            this.uid,
            this.managerReply,
            this.cid,
            this.$route.query.id
          ).then((res) => {
            if (res === 1) {
              this.$toast.show(true, "回复成功!");
              //伪造一个假回复用来回显
              this.commentList.forEach((comment) => {
                if (comment.id === this.cid) {
                  comment.replys?.unshift({
                    avatar: this.avatar,
                    username: this.username,
                    newReply: this.managerReply,
                    newPublicTime: "刚刚",
                  });
                }
              });
              this.managerReply = "";
              this.currentReply = 0;
            } else {
              this.$toast.show(false, "回复失败");
            }
          });
        }
      },
      cancelReply() {
        this.currentReply = 0;
        this.managerReply = "";
      },
      //去登录
      goSignIn() {
        this.$router.push("/login");
      },
      //管理员回复
      replyTo(index, cid) {
        this.currentReply = index + 1;
        this.cid = cid;
        this.managerReply = "";
      },
      //如果有多条评论，选择其他
      selectPage(index) {
        if (this.pageNumber === index) {
          return;
        } else {
          this.pageNumber = index;
          this.currentReply = 0;
          this.managerReply = "";
        }
        getComments(this.$route.query.id, this.pageNumber, this.pageSize).then(
          (res) => {
            console.log(res);
            this.commentList = res.list;
            this.total = res.total;
            this.commentList.forEach((comment) => {
              comment.replys = new Array();
              this.replyList.forEach((reply) => {
                if (comment.id === reply.cid) {
                  comment.replys.push(reply);
                }
              });
            });
          }
        );
      },
      //展开评论
      spreadComment() {
        this.isSpread = !this.isSpread;
      },
      //回到上一页
      backTo() {
        this.$router.go(-1);
      },
      //用户发表评论
      publicComment() {
        if (this.userComment === "") {
          this.$toast.show(false, "你还没有评论！");
        } else {
          addComment(this.uid, this.userComment, this.$route.query.id).then(
            (res) => {
              if (res === 1) {
                this.$toast.show(true, "发布评论成功!");
                //伪造一个假评论用来回显
                this.commentList.unshift({
                  avatar: this.avatar,
                  newComment: this.userComment,
                  newPublicTime: "刚刚",
                  username: this.username,
                });
                this.userComment = "";
                //自动展开评论
                this.isSpread = true;
              } else {
                this.$toast.show(false, "发布评论失败");
              }
            }
          );
        }
      },
    },
    mounted() {
      window.scrollTo(0, 0);
      //根据传进来的id查找其相关的所有数据（联合查询）
      getDetail(this.$route.query.id).then((res) => {
        this.detailArr = res;
        this.bigImgUrl = res[0].img;
        this.newContent = res[0].newContent;
        this.classification = res[0].classification;
        this.publicDate = res[0].publicDate;
        this.title = res[0].title;
      });
      //并查询所有评论
      getComments(this.$route.query.id, this.pageNumber, this.pageSize).then(
        (res) => {
          console.log(res);
          this.commentList = res.list;
          this.total = res.total;
          //获取到评论后查询其所有回复
          getReplys(this.$route.query.id).then((res) => {
            console.log(res);
            //单独设置一下管理员头像和用户名
            this.replyList = res;
            this.commentList.forEach((comment) => {
              comment.replys = new Array();
              this.replyList.forEach((reply, index) => {
                if (comment.id === reply.cid) {
                  comment.replys = [...comment.replys, reply];
                }
              });
            });
            console.log(this.commentList);
          });
        }
      );

      //判断当前用户是否登录
      if (localStorage.getItem("rememberMe")) {
        //这是记住我免登录的代码
        this.isLogin = localStorage.getItem("isLogin");
        if (this.isLogin) {
          //判断当前登录用户是不是管理员
          this.isManager = localStorage.getItem("role") === "管理员";
        }
      } else {
        //不记住的代码
        this.isLogin = sessionStorage.getItem("isLogin");
        if (this.isLogin) {
          //判断当前登录用户是不是管理员
          this.isManager = sessionStorage.getItem("role") === "管理员";
        }
      }
    },
  };
</script>

<style scoped>
  .detail-img {
    border: none;
  }
  .wholeContent {
    width: 600px;
    margin: auto;
  }
  .explore-container {
    width: 55%;
    margin: auto;
    text-align: center;
    position: relative;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
  }
  .classification {
    text-align: left;
    color: #ed2947;
    margin-left: 200px;
  }
  .detail-title {
    font-weight: bold;
    color: black;
    text-align: left;
    margin: 10px;
    margin-left: 200px;
    padding: 0;
  }
  .publicDate {
    color: #28315f;
    position: absolute;
    right: 200px;
    top: 50px;
  }
  .bigImg {
    width: 908px;
    height: 608px;
    border: 4px solid #ec2127;
    margin: 10px auto 40px;
  }
  .newContent {
    color: black;
  }
  .detail-img-title {
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    color: black;
    margin: 40px 0 10px 0px;
  }
  .detail-img-desc {
    text-align: left;
    margin: 0 0 10px 0px;
  }
  .detail-text {
    color: black;
    margin: 40px 0 0px 0;
  }
  .backTo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #b3d46e;
    line-height: 40px;
    position: absolute;
    text-align: center;
    color: white;
    top: 20px;
    left: 20px;
  }
  .backTo:hover {
    cursor: pointer;
    background: #70883d;
  }
  .commentBlock {
    width: 100%;
    padding: 50px;
  }
  .commentBlock .comment-container {
    width: 100%;
    margin-top: 50px;
  }
  .userComment {
    padding: 30px 100px;
    width: 100%;
    text-align: left;
    position: relative;
  }
  .userComment .username {
    color: #00000073;
    font-size: 13px;
    float: left;
    margin: 0 4px;
  }
  .userComment img {
    border-radius: 50%;
    display: block;
    float: left;
  }
  .userComment .userCommentContent {
    font-size: 13px;
    color: black;
    margin: 5px 0 0 36px;
  }
  .publicTime {
    font-size: 13px;
    color: #cccccc;
    float: left;
  }
  .replyTo {
    font-size: 13px;
    color: #00000073;
    cursor: pointer;
  }
  .spreadComment {
    cursor: pointer;
  }
  .spreadComment,
  .noComment {
    font-size: 13px;
    color: #00000073;
    display: inline-block;
    transform: translateY(20px);
  }
  .publicComment {
    width: 100%;
    height: 200px;
    padding: 20px;
    position: relative;
  }
  .userAvatar {
    text-align: left;
    width: 58px;
    height: 58px;
    position: absolute;
    left: 12%;
  }
  .comment-textarea {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 5%;
  }
  .comment-textarea textarea {
    resize: none;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    border: 0.075rem solid #e4e2e2;
    outline: none;
    transition: 0.5s;
  }
  .comment-textarea textarea:focus {
    border: 0.075rem solid #70a1ff;
  }
  .submitCommentButton {
    position: absolute;
    right: 10%;
    top: 25%;
    width: 90px;
    height: 90px;
    border-radius: 15px;
    padding: 22px;
    cursor: pointer;
    color: white;
    background: #70a1ff;
    border: none;
    transition: 0.5s;
  }
  .submitCommentButton:hover {
    background: #1e90ff;
  }
  .pageButton-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }
  .pageButton {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1px solid;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    float: left;
    margin-left: 5px;
    cursor: pointer;
  }
  .currentPage {
    background: black;
  }
  .noLogin {
    font-size: 13px;
    cursor: pointer;
    color: #00000073;
  }
  .noLogin:hover {
    border-bottom: 1px solid #9e9d9d;
  }
  .reply-container {
    padding: 20px;
    position: relative;
  }
  .reply-container textarea {
    resize: none;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    border: 0.075rem solid #e4e2e2;
    outline: none;
    font-size: 13px;
    transition: 0.5s;
  }
  .reply-container textarea:focus {
    border: 0.075rem solid #70a1ff;
  }
  .submitReplyButton {
    font-size: 13px;
    width: 55px;
    height: 30px;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    background: #70a1ff;
    border: none;
    transition: 0.5s;
    position: absolute;
    right: 32%;
    bottom: 40%;
  }
  .submitReplyButton:hover {
    background: #1e90ff;
  }
  .replyCancelButton {
    position: absolute;
    right: 32%;
    bottom: 15%;
    font-size: 13px;
    width: 55px;
    height: 30px;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    background: #ff6b6b;
    border: none;
    transition: 0.5s;
  }
  .replyCancelButton:hover {
    background: #ee5253;
  }
  .relativeReply {
    font-size: 13px;
    color: #00000073;
  }
  .deleteComment {
    font-size: 13px;
    color: #00000073;
    cursor: pointer;
    margin-left: 10px;
  }
</style>
