<template>
  <div class="teacher">
    <div class="teacher-container">
      <ul class="people">
        <li @click="showInfo" data-teacher-id="1"><canvas></canvas></li>
        <li @click="showInfo" data-teacher-id="2"><canvas></canvas></li>
        <li @click="showInfo" data-teacher-id="3"><canvas></canvas></li>
        <li @click="showInfo" data-teacher-id="4"><canvas></canvas></li>
        <li @click="showInfo" data-teacher-id="5"><canvas></canvas></li>
        <li @click="showInfo" data-teacher-id="6"><canvas></canvas></li>
        <li @click="showInfo" data-teacher-id="7"><canvas></canvas></li>
        <li @click="showInfo" data-teacher-id="8"><canvas></canvas></li>
      </ul>
    </div>
    <div class="teacherInfo" v-show="isShow">
      <span class="teacher-name">{{ teacherInfo.name }}</span
      ><br />
      <span class="teacher-age teacher-text">年龄：{{ teacherInfo.age }}</span
      ><br />
      <span class="teacher-major teacher-text"
        >专业：{{ teacherInfo.major }}</span
      ><br />
      <span class="teacher-educ teacher-text"
        >职称：{{ teacherInfo.educ }}</span
      >
    </div>
    <div v-show="isShow" class="teacherInfoTriangle"></div>
  </div>
</template>

<script>
  import { getTeacherById } from "$network/homeWelcome.js";
  import $ from "jquery";
  export default {
    name: "Teacher",
    data() {
      return {
        teacherInfo: {},
        isShow: false,
      };
    },
    methods: {
      showInfo(evt) {
        this.isShow = true;
        const $teacherInfo = $(".teacherInfo");
        console.log(evt);
        const $teacherInfoTriangle = $(".teacherInfoTriangle");
        $teacherInfo.css("top", evt.pageY - 68);
        $teacherInfo.css("left", evt.pageX + 28);
        $teacherInfoTriangle.css("top", evt.pageY - 35);
        $teacherInfoTriangle.css("left", evt.pageX - 30);
        getTeacherById(evt.path[1].dataset.teacherId).then((res) => {
          console.log(res);
          this.teacherInfo = res;
        });
      },
    },
    mounted() {
      const $people = $(" .people > li");
      const $peopleUl = $(".people");
      const $canvases = $("ul.people > li > canvas");
      //人物气泡效果，使用canvas绘制
      var bubbleTimer1;
      var bubbleTimer2;
      var startLeft;
      bubble();
      function bubble() {
        //初始化canvas宽高
        for (var i = 0; i < $canvases.length; i++) {
          $canvases[i].width = $($people[i]).width();
          $canvases[i].height = $($people[i]).height();
        }
        $people.mouseover(function () {
          var index = $(this).index();
          if ($canvases[index].getContext) {
            var ctx = $canvases[index].getContext("2d");

            $people.css("opacity", 0.3);
            $(this).css("opacity", 1);
            startLeft = this.offsetLeft;
            var arr = [];

            bubbleTimer1 = setInterval(function () {
              ctx.clearRect(
                0,
                0,
                $canvases[index].width,
                $canvases[index].height
              );
              for (var i = 0; i < arr.length; i++) {
                //让气泡做正弦曲线运动
                arr[i].deg += 7;
                arr[i].y = arr[i].deg * (Math.PI / 180) * arr[i].stepY;
                arr[i].x =
                  Math.sin(arr[i].deg * (Math.PI / 180)) * arr[i].stepX;
                //判断是否到达顶部 ，是 则删除气泡
                if (arr[i].y >= $canvases[index].height - 100) {
                  arr.splice(i, 1);
                }
              }
              //画圆
              for (var i = 0; i < arr.length; i++) {
                ctx.save();
                ctx.fillStyle =
                  "rgba(" +
                  arr[i].r +
                  "," +
                  arr[i].g +
                  "," +
                  arr[i].b +
                  "," +
                  1 +
                  ")";
                ctx.beginPath();
                ctx.arc(
                  arr[i].startX + arr[i].x,
                  arr[i].startY - arr[i].y,
                  arr[i].radius,
                  0,
                  2 * Math.PI
                );
                ctx.fill();
                ctx.restore();
              }
            }, 10);

            //每隔一段时间往数组中添加随机圆的信息
            bubbleTimer2 = setInterval(function () {
              var radius = Math.random() * 5 + 3;
              //每个气泡的起始位置
              var startX = Math.random() * $canvases[index].width;
              var startY = $canvases[index].height - radius - 50;

              var x = startX;
              var y = startY;
              //X轴Y轴的放大倍数
              var stepX = Math.random() * 40 + 20;
              var stepY = Math.random() * 25 + 10;
              var deg = Math.random() * 10;
              var r = Math.round(Math.random() * 255);
              var g = Math.round(Math.random() * 255);
              var b = Math.round(Math.random() * 255);
              arr.push({
                startX: startX,
                startY: startY,
                x: x,
                y: y,
                radius: radius,
                r: r,
                g: g,
                b: b,
                deg: deg,
                stepX: stepX,
                stepY: stepY,
              });
            }, 70);
            $people.mouseout(function () {
              $people.css("opacity", 1);
              clearInterval(bubbleTimer1);
              clearInterval(bubbleTimer2);
              ctx.clearRect(
                0,
                0,
                $canvases[index].width,
                $canvases[index].height
              );
            });
          }
        });
      }
    },
  };
</script>

<style scoped>
  .teacher-container {
    width: 70%;
    margin: auto;
    padding: 20px;
    position: relative;
    height: 450px;
  }
  .people {
    position: absolute;
    width: 944px;
    height: 448px;
    left: 50%;
    list-style: none;
    transform: translateX(-50%);
    z-index: 99;
  }
  .people > li {
    width: 118px;
    height: 100%;
    background: url(/img/team.png);
    float: left;
    cursor: pointer;
  }
  .people > li:nth-child(1) {
    background-position: 0 0;
  }
  .people > li:nth-child(2) {
    background-position: -118px 0;
  }
  .people > li:nth-child(3) {
    background-position: -236px 0;
  }
  .people > li:nth-child(4) {
    background-position: -354px 0;
  }
  .people > li:nth-child(5) {
    background-position: -472px 0;
  }
  .people > li:nth-child(6) {
    background-position: -590px 0;
  }
  .people > li:nth-child(7) {
    background-position: -708px 0;
  }
  .people > li:nth-child(8) {
    background-position: -826px 0;
  }
  .teacherInfo {
    position: absolute;
    padding: 20px;
    border-radius: 15px;
    background: #3498db;
    color: white;
    z-index: 100;
    font-size: 12px;
  }
  .teacher-name {
    font-size: 14px;
  }
  .teacher-text {
    display: inline-block;
    margin: 10px 0 0 0;
  }
  .teacherInfoTriangle {
    display: block;
    content: "";
    position: absolute;
    border: 30px solid transparent;
    border-right: 30px solid #3498db;
    z-index: 0;
  }
</style>
