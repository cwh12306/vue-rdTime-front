<template>
  <div class="nav">
    <div class="logo"></div>
    <div class="nav-bar">
      <div class="items" @click="homeClick">
        <div class="for-position">
          <div class="icon icon1"><i class="fa-solid fa-house-user"></i></div>
          主页
        </div>
      </div>
      <div class="split split1"></div>
      <div ref="subjects" class="items" @click="subjectClick">
        <div class="for-position">
          <div class="icon icon3">
            <i class="fa-solid fa-window-restore"></i>
          </div>
          科目
        </div>
      </div>
      <SecondNav
        @nav-active="subjectActive"
        v-show="subjectIsShow"
        :echelon="subjectEchelon"
        :color="subjectColor"
        :content="subjectContent"
      />
      <div class="split split3"></div>
      <div class="items" @click="teacherClick">
        <div class="for-position">
          <div class="icon icon4">
            <i class="fa-solid fa-person-chalkboard"></i>
          </div>
          教师
        </div>
      </div>
      <div class="split split4"></div>
    </div>
  </div>
</template>

<script>
  import SecondNav from "$components/common/SecondNav.vue";

  export default {
    name: "Nav",
    components: { SecondNav },
    methods: {
      homeClick() {
        this.$router.replace("/");
      },
      subjectClick() {
        console.log(3);
      },
      teacherClick() {
        this.$router.push("/teacher");
      },
      gradeActive(flag) {
        this.gradeIsShow = flag;
      },
      subjectActive(flag) {
        this.subjectIsShow = flag;
      },
    },
    data() {
      return {
        gradeIsShow: false,
        subjectIsShow: false,
        subjectContent: [
          { title: "外语", id: "/english" },
          { title: "书法", id: "/handwriting" },
          { title: "历史", id: "/history" },
          { title: "音乐", id: "/music" },
          { title: "科学", id: "/science" },
        ],
        subjectColor: "#B5D56A",
        subjectEchelon: 2,
      };
    },
    mounted() {
      const subjects = this.$refs.subjects;
      subjects.onmouseenter = () => {
        this.subjectIsShow = true;
      };
      subjects.onmouseleave = () => {
        this.subjectIsShow = false;
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
    width: 300px;
    height: 114px;
    background-image: url(/img/logo.png);
    left: 16%;
    background-size: 100% 100%;
  }
  .nav-bar {
    position: absolute;
    right: 10%;
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
  .split4 {
    background: #84bed6;
  }
  .split5 {
    background: #ea77ad;
  }
  .items {
    position: relative;
    float: left;
    width: 120px;
    height: 114px;
    font-size: 14px;
    color: black;
    font-weight: bold;
  }
  .for-position {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
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
  .icon4 {
    background: #84bed6;
  }
  .icon5 {
    background: #ea77ad;
  }
</style>
