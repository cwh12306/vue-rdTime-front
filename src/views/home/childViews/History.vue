<template>
  <div class="history">
    <div class="subject-container">
      <p class="basicText headWelcome">
        欢迎访问社会研究工作表页面！在这里，你可以找到有关历史和地理的工作表，包括涂色页面、单词搜索、写作活动、拼图等等。
      </p>
      <div class="divider"></div>
      <h1 class="subject-title">多级历史工作表</h1>
      <img width="189" height="253" src="img/subject/history1.jpg" alt="" />
      <div class="pdfContent">
        <div
          class="subject-pdf"
          :key="index"
          v-for="(item, index) in subjectList[0]"
        >
          <span class="pdf-title" @click="openPdf(item.pdfUrl)">{{
            item.title
          }}</span>
          <span class="pdf-contentText">——{{ item.newContentText }}</span>
          <br />
        </div>
      </div>
      <h2 class="subject-title">历史谜题</h2>
      <img width="189" height="253" src="img/subject/history2.jpg" alt="" />
      <div class="pdfContent">
        <div
          class="subject-pdf"
          :key="index"
          v-for="(item, index) in subjectList[1]"
        >
          <span class="pdf-title" @click="openPdf(item.pdfUrl)">{{
            item.title
          }}</span>
          <span class="pdf-contentText">——{{ item.newContentText }}</span>
          <br />
        </div>
      </div>

      <h2 class="subject-title">地图工作表</h2>
      <img width="189" height="253" src="img/subject/history3.jpg" alt="" />
      <div class="pdfContent">
        <div
          class="subject-pdf"
          :key="index"
          v-for="(item, index) in subjectList[2]"
        >
          <span class="pdf-title" @click="openPdf(item.pdfUrl)">{{
            item.title
          }}</span>
          <span class="pdf-contentText">——{{ item.newContentText }}</span>
          <br />
        </div>
      </div>
      <br />
      <br />
      <div class="divider"></div>
      <Swiper :imgList="imagesUrl" />
    </div>
  </div>
</template>

<script>
  import Swiper from "$components/common/swiper/Swiper.vue";
  import { getSubject } from "$network/homeWelcome.js";

  export default {
    name: "History",
    components: { Swiper },
    mounted() {
      getSubject("history").then((res) => {
        const arr1 = [];
        const arr2 = [];
        const arr3 = [];
        res.forEach((item, index) => {
          if (index < 7) {
            arr1.push(item);
          } else if (index >= 7 && index < 16) {
            arr2.push(item);
          } else {
            arr3.push(item);
          }
        });
        this.subjectList.push(arr1, arr2, arr3);
      });
    },
    methods: {
      openPdf(pdfUrl) {
        window.open(pdfUrl);
      },
    },
    data() {
      return {
        subjectList: [],
        imagesUrl: [
          "img/history/1.jpg",
          "img/history/2.jpg",
          "img/history/3.jpg",
          "img/history/4.jpg",
          "img/history/5.jpg",
          "img/history/6.jpg",
          "img/history/7.jpg",
          "img/history/8.jpg",
          "img/history/9.jpg",
          "img/history/10.jpg",
          "img/history/11.jpg",
          "img/history/12.jpg",
          "img/history/13.jpg",
          "img/history/14.jpg",
          "img/history/15.jpg",
          "img/history/16.jpg",
          "img/history/17.jpg",
          "img/history/18.jpg",
          "img/history/19.jpg",
          "img/history/20.jpg",
          "img/history/21.jpg",
          "img/history/22.jpg",
          "img/history/23.jpg",
          "img/history/24.jpg",
          "img/history/25.jpg",
        ],
      };
    },
  };
</script>

<style scoped>
  .subject-container {
    padding: 20px;
    width: 50%;
    margin: auto;
  }
  .basicText {
    font-size: 14px;
  }
  .headWelcome {
    margin-bottom: 20px;
  }
  .divider {
    height: 3px;
    width: 100%;
    margin-bottom: 5px;
    background-image: repeating-linear-gradient(
      to right,
      #f0c24b 0px,
      #f0c24b 70px,
      #b5d56a 70px,
      #b5d56a 140px,
      #ea7066 140px,
      #ea7066 210px,
      #84bed6 210px,
      #84bed6 280px,
      #a597e7 280px,
      #a597e7 350px,
      #ea77ad 350px,
      #ea77ad 420px
    );
  }
  .subject-title {
    font-weight: 100;
    color: #6c757d;
    margin-bottom: 15px;
  }
  h1.subject-title {
    font-size: 24px;
    font-weight: bold;
  }
  h2.subject-title {
    font-size: 20px;
    font-weight: bold;
  }
  .pdf-contentText {
    font-size: 14px;
    line-height: 26px;
  }
  .pdf-title {
    font-size: 14px;
    color: #e13123;
    cursor: pointer;
  }
  .pdf-title:hover {
    text-decoration: underline;
  }
  img {
    float: left;
    margin-right: 20px;
  }
  .pdfContent {
    margin-bottom: 20px;
  }
</style>
