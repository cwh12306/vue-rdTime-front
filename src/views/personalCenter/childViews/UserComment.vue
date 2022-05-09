<template>
  <div class="userComment">userComment</div>
</template>

<script>
  import { getCommentAndReply } from "$network/homeWelcome.js";
  export default {
    name: "UserComment",
    data() {
      return {
        commentAndReplyList: [],
        uid:
          localStorage.getItem("user-id") || sessionStorage.getItem("user-id"),
      };
    },
    mounted() {
      getCommentAndReply(this.uid).then((res) => {
        this.commentAndReplyList = res;
        console.log(this.commentAndReplyList);
      });
    },
  };
</script>

<style scoped></style>
