<template>
  <div class="history">
    <div class="handwriting-container">
      <div class="view">
        <div :class="{ banner: true, trans: flag }">
          <img :src="imagesUrl[imgindex]" alt="" class="img" />
        </div>
        <button @click="prev" class="prev">
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <button @click="next" class="next">
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "History",
    data() {
      return {
        imgindex: "0", //控制变量，默认显示第一张
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
        flag: true,
      };
    },
    methods: {
      //下一张
      next() {
        if (this.imgindex < this.imagesUrl.length - 1) {
          this.imgindex++;
        }
      },
      //上一张
      prev() {
        if (this.imgindex > 0) {
          this.imgindex--;
        }
      },
    },
  };
</script>

<style scoped>
  .handwriting-container {
    padding: 20px;
    width: 70%;
    margin: auto;
  }
  .img {
    float: left;
  }
  .trans {
    transition: all 0.5s;
  }
  .view {
    width: 1080px;
    height: 810px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    position: relative;
    margin: auto;
  }
  .prev {
    position: absolute;
    top: 50%;
    left: -50px;
    transform: translateY(-50%);
    border: none;
    background: none;
    font-size: 80px;
    color: #4b4b4b;
    cursor: pointer;
  }
  .next:hover,
  .prev:hover {
    color: #3d3d3d;
  }
  .next {
    position: absolute;
    top: 50%;
    right: -50px;
    transform: translateY(-50%);
    border: none;
    background: none;
    font-size: 80px;
    color: #4b4b4b;
    cursor: pointer;
  }
</style>
