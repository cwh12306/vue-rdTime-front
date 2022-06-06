<template>
  <div class="science">
    <div class="subject-container">
      <p class="basicText headWelcome">
        欢迎访问科学工作表页面！在这里你可以找到生物学、物理科学、天文学等方面的工作表。这些谜题、阅读理解和批判性思维练习以及彩色页面是对孩子科学教育的极大补充。
      </p>
      <div class="divider"></div>
      <h1 class="subject-title">多级科学工作表</h1>
      <h2 class="subject-title">物理科学</h2>
      <img width="189" height="253" src="img/subject/science1.jpg" alt="" />
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
      <h2 class="subject-title">地球科学</h2>
      <img width="189" height="253" src="img/subject/science2.jpg" alt="" />
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
      <h2 class="subject-title">生命科学</h2>
      <img width="189" height="253" src="img/subject/science3.jpg" alt="" />
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
      <div class="divider"></div>
      <Swiper :imgList="imagesUrl" />
    </div>
  </div>
</template>

<script>
  import Swiper from "$components/common/swiper/Swiper.vue";
  import { getSubject } from "$network/homeWelcome.js";

  export default {
    name: "Science",
    components: { Swiper },
    methods: {
      openPdf(pdfUrl) {
        window.open(pdfUrl);
      },
    },
    mounted() {
      getSubject("science").then((res) => {
        const arr1 = [];
        const arr2 = [];
        const arr3 = [];
        res.forEach((item, index) => {
          if (index < 12) {
            arr1.push(item);
          } else if (index >= 12 && index < 22) {
            arr2.push(item);
          } else {
            arr3.push(item);
          }
        });
        this.subjectList.push(arr1, arr2, arr3);
      });
    },
    data() {
      return {
        subjectList: [],
        imagesUrl: [
          "img/science/1.png",
          "img/science/2.png",
          "img/science/3.png",
          "img/science/4.png",
          "img/science/5.png",
          "img/science/6.png",
          "img/science/7.png",
          "img/science/8.png",
          "img/science/9.png",
          "img/science/10.png",
          "img/science/11.png",
          "img/science/12.png",
          "img/science/13.png",
          "img/science/14.png",
          "img/science/15.png",
          "img/science/16.png",
          "img/science/17.png",
          "img/science/18.png",
          "img/science/19.png",
          "img/science/20.png",
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
    font-size: 20px;
  }
  h2.subject-title {
    font-size: 16px;
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
