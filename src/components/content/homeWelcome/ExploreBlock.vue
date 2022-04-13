<template>
  <div class="exploreBlock">
    <img @click="exploreDetail" class="img" :src="img" alt="" />
    <div class="content">
      <span @click="exploreDetail" class="classification">{{
        classification
      }}</span
      ><br /><br />
      <span @click="exploreDetail" class="title">{{ title }}</span
      ><br /><br />
      <span class="date">{{ publicDate }}</span>
      <p @click="exploreDetail" class="textContent">{{ content }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ExploreBlock",
    methods: {
      exploreDetail() {
        this.$router.push({
          path: "/explore",
          query: {
            id: this.id,
          },
        });
      },
    },
    props: {
      id: {
        type: Number,
      },
      content: {
        type: String,
      },
      title: {
        type: String,
      },
      publicDate: {
        type: String,
      },
      classification: {
        type: String,
      },
      img: {
        type: String,
      },
    },
  };
</script>

<style scoped>
  .exploreBlock {
    position: relative;
    width: 100%;
    height: 300px;
    margin-bottom: 50px;
  }
  .img {
    width: 450px;
    height: 300px;
  }
  .img:hover {
    cursor: pointer;
  }
  .content {
    position: absolute;
    left: 400px;
    top: 0;
    width: calc(100% - 450px);
    height: 300px;
    padding: 20px;
    background: #f2f3f5;
  }
  .classification {
    color: #ed2947;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .classification:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .title {
    color: #171c45;
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .title:hover {
    color: #ed2947;
    cursor: pointer;
  }
  .date {
    color: #a18080;
  }
  .textContent {
    color: black;
    margin-top: 20px;
    line-height: 30px;
  }
  .textContent:hover {
    color: #ee2e47;
    cursor: pointer;
  }
</style>
