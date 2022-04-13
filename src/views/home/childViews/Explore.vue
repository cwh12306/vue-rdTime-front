<template>
  <div class="explore">
    <div class="explore-container">
      <div class="backTo" @click="backTo">
        <i class="fa-solid fa-backward"></i>
      </div>
      <h3 class="classification">{{ classification }}</h3>
      <h1 class="detail-title">{{ title }}</h1>
      <span class="publicDate">{{ publicDate }}</span>
      <div class="bigImg">
        <img width="900" height="600" :src="bigImgUrl" alt="" />
      </div>
      <div class="wholeContent">
        <p class="newContent">{{ newContent }}</p>
        <div
          class="insertMap"
          v-for="(detail, index) in detailArr"
          :key="index"
        >
          <p class="detail-img-title">
            {{ detail.imgTitle }}
          </p>
          <img
            class="detail-img"
            width="600"
            height="450"
            :src="detail.imgUrl"
            alt=""
          />

          <p class="detail-img-desc">
            {{ detail.imgDesc }}
          </p>
          <p class="detail-text">{{ detail.newText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDetail } from "$network/homeWelcome.js";

  export default {
    name: "Explore",
    data() {
      return {
        detailArr: [],
        bigImgUrl: "",
        newContent: "",
        classification: "",
        publicDate: "",
        title: "",
      };
    },
    methods: {
      backTo() {
        this.$router.go(-1);
      },
    },
    mounted() {
      window.scrollTo(0, 0);
      //根据传进来的id查找其相关的所有数据（联合查询）
      getDetail(this.$route.query.id).then((res) => {
        this.detailArr = res;
        this.bigImgUrl = res[0].img;
        this.newContent = res[0].newContent;
        this.classification = res[0].classification;
        this.publicDate = res[0].publicDate;
        this.title = res[0].title;
      });
    },
  };
</script>

<style scoped>
  .detail-img {
    border: none;
  }
  .wholeContent {
    width: 600px;
    margin: auto;
  }
  .explore-container {
    width: 55%;
    margin: auto;
    text-align: center;
    position: relative;
    background: #f7f7f7;
  }
  .classification {
    text-align: left;
    color: #ed2947;
    margin-left: 200px;
  }
  .detail-title {
    font-weight: bold;
    color: black;
    text-align: left;
    margin: 10px;
    margin-left: 200px;
    padding: 0;
  }
  .publicDate {
    color: #28315f;
    position: absolute;
    right: 200px;
    top: 50px;
  }
  .bigImg {
    width: 908px;
    height: 608px;
    border: 4px solid #ec2127;
    margin: 10px auto 40px;
  }
  .newContent {
    color: black;
  }
  .detail-img-title {
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    color: black;
    margin: 40px 0 10px 0px;
  }
  .detail-img-desc {
    text-align: left;
    margin: 0 0 10px 0px;
  }
  .detail-text {
    color: black;
    margin: 40px 0 0px 0;
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
