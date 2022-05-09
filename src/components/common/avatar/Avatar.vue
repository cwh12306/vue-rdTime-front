<template>
  <div class="avatar">
    <img class="user-avatar" ref="avatar" :width="size" :height="size" alt="" />
  </div>
</template>

<script>
  import { getAvatar } from "$network/personalCenter.js";
  export default {
    name: "Avatar",
    props: {
      size: {
        type: Number,
        default() {
          return 28;
        },
      },
    },
    data() {
      return {
        id:
          sessionStorage.getItem("user-id") || localStorage.getItem("user-id"),
      };
    },
    mounted() {
      this.id &&
        getAvatar(this.id).then((res) => {
          const imageUrl = (window.URL || window.webkitURL).createObjectURL(
            res
          );
          this.$refs.avatar.src = imageUrl;
        });
    },
  };
</script>

<style scoped>
  .user-avatar {
    border-radius: 50%;
  }
</style>
