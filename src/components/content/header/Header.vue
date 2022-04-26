<template>
  <div class="header">
    <Welcome /><Nav />
    <div class="backImg">
      <div class="title">TLSBooks.com</div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Welcome from "./childComponents/Welcome.vue";
  import Nav from "./childComponents/Nav.vue";
  export default {
    name: "Header",
    components: { Welcome, Nav },
  };
</script>

<style scoped>
  .backImg {
    width: 100%;
    height: 252px;
    background-image: url(/img/headerBackImg.jpg);
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .title {
    color: white;
    font-size: 40px;
    transform: translate(-50%, -100%);
    position: absolute;
    top: 50%;
    left: 50%;
    text-shadow: 4px 2px 2px black;
  }
</style>
