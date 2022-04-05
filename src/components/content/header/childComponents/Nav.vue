<template>
  <div class="nav">
    <div class="logo"></div>
    <div class="nav-bar">
      <div class="items">
        <div class="icon icon1"><i class="fa-solid fa-house-user"></i></div>
        Home
      </div>
      <div class="split split1"></div>
      <div ref="grades" class="items">
        <div class="icon icon2"><i class="fa-solid fa-graduation-cap"></i></div>
        Grades
      </div>
      <div class="split split2"></div>
      <div class="items">
        <div class="icon icon3"><i class="fa-solid fa-window-restore"></i></div>
        Subjects
      </div>
      <div class="split split3"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    components: {},
    data() {
      return {};
    },
    mounted() {
      const grades = this.$refs.grades;
      grades.onmouseenter = () => {
        console.log(11);
      };
      grades.onmouseleave = () => {
        console.log(112);
      };
    },
  };
</script>

<style scoped>
  .nav {
    position: relative;
    width: 100%;
    height: 114px;
    box-shadow: 1px 3px 3px gray;
    z-index: 1;
  }
  .logo {
    position: absolute;
    width: 188px;
    height: 114px;
    background-image: url(~$assets/img/logo.png);
    left: 360px;
  }
  .nav-bar {
    position: absolute;
    left: 1000px;
  }
  .split {
    margin-top: 75px;
    height: 14px;
    width: 2px;

    float: left;
  }
  .split1 {
    background: #f0c24b;
  }
  .split2 {
    background: #ea7066;
  }
  .split3 {
    background: #b5d56a;
  }
  .items {
    float: left;
    width: 100px;
    height: 94px;
    font-size: 14px;
    color: black;
    font-weight: bold;
    margin: 10px;
    padding: 20px;
  }
  .items:hover {
    cursor: pointer;
  }
  .icon {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    margin-bottom: 5px;
    color: white;
  }
  .icon1 {
    background: #f0c24b;
  }
  .icon2 {
    background: #ea7066;
  }
  .icon3 {
    background: #b5d56a;
  }
</style>
