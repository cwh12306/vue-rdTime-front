<template>
  <div class="englishDetail">
    <div class="englishDetail-container">
      <div class="backTo" @click="backTo">
        <i class="fa-solid fa-backward"></i>
      </div>
      <p class="title">{{ detail.title }}</p>
      <audio class="audio" :src="detail.audio" controls></audio>
      <div class="content">
        <p v-for="(p, index) in detail.arr" :key="index">{{ p }}</p>
      </div>
      <video :src="detail.video" controls width="400" height="300"></video>
    </div>
  </div>
</template>

<script>
  import { getEnglishDetail } from "$network/homeWelcome.js";
  export default {
    name: "EnglishDetail",
    data() {
      return {
        detail: {},
      };
    },
    methods: {
      backTo() {
        this.$router.go(-1);
      },
    },
    mounted() {
      //根据id查询所有数据
      getEnglishDetail(this.$route.query.id).then((res) => {
        this.detail = res;
        console.log(res);
        this.detail.arr = this.detail.content.split(/\n/);
      });
    },
  };
</script>

<style scoped>
  .englishDetail-container {
    width: 70%;
    padding: 20px;
    margin: 20px auto;
    background: #f3eadc;
    text-align: center;
    position: relative;
  }
  .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
    color: #ee5253;
    font-weight: bold;
  }
  .audio {
    margin-bottom: 20px;
  }
  .content {
    text-align: left;
    margin: 0 auto;
    width: 50%;
    background: #fbf9f5;
    padding: 20px;
    border-radius: 15px;
    color: black;
    font-weight: bold;
    border: 2px solid white;
  }
  .content p {
    margin-bottom: 10px;
    font-size: 18px;
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
</style>
