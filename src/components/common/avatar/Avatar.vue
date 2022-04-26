<template>
  <div class="avatar">
    <img ref="avatar" width="28" height="28" alt="" />
  </div>
</template>

<script>
  import { getAvatar } from "$network/personalCenter.js";
  export default {
    name: "Avatar",
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
  .avatar {
    height: 28px;
    width: 28px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
  }
</style>
