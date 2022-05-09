<template>
  <div class="delete">
    <div class="delete-container">
      <h2 class="delete-title">删除资源</h2>
      <div
        class="delete-list-item"
        v-for="(item, index) in mediaResource.list"
        :key="index"
        @click="delItem(item.id, index)"
        :class="{ activeItem: currentIndex === index }"
      >
        <span class="item-text">{{ index + 1 }}</span>
        <span class="item-text">{{ item.title }}</span>
        <span class="item-text">{{ item.classification }}</span>
        <span class="item-text">{{ item.publicDate }}</span>
      </div>
      <i class="fa-solid fa-angle-up cwh-up" @click="lastPage"></i>
      <i class="fa-solid fa-angle-down cwh-down" @click="nextPage"></i>
      <transition name="showIn">
        <div class="confirmBox" v-show="isShow">
          <div class="topBox">信息</div>
          <div class="contentBox">
            <p class="delInfo">确定要删除这条资源吗？</p>
            <i class="fa-solid fa-check cwh-correct" @click="realDel"></i>
            <i class="fa-solid fa-xmark cwh-error" @click="cancelDel"></i>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { getMediaResource } from "$network/homeWelcome.js";
  import { delMediaResource } from "$network/personalCenter.js";

  export default {
    name: "Delete",
    data() {
      return {
        mediaResource: {},

        //当前第几页
        pageNumber: 1,
        //一页可以显示多少数据,默认是4
        pageSize: 4,
        //一共多少页
        total: 0,
        isShow: false,
        currentIndex: null,
        currentId: null,
      };
    },
    methods: {
      realDel() {
        console.log(this.currentId, this.currentIndex);
        delMediaResource(this.currentId).then((res) => {
          if (res) {
            this.$toast.show(true, "删除资源成功");
            this.mediaResource.list.splice(this.currentIndex, 1);
            this.currentIndex = null;
            this.currentId = null;
          } else {
            this.$toast.show(false, "删除失败！");
          }
        });
        this.isShow = false;
      },
      cancelDel() {
        this.currentIndex = null;
        this.currentId = null;
        this.isShow = false;
      },
      delItem(id, index) {
        this.currentIndex = index;
        this.currentId = id;
        this.isShow = true;
      },
      lastPage() {
        if (this.pageNumber > 1) {
          this.pageNumber--;
        } else {
          return;
        }
        this.currentIndex = null;
        this.currentId = null;
        this.isShow = false;
        getMediaResource(this.pageSize, this.pageNumber).then((res) => {
          this.mediaResource = res;
        });
      },
      nextPage() {
        if (this.pageNumber < this.total) {
          this.pageNumber++;
        } else {
          return;
        }
        this.currentIndex = null;
        this.currentId = null;
        this.isShow = false;
        getMediaResource(this.pageSize, this.pageNumber).then((res) => {
          this.mediaResource = res;
        });
      },
    },
    mounted() {
      getMediaResource(this.pageSize, this.pageNumber).then((res) => {
        this.mediaResource = res;
        this.total = res.total;
      });
    },
  };
</script>

<style scoped>
  .delet-container {
    position: relative;
  }
  .cwh-up {
    font-size: 30px;
    color: #54a0ff;
    cursor: pointer;
    position: absolute;
    right: 5%;
    top: 22%;
  }
  .cwh-up:hover {
    color: #2e86de;
  }
  .cwh-down {
    font-size: 30px;
    color: #54a0ff;
    cursor: pointer;
    position: absolute;
    right: 5%;
    top: 28%;
  }
  .cwh-down:hover {
    color: #2e86de;
  }
  .delete-list-item {
    width: 80%;
    border-bottom: 1px solid #afafaf8f;
    cursor: pointer;
    transition: 0.5s;
    margin: auto;
    padding: 0 10px;
    margin-bottom: 10px;
    border-radius: 20px;
  }
  .delete-list-item:hover {
    transform: scale(1.2);
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
  }
  .item-text {
    font-size: 14px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
  .item-text:nth-of-type(1) {
    width: 9%;
  }
  .item-text:nth-of-type(2) {
    width: 39%;
  }
  .item-text:nth-of-type(3) {
    width: 29%;
  }
  .item-text:nth-of-type(4) {
    width: 23%;
    text-align: right;
  }
  .confirmBox {
    width: 200px;
    height: 270px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    position: absolute;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    left: 50%;
    transform: translate(-50%, -10%);
    top: 50%;
  }
  .confirmBox .topBox {
    width: 100%;
    height: 27px;
    padding-left: 10px;
    line-height: 27px;
    background: #0984e3;
    border-top-right-radius: 15px;
    font-weight: bold;
    color: white;
    font-size: 14px;
    border-top-left-radius: 15px;
  }
  .confirmBox .contentBox {
    height: 243px;
    width: 100%;
    line-height: 220px;
    text-align: center;
    position: relative;
  }
  .confirmBox .contentBox .cwh-correct {
    position: absolute;
    right: 20px;
    background: #52c41a;
    width: 20px;
    height: 20px;
    line-height: 20px;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    bottom: 5px;
  }
  .confirmBox .contentBox .cwh-error {
    cursor: pointer;
    position: absolute;
    left: 20px;
    bottom: 5px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    color: white;
    background: #ff4d4f;
    border-radius: 50%;
  }
  .activeItem {
    border: 0.125rem solid #e74c3c;
    box-shadow: 0 2px 2px -2px rgba(231, 76, 60, 0.5),
      0 2px 10px rgba(231, 76, 60, 0.5), 0 2px 5px 2px rgba(231, 76, 60, 0.5);
  }
  .activeItem:hover {
    border: 0.125rem solid #e74c3c;
    box-shadow: 0 2px 2px -2px rgba(231, 76, 60, 0.5),
      0 2px 10px rgba(231, 76, 60, 0.5), 0 2px 5px 2px rgba(231, 76, 60, 0.5);
  }
  .showIn-enter-active,
  .showIn-leave-active {
    transition: opacity 1s;
  }
  .showIn-enter,
  .showIn-leave-to {
    opacity: 0;
  }
  .delete-title {
    border-bottom: 1px solid #d6d7d8;
    margin-bottom: 40px;
    font-size: 16px;
    font-weight: 100;
    color: #706862;
  }
</style>
