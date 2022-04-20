<template>
  <div class="avatar">
    <img width="28" height="28" :src="avatarUrl" alt="" />
  </div>
</template>

<script>
  export default {
    name: "Avatar",
    props: {
      avatarUrl: {
        type: String,
      },
    },
    mounted() {
      console.log(this.avatarUrl);
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
