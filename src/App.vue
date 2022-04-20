<template>
  <div id="app">
    <router-view v-show="isShow" />
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        isShow: true,
      };
    },
    provide() {
      return {
        reload: this.reload,
      };
    },
    methods: {
      reload() {
        this.isShow = false;
        this.$nextTick(() => {
          this.isShow = true;
        });
      },
    },
  };
</script>

<style scoped>
  @import "~$assets/css/base.css";
</style>
