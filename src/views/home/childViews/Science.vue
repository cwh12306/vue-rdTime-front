<template>
  <div class="science">
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
    name: "Science",
    data() {
      return {
        imgindex: "0", //控制变量，默认显示第一张
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
    width: 50%;
    margin: auto;
  }
  .img {
    float: left;
  }
  .trans {
    transition: all 0.5s;
  }
  .view {
    width: 960px;
    height: 720px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    position: relative;
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
