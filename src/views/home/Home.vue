<template>
  <div class="home">
    <Header />
    <keep-alive include="HomeWelcome"> <router-view></router-view> </keep-alive>
    <Footer />
    <div class="backToTop" @click="backToTop" v-show="isShow">
      <i class="fa-solid fa-arrow-up"></i>
    </div>
  </div>
</template>

<script>
  import Header from "$components/content/header/Header.vue";
  import Footer from "$components/content/footer/Footer.vue";
  export default {
    name: "Home",
    components: { Header, Footer },
    data() {
      return {
        isShow: false,
      };
    },
    methods: {
      backToTop() {
        window.scrollTo(0, 0);
      },
      //判断整个页面滚动的距离
      handleScroll() {
        let browserScrollDistance = document.documentElement.scrollTop;
        if (browserScrollDistance > 700) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      },
    },
    mounted() {
      //监听滚动条滚动事件
      addEventListener("scroll", this.handleScroll, true);
    },
  };
</script>
<style scoped>
  .backToTop {
    position: fixed;
    width: 40px;
    height: 40px;
    color: white;
    border-radius: 50%;
    background: #f46e68;
    right: 80px;
    bottom: 40px;
    line-height: 40px;
    font-size: 30px;
    text-align: center;
  }
  .backToTop:hover {
    cursor: pointer;
    background: #9c3b36;
  }
</style>
