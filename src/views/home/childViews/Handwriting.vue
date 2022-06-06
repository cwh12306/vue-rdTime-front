<template>
  <div class="handwriting">
    <div class="subject-container">
      <p class="basicText headWelcome">
        欢迎来到手写工作表页面！在这里你会发现 补充和强化孩子书写的工作表
        进步本页包含开头的手写材料，草书 练习等等。
      </p>
      <div class="divider"></div>
      <h1 class="subject-title">多级手写工作表</h1>
      <h2 class="subject-title">基本手写工作表</h2>
      <img width="189" height="253" src="img/subject/handwriting1.jpg" alt="" />
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
      <h2 class="subject-title">Zaner Bloser©-风格手写工作表</h2>
      <img width="189" height="253" src="img/subject/handwriting2.jpg" alt="" />
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
      <h2 class="subject-title">D'Nealian®风格手写字体。</h2>
      <img width="189" height="253" src="img/subject/handwriting3.jpg" alt="" />
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
      <h2 class="subject-title">草书练习工作表</h2>
      <img width="189" height="253" src="img/subject/handwriting4.jpg" alt="" />
      <div class="pdfContent">
        <div
          class="subject-pdf"
          :key="index"
          v-for="(item, index) in subjectList[3]"
        >
          <span class="pdf-title" @click="openPdf(item.pdfUrl)">{{
            item.title
          }}</span>
          <span class="pdf-contentText">——{{ item.newContentText }}</span>
          <br />
        </div>
      </div>
      <h2 class="subject-title">主题手写练习工作表</h2>
      <div class="pdfContent">
        <div
          class="subject-pdf"
          :key="index"
          v-for="(item, index) in subjectList[4]"
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
    name: "Handwriting",
    components: { Swiper },
    mounted() {
      getSubject("handwriting").then((res) => {
        const arr1 = [];
        const arr2 = [];
        const arr3 = [];
        const arr4 = [];
        const arr5 = [];
        res.forEach((item, index) => {
          if (index < 7) {
            arr1.push(item);
          } else if (index >= 7 && index < 20) {
            arr2.push(item);
          } else if (index >= 20 && index < 29) {
            arr3.push(item);
          } else if (index >= 29 && index < 38) {
            arr4.push(item);
          } else {
            arr5.push(item);
          }
        });
        this.subjectList.push(arr1, arr2, arr3, arr4, arr5);
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
          "img/handwriting/1.png",
          "img/handwriting/2.png",
          "img/handwriting/3.png",
          "img/handwriting/4.png",
          "img/handwriting/5.png",
          "img/handwriting/6.png",
          "img/handwriting/7.png",
          "img/handwriting/8.png",
          "img/handwriting/9.png",
          "img/handwriting/10.png",
          "img/handwriting/11.png",
          "img/handwriting/12.png",
          "img/handwriting/13.png",
          "img/handwriting/14.png",
          "img/handwriting/15.png",
          "img/handwriting/16.png",
          "img/handwriting/17.png",
          "img/handwriting/18.png",
          "img/handwriting/19.png",
          "img/handwriting/20.png",
          "img/handwriting/21.png",
          "img/handwriting/22.png",
          "img/handwriting/23.png",
          "img/handwriting/24.png",
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
  .title-desc {
    font-style: italic;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
