<template>
  <div class="addbleForm">
    <div
      class="formContainer"
      v-for="(detail, index) in detailList"
      :key="index"
    >
      <div class="addDetail" @click="addDetail">+</div>
      <div class="delDetail" @click="delDetail(index)">-</div>
      <h2 class="detailTitle">添加新的细节信息{{ index + 1 }}</h2>
      <span class="inputLabel">图片标题</span>
      <input type="text" v-model="detail.imgTilte" /><br />
      <span class="inputLabel">图片描述</span>
      <input type="text" v-model="detail.imgDesc" /><br />
      <span class="inputLabel">请选择图片</span>
      <input type="file" @change="changeFile" hidden id="uploadDetailImg" />
      <label
        @click="saveIndex(index)"
        class="uploadDetailImg"
        for="uploadDetailImg"
        ><i class="fa-solid fa-plus"></i></label
      ><br />
      <img
        width="100"
        height="100"
        class="detailImg"
        ref="uploadDetailImg"
        src=""
        alt=""
      />
      <br />
      <span class="inputLabel">内容</span><br />
      <textarea
        name=""
        id=""
        cols="16"
        rows="6"
        v-model="detail.text"
      ></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddableForm",
    data() {
      return {
        detailList: [
          {
            text: "",
            imgFile: null,
            imgTilte: "",
            imgDesc: "",
          },
        ],
        imgIndex: 0,
      };
    },
    methods: {
      addDetail() {
        this.detailList.push({
          text: "",
          imgFile: null,
          imgTilte: "",
          imgDesc: "",
        });
      },
      delDetail(index) {
        console.log(index);
        if (this.detailList.length <= 1) {
          return;
        }
        this.detailList.splice(index, 1);
      },
      saveIndex(index) {
        this.imgIndex = index;
      },
      changeFile(evt) {
        this.detailList[this.imgIndex].imgFile = evt.target.files[0];
      },
    },
  };
</script>

<style scoped>
  .formContainer {
    border: 1px solid #d6d7d8;
    padding: 20px;
    position: relative;
  }
  .formContainer textarea {
    resize: none;
    border-left: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    box-shadow: inset 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.05);
    padding: 10px;
  }
  .formContainer textarea:focus {
    outline: none;
  }
  .formContainer .inputLabel {
    color: #a0a09d;
    margin: 5px 5px 0px 0px;
    font-size: 14px;
  }
  .formContainer input {
    width: 140px;
    height: 26px;
    padding: 5px;
    border-left: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    box-shadow: inset 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.05);
    margin: 10px 0;
  }
  .formContainer input:focus {
    outline: none;
  }
  .formContainer h2 {
    margin-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 16px;
    font-weight: 100;
    color: #706862;
  }
  .addDetail {
    width: 20px;
    height: 20px;
    border: 1px solid black;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  .delDetail {
    width: 20px;
    height: 20px;
    border: 1px solid black;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    position: absolute;
    right: 20px;
  }
  .uploadDetailImg {
    cursor: pointer;
  }
</style>
