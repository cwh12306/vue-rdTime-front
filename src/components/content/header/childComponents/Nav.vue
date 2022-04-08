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
      <div ref="grades" class="items" @click="gradeClick">
        <div class="for-position">
          <div class="icon icon2">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          年级
        </div>
      </div>
      <SecondNav
        @nav-active="gradeActive"
        v-show="gradeIsShow"
        :echelon="gradeEchelon"
        :color="gradesColor"
        :content="gradesContent"
      />
      <div class="split split2"></div>
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
      <div class="items" @click="moreClick">
        <div class="for-position">
          <div class="icon icon5">
            <i class="fa-solid fa-angles-right"></i>
          </div>
          更多
        </div>
      </div>
      <div class="split split5"></div>
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
        this.$router.push("/");
      },
      gradeClick() {
        this.$router.push("/grade");
      },
      subjectClick() {
        console.log(3);
      },
      teacherClick() {
        console.log(4);
      },
      moreClick() {
        console.log(5);
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
        subjectContent: ["外语", "书法", "历史", "音乐", "科学", "拼写"],
        subjectColor: "#B5D56A",
        gradesColor: "#EA7066",
        gradesContent: [
          "学龄前儿童",
          "幼儿园",
          "一年级",
          "二年级",
          "三年级",
          "四年级",
          "五年级",
          "六年级",
        ],
        gradeEchelon: 1,
        subjectEchelon: 2,
      };
    },
    mounted() {
      const grades = this.$refs.grades;
      const subjects = this.$refs.subjects;
      grades.onmouseenter = () => {
        this.gradeIsShow = true;
      };
      grades.onmouseleave = () => {
        this.gradeIsShow = false;
      };
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
