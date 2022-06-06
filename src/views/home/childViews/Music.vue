<template>
  <div class="music">
    <div class="subject-container">
      <p class="basicText headWelcome">
        欢迎访问音乐工作表页面！在这里，你可以找到一些关于伟大作曲家的音乐工作表和关于各种乐器的工作表。此外，还有一些补充材料，如音乐练习时间表，以帮助您的年轻音乐家保持正轨。
      </p>
      <div class="divider"></div>
      <h1 class="subject-title">音乐工作表和彩色页面</h1>

      <h2 class="subject-title">可打印音乐书籍</h2>
      <img width="189" height="253" src="img/subject/music1.jpg" alt="" />
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p class="basicText">
        以下所有作曲家书籍的篇幅都在13-16页之间，其中包括测验和写作练习。为了打印和装订每本书，您需要4-5张8.5
        x 11的纸张、订书钉和文件中附带的打印说明。
      </p>
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
      <h2 class="subject-title">乐器系列</h2>
      <img width="189" height="253" src="img/subject/music2.jpg" alt="" />
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
      <h2 class="subject-title">其他音乐工作表</h2>
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
      <div class="divider"></div>
      <Swiper :imgList="imagesUrl" />
    </div>
  </div>
</template>

<script>
  import Swiper from "$components/common/swiper/Swiper.vue";
  import { getSubject } from "$network/homeWelcome.js";

  export default {
    name: "Music",
    components: { Swiper },
    methods: {
      openPdf(pdfUrl) {
        window.open(pdfUrl);
      },
    },
    mounted() {
      getSubject("music").then((res) => {
        const arr1 = [];
        const arr2 = [];
        const arr3 = [];
        const arr4 = [];
        res.forEach((item, index) => {
          if (index < 2) {
            arr1.push(item);
          } else if (index >= 2 && index < 7) {
            arr2.push(item);
          } else if (index >= 7 && index < 19) {
            arr3.push(item);
          } else {
            arr4.push(item);
          }
        });
        this.subjectList.push(arr1, arr2, arr3, arr4);
      });
    },
    data() {
      return {
        subjectList: [],
        imagesUrl: [
          "img/music/1.png",
          "img/music/2.png",
          "img/music/3.png",
          "img/music/4.png",
          "img/music/5.png",
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
    margin-bottom: 20px;
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
