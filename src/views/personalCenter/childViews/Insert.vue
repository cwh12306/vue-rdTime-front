<template>
  <div class="insert">
    <div class="coverInfo">
      <h2 class="blockTitle">添加新的封面信息</h2>
      <p class="inputLabel">标题</p>
      <input @blur="validateTitle" type="text" v-model="title" /><span
        class="errorInfo"
        ><i
          v-show="insertArr[0].check === 'correct'"
          class="fa-solid fa-check cwh-correct"
        ></i>
        <i
          v-show="insertArr[0].check === 'error'"
          class="fa-solid fa-xmark cwh-error"
        ></i
      ></span>
      <p class="inputLabel">分类</p>
      <input
        @blur="validateClassification"
        type="text"
        v-model="classification"
      /><span class="errorInfo"
        ><i
          v-show="insertArr[1].check === 'correct'"
          class="fa-solid fa-check cwh-correct"
        ></i>
        <i
          v-show="insertArr[1].check === 'error'"
          class="fa-solid fa-xmark cwh-error"
        ></i
      ></span>
      <p class="inputLabel">发布日期</p>
      <input @blur="validatePublicDate" type="date" v-model="publicDate" /><span
        class="errorInfo"
        ><i
          v-show="insertArr[2].check === 'correct'"
          class="fa-solid fa-check cwh-correct"
        ></i>
        <i
          v-show="insertArr[2].check === 'error'"
          class="fa-solid fa-xmark cwh-error"
        ></i
      ></span>
      <p class="inputLabel">描述</p>
      <textarea
        @blur="validateContent"
        v-model="content"
        cols="20"
        rows="7"
        maxlength="200"
      ></textarea
      ><span class="errorInfo"
        ><i
          v-show="insertArr[3].check === 'correct'"
          class="fa-solid fa-check cwh-correct"
        ></i>
        <i
          v-show="insertArr[3].check === 'error'"
          class="fa-solid fa-xmark cwh-error"
        ></i
      ></span>
      <p class="inputLabel">封面图片</p>
      <input type="file" @change="changeFile" hidden id="uploadBigImg" />
      <label class="uploadBigImg" for="uploadBigImg"
        ><i class="fa-solid fa-plus"></i
      ></label>
      <img width="100" height="100" class="bigImg" ref="bigImg" src="" alt="" />
      <div @click="emptyContent" class="plate" v-show="content !== ''">
        <i class="fa-solid fa-xmark"></i>
      </div>
    </div>
    <div class="detailInfo">
      <AddableForm />
    </div>
    <button class="insertSubmitButton" @click="insertNew">新增</button>
  </div>
</template>

<script>
  import axios from "axios";
  import AddableForm from "$components/common/addableForm/AddableForm.vue";

  export default {
    name: "Insert",
    components: { AddableForm },
    data() {
      return {
        title: "",
        classification: "",
        publicDate: "",
        content: "",
        file: null,
        insertArr: [
          { id: "title", flag: false, check: "", msg: "标题不能为空" },
          { id: "classification", flag: false, check: "", msg: "分类不能为空" },
          { id: "publicDate", flag: false, check: "", msg: "发布日期不能为空" },
          { id: "content", flag: false, check: "", msg: "描述内容不能为空" },
          { id: "bigImg", flag: false, check: "", msg: "必须选择一张封面图片" },
        ],
      };
    },
    methods: {
      validateContent() {
        if (this.content === "") {
          this.insertArr[3].check = "error";
        } else {
          this.insertArr[3].flag = true;
          this.insertArr[3].check = "correct";
        }
      },
      validateTitle() {
        if (this.title === "") {
          this.insertArr[0].check = "error";
        } else {
          this.insertArr[0].flag = true;
          this.insertArr[0].check = "correct";
        }
      },
      validateClassification() {
        if (this.classification === "") {
          this.insertArr[1].check = "error";
        } else {
          this.insertArr[1].flag = true;
          this.insertArr[1].check = "correct";
        }
      },
      validatePublicDate() {
        if (this.publicDate === "") {
          this.insertArr[2].check = "error";
        } else {
          this.insertArr[2].flag = true;
          this.insertArr[2].check = "correct";
        }
      },
      uploadImg() {
        //上传图片通常要将文件参数放在FormDate对象中
        //创建FormDate实例
        let formData = new FormData();
        formData.append("files", this.file);
        //发送到服务器 等到点击提交按钮再发送给服务器
        axios
          .post("http://localhost:8088/tb/uploadBigImg", formData)
          .then((res) => {
            console.log(res);
          });
      },
      changeFile(e) {
        console.log(e.target.files[0]);
        this.file = e.target.files[0];
        if (this.file) {
          //上传图片之前先回显图片
          const bigImg = this.$refs.bigImg;
          const reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = (ev) => {
            bigImg.src = ev.target.result;
          };
          this.insertArr[4].flag = true;
        }
        //上传图片
        //this.uploadImg();
      },
      emptyContent() {
        this.content = "";
        this.insertArr[3].check = "error";
        this.insertArr[3].flag = false;
      },
      //插入新数据
      insertNew() {
        const errArr = [];
        this.insertArr.forEach((err) => {
          if (!err.flag) {
            errArr.push(err.msg);
          }
        });
        if (errArr.length === 0) {
          //没有错误，可以提交
          console.log(
            this.title,
            this.classification,
            this.publicDate,
            this.content
          );
          this.$toast.show(true, "提交成功");
        } else {
          //表单验证不通过
          const errorMsg = errArr.shift();
          this.$toast.show(false, errorMsg);
        }
      },
    },
  };
</script>

<style scoped>
  .coverInfo {
    position: relative;
    border: 1px solid #d6d7d8;
    padding: 20px;
    margin: 0px 0 10px 0px;
  }
  .blockTitle {
    margin-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 16px;
    font-weight: 100;
    color: #706862;
  }
  .coverInfo .plate {
    position: absolute;
    bottom: 158px;
    z-index: 100;
    left: 198px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    line-height: 16px;
    text-align: center;
    background: #d6d6da;
    font-size: 12px;
    cursor: pointer;
    color: white;
  }
  .coverInfo .plate:hover {
    background: #909096;
  }
  .coverInfo textarea {
    resize: none;
    border-left: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    box-shadow: inset 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.05);
    transition: 0.5s;
    padding: 10px;
  }
  .coverInfo textarea:focus {
    outline: none;
  }
  .coverInfo .inputLabel {
    color: #a0a09d;
    margin: 5px 0;
    font-size: 14px;
  }
  .coverInfo input {
    width: 140px;
    height: 26px;
    padding: 5px;
    border-left: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    box-shadow: inset 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.05);
    transition: 0.5s;
  }
  .coverInfo input:focus {
    outline: none;
  }
  .uploadBigImg {
    display: block;
    width: 100px;
    height: 100px;
    cursor: pointer;
    border: 4px dashed #59aaec;
    color: #59aaec;
    text-align: center;
    line-height: 100px;
    font-size: 50px;
  }
  .uploadBigImg:hover {
    border: 4px dashed #2a80c7;
    color: #2982ca;
  }
  .bigImg {
    position: absolute;
    bottom: 20px;
    left: 130px;
  }
  .errorInfo {
    margin-left: 10px;
  }
  .cwh-error {
    color: white;
    background: #ff4d4f;
    width: 18px;
    font-size: 12px;
    height: 18px;
    border-radius: 50%;
    line-height: 18px;
    text-align: center;
  }
  .cwh-correct {
    color: white;
    background: #52c41a;
    width: 18px;
    font-size: 12px;

    height: 18px;
    border-radius: 50%;
    line-height: 18px;
    text-align: center;
  }
</style>
