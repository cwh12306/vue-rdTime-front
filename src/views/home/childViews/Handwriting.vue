<template>
  <div class="handwriting">
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
    name: "Handwriting",
    data() {
      return {
        imgindex: "0", //控制变量，默认显示第一张
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
    height: 540px;
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
