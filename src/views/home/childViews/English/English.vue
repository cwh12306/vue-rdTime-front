<template>
  <div class="english">
    <div class="english-container">
      <div
        class="englishItem"
        v-for="(item, index) in englishList"
        :key="index"
        @click="forDetail(item.id)"
      >
        <span ref="numbers" class="number">{{ index + 1 }} </span>
        <span class="english-title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { getEnglish } from "$network/homeWelcome.js";
  import { addClass, removeClass } from "$common/utils/tools.js";
  export default {
    name: "English",
    data() {
      return {
        englishList: [],
      };
    },
    methods: {
      forDetail(id) {
        this.$router.push({
          path: "/englishDetail",
          query: {
            id,
          },
        });
      },
    },
    mounted() {
      getEnglish().then((res) => {
        console.log(res);
        this.englishList = res;
        this.$nextTick(() => {
          this.$refs.numbers.forEach((item, index) => {
            addClass(item, `diffColor${(index + 1) % 5}`);
          });
        });
      });
    },
  };
</script>

<style scoped>
  .english-container {
    width: 70%;
    margin: 20px auto 0;
    padding: 20px;
    height: 450px;
  }
  .englishItem {
    margin: 5px;
    margin-bottom: 25px;
    float: left;
    cursor: pointer;
    width: 500px;
  }
  .number {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    font-size: 22px;
  }
  .diffColor1 {
    background: #ffedcc;
    color: #fdaf06;
  }
  .diffColor2 {
    background: #dff4f6;
    color: #43cee2;
  }
  .diffColor3 {
    background: #f8deed;
    color: #cf509a;
  }
  .diffColor4 {
    background: #cff6e1;
    color: #2ecc75;
  }
  .diffColor0 {
    color: #e43e47;
    background: #fdd4d7;
  }
  .english-title {
    font-size: 24px;
    color: black;
    font-weight: bold;
    margin-left: 20px;
  }
  .english-title:hover {
    color: #4151b7;
  }
</style>
