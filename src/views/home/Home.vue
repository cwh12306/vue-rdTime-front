<template>
  <div class="home">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
  import Header from "$components/content/header/Header.vue";
  import Footer from "$components/content/footer/Footer.vue";
  export default {
    name: "Home",
    components: { Header, Footer },
  };
</script>
<style scoped></style>
