<template>
  <div ref="secondNav" class="secondNav" :style="borderStyle">
    <div
      ref="content"
      class="second-items"
      v-for="(c, index) in content"
      :key="index"
    >
      <router-link :to="c.id">
        <div class="title">{{ c.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { addClass, removeClass } from "$common/utils/tools.js";
  export default {
    name: "SecondNav",
    components: {},
    data() {
      return {
        keepAlive: true,
      };
    },
    computed: {
      borderStyle() {
        return {
          borderTop: `4px solid ${this.color}`,
          top: `114px`,
          left: `${this.echelon * 66}px`,
        };
      },
    },
    mounted() {
      const secondNav = this.$refs.secondNav;
      const allContent = this.$refs.content;
      //给所有循环生成的二级菜单添加动画
      allContent.forEach((element) => {
        element.onmouseenter = () => {
          addClass(element, `activeItem${this.echelon}`);
        };
        element.onmouseleave = () => {
          removeClass(element, `activeItem${this.echelon}`);
        };
      });
      //监听鼠标移入二级菜单栏
      secondNav.onmouseenter = () => {
        this.secondNavEnter(true);
      };
      secondNav.onmouseleave = () => {
        this.secondNavEnter(false);
      };
    },
    methods: {
      //发送事件给父组件
      secondNavEnter(data) {
        this.$emit("nav-active", data);
      },
    },
    props: {
      color: {
        type: String,
        required: true,
      },
      content: {
        type: Array,
        required: true,
      },
      echelon: {
        type: Number,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .secondNav {
    position: absolute;
    padding: 10px;
    background: white;
    box-shadow: 0 0em 0em rgba(0, 0, 0, 0.1), 0 0 0 0px rgb(255, 255, 255),
      0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  }
  .second-items {
    width: 240px;
    height: 38px;
    line-height: 42px;
    background: white;
    border-radius: 4px;
    padding-left: 10px;
    transition: 0.5s;
    cursor: pointer;
  }
  .activeItem2 {
    color: white;
    padding-left: 20px;
    background: #b5d56a;
  }
</style>
