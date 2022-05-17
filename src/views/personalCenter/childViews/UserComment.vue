<template>
  <div class="user-comment">
    <div
      class="userComment"
      @click="selComment(comment.id, index)"
      :class="{ activeItem: currentIndex === index }"
      v-for="(comment, index) in comments"
      :key="index"
    >
      <div class="user-avatar">
        <Avatar :userId="Number(comment.uid)" :size="28" />
      </div>
      <p class="username">{{ username }}</p>
      <p class="publicTime">{{ comment.newPublicTime }}</p>
      <br />
      <p class="userCommentContent">
        {{ comment.newComment }}
      </p>
      <i
        class="fa-solid fa-xmark cwh-error"
        @click="removeComment(comment.id, index)"
      ></i>
      <span class="newReply" v-show="idList.indexOf(comment.id) !== -1"
        >新回复！</span
      >
      <br />
    </div>

    <div class="replyBlock" v-show="isShow">
      <span class="noReply" v-show="replys.length === 0">还没有回复噢~</span>
      <div
        class="userComment"
        v-for="(reply, index) in replys"
        :key="index"
        v-show="replys.length !== 0"
      >
        <div class="user-avatar">
          <img :src="reply.avatar" width="28" height="28" alt="" />
        </div>
        <p class="username">{{ reply.username }}</p>
        <p class="publicTime">{{ reply.newPublicTime }}</p>
        <br />
        <p class="userCommentContent">
          {{ reply.newReply }}
        </p>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from "$components/common/avatar/Avatar.vue";

  import {
    getReplysByCid,
    getAllNewReply,
    getCommentsByUid,
    updateNewReply,
    delComment,
  } from "$network/comment.js";
  export default {
    name: "UserComment",
    components: { Avatar },
    data() {
      return {
        comments: [],
        uid:
          localStorage.getItem("user-id") || sessionStorage.getItem("user-id"),
        avatar:
          localStorage.getItem("avatar") || sessionStorage.getItem("avatar"),
        username:
          localStorage.getItem("username") ||
          sessionStorage.getItem("username"),
        currentIndex: null,
        idList: [],
        replys: [],
        //回复区块是否显示
        isShow: false,
      };
    },
    mounted() {
      //获取该用户的所有评论
      getCommentsByUid(this.uid).then((res) => {
        this.comments = res;
        console.log(this.comments);
        //获取所有评论对应的回复
        const idList = [];
        this.comments.forEach((comment) => {
          idList.push(comment.id);
        });
        const newIdList = [];
        getAllNewReply().then((res) => {
          res.forEach((item) => {
            newIdList.push(item.cid);
          });
          const arr = newIdList.filter((item) => new Set(idList).has(item));
          console.log(arr);
          //去重
          this.idList = [...new Set(arr)];
        });
      });
    },
    methods: {
      //删除评论
      removeComment(id, index) {
        delComment(id).then((res) => {
          if (res) {
            this.replys = [];
            this.comments.splice(index, 1);
            this.$toast.show(true, "删除成功");
          } else {
            this.$toast.show(false, "删除失败");
          }
        });
        console.log(id);
      },
      selComment(cid, index) {
        this.isShow = true;
        this.currentIndex = index;
        //发送请求获取该回复的所有评论
        getReplysByCid(cid).then((res) => {
          console.log(res);
          this.replys = res;
          if (res.length !== 0) {
            updateNewReply(cid).then((res) => {
              if (res) {
                this.idList.splice(this.idList.indexOf(cid), 1);
              } else {
                this.$toast.show(false, "查询回复失败，服务器错误!");
              }
            });
          }
        });
      },
    },
  };
</script>

<style scoped>
  .userComment {
    padding: 15px;
    margin: 15px 0px;
    width: 100%;
    text-align: left;
    position: relative;
    border-bottom: 1px solid #afafaf8f;
    cursor: pointer;
    transition: 0.5s;
  }
  .userComment:hover {
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
  }
  .userComment:hover .cwh-error {
    opacity: 1;
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
  .activeItem {
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    border: 1px solid #54a0ff;
  }
  .newReply {
    font-size: 13px;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    color: #eb4d4b;
  }
  .replyBlock {
    position: fixed;
    right: 150px;
    top: 12%;
    z-index: 100;
    width: 400px;
    height: 500px;
    background: #fff;
    border-radius: 15px;
    padding: 20px;
  }
  .cwh-error {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    line-height: 20px;
    color: white;
    background: #ff4d4f;
    border-radius: 50%;
    text-align: center;
    right: -4px;
    top: -4px;
    opacity: 0;
    z-index: 100;
  }
  .cwh-error:hover {
    background: #ad2d2f;
  }
  .noReply {
    font-size: 13px;
    color: #00000073;
    display: inline-block;
    transform: translateX(150%);
  }
  .user-avatar {
    float: left;
  }
</style>
