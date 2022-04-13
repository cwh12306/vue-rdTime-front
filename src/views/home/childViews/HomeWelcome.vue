<template>
  <div class="homeWelcome">
    <div class="welcoming"></div>
    <div class="container">
      <div class="mainContent">
        <p>
          欢迎来到Tlsbooks!<br /><br />
          Tlsbooks为您提供各种免费可打印的工作表，供您在家或教室使用。你会发现数以千计的工作表适合学龄前到六年级的学生。这些教育工作表可用于补充您的幼儿教育计划、家庭日托资源、小学教室或家庭学校课程。<br /><br />
          家长们喜欢使用这些免费的工作表来帮助他们的孩子获得有价值的准备技能，或者巩固他们的孩子可能已经在学校学习的内容。教师们欣赏这样一个事实：他们可以打印补充材料，用于课堂、家庭作业，或作为困难学生的额外练习。<br /><br />
          除了这些独特的教育工作表，你还会发现有趣的彩色页面、各种打印好的教师资源、谜题和阅读技巧。尽管我们的使用条款禁止保存工作表，但欢迎您随时返回打印您可能需要的材料。<br /><br />
          本网站上的所有材料都可能是供您个人使用的非商业印刷材料（包括课堂印刷材料）。在本网站上找到的教育材料可能不会被托管在任何其他网站、博客、论坛等上。在使用本网站的任何材料之前，请熟悉这些使用条款。<br /><br />
        </p>
        <div class="divider"></div>
        <div class="newUpdate">
          <h3 class="contentTitle">更新的内容</h3>
          <br />
          <p>
            <span class="date">5/30/22:</span>
            夏天到了，但仅仅因为学生不在教室里，并不意味着他们应该停止学习！让你的学生了解我们新的暑期阅读日志，或者挑战他们在这个夏天阅读100本书，并颁发证书！
            <br /><br />
            <span class="date">4/11/22:</span>
            我们更新了所有拼写列表，并将其转换为易于打印的PDF文件。单击此处转到拼写工作表页面。
            <br /><br />
            <span class="date">4/29/22:</span>
            我们已经更新了网站的外观和感觉！我们希望这次重新设计能改善你对网站的体验，让你更容易更快地找到你想要的材料。如果您对此或本网站的任何其他方面有任何疑问或反馈，请访问我们的联系页面。感谢您访问TLSBooks！
            <br /><br />
          </p>
        </div>
        <div class="explore">
          <h3 class="contentTitle">探索我们的网站</h3>
          <br />
          <ExploreBlock
            v-show="pageNumber === mediaResource.pageNumber"
            v-for="(mr, index) in mediaResource.list"
            :key="index"
            :id="mr.id"
            :img="mr.img"
            :content="mr.newContent"
            :title="mr.title"
            :publicDate="mr.publicDate"
            :classification="mr.classification"
          />
          <div class="pageNumber">
            <div
              @click="chosePage(index)"
              class="pageButton"
              v-for="index of mediaResource.total"
              :key="index"
              :class="{
                pageButtonSelected: index === mediaResource.pageNumber,
              }"
            >
              {{ index }}
            </div>
            <div class="pageButton" @click="nextPage">next</div>
          </div>
        </div>
      </div>
      <div class="side-bar">
        <div class="popularContent-header">Popular Content</div>
        <div class="popularContent">
          <div class="borderDiv">
            <div class="commonDiv colors-and-shapes" @click="openPdf1"></div>
            <p class="text-link" @click="openPdf1">给图形上色</p>
          </div>
          <div class="borderDiv">
            <div
              class="commonDiv comparing-numbers-100"
              @click="openPdf2"
            ></div>
            <p class="text-link" @click="openPdf2">比较100以内的数字</p>
          </div>
          <div class="borderDiv">
            <div class="commonDiv puppy" @click="openPdf3"></div>
            <p class="text-link" @click="openPdf3">找到文本中的单词</p>
          </div>
          <div class="borderDiv">
            <div class="commonDiv math-square" @click="openPdf4"></div>
            <p class="text-link" @click="openPdf4">数字矩阵</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ExploreBlock from "$components/content/homeWelcome/ExploreBlock.vue";

  import { getMediaResource } from "$network/homeWelcome.js";

  export default {
    name: "HomeWelcome",
    components: { ExploreBlock },
    methods: {
      openPdf1() {
        window.open("http://localhost:8088/tb/images/colors-and-shapes-1.pdf");
      },
      openPdf2() {
        window.open(
          "http://localhost:8088/tb/images/comparing-numbers-100.pdf"
        );
      },
      openPdf3() {
        window.open("http://localhost:8088/tb/images/puppy.pdf");
      },
      openPdf4() {
        window.open("http://localhost:8088/tb/images/math-square.pdf");
      },
      chosePage(index) {
        window.scrollTo(0, 800);
        this.pageNumber = index;
        getMediaResource(this.pageSize, this.pageNumber).then((res) => {
          this.mediaResource = res;
        });
      },
      nextPage() {
        if (this.pageNumber < this.total) {
          this.pageNumber++;
          window.scrollTo(0, 800);
        } else {
          return;
        }
        getMediaResource(this.pageSize, this.pageNumber).then((res) => {
          this.mediaResource = res;
        });
      },
    },
    data() {
      return {
        mediaResource: {},
        //当前页码,默认是1
        pageNumber: 1,
        //一页可以显示多少数据,默认是4
        pageSize: 4,
        total: 0,
      };
    },
    mounted() {
      getMediaResource(this.pageSize, this.pageNumber).then((res) => {
        this.mediaResource = res;
        this.total = res.total;
      });
    },
  };
</script>

<style scoped>
  .welcoming {
    width: 100%;
    height: 100px;
    background: url(~$assets/img/welcome.png);
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  .homeWelcome {
    height: 2060px;
  }
  .container {
    width: 1150px;
    margin: auto;
  }
  .mainContent {
    float: left;
    width: 76%;
    padding: 20px;
  }
  .side-bar {
    float: left;
    width: 24%;
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
  .date {
    font-weight: bold;
  }
  .contentTitle {
    color: #6c757d;
  }
  .pageButton {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #f2f3f5;
    color: #ed2947;
    font-weight: bold;
    width: 40px;
    float: left;
    margin: 0px 20px 0px 0px;
  }
  .pageButton:hover {
    cursor: pointer;
  }
  .pageButtonSelected {
    background: #ed2947;
    color: white;
  }
  .popularContent-header {
    height: 40px;
    width: 100%;
    background: #a597e7;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    line-height: 40px;
    padding-left: 20px;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  .popularContent {
    border: 1px solid #e7e7e7;
  }
  .borderDiv {
    border-bottom: 1px solid #e7e7e7;
  }
  .colors-and-shapes {
    background: url(~$assets/img/colors-and-shapes.jpg);
  }
  .comparing-numbers-100 {
    background: url(~$assets/img/comparing-numbers-100.jpg);
  }
  .puppy {
    background: url(~$assets/img/puppy.jpg);
  }
  .math-square {
    background: url(~$assets/img/math-square.jpg);
  }

  .commonDiv {
    width: 240px;
    height: 305px;
    margin: 16px;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid #e7e7e7;
  }
  .commonDiv:hover {
    cursor: pointer;
  }
  .text-link {
    color: #8022b5;
    font-size: 14px;
    margin: 16px;
  }
  .text-link:hover {
    color: #e13123;
    cursor: pointer;
  }
</style>
