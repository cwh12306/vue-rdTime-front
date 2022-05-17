<template>
  <div class="music">
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
    name: "Music",
    data() {
      return {
        imgindex: "0", //控制变量，默认显示第一张
        imagesUrl: [
          "img/music/1.png",
          "img/music/2.png",
          "img/music/3.png",
          "img/music/4.png",
          "img/music/5.png",
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
