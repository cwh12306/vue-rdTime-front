<template>
  <div class="toast" :class="{ appear: isShow }">
    <span
      ><i v-if="result" class="fa-solid fa-check cwh-icon cwh-check"></i
      ><i v-else class="fa-solid fa-xmark cwh-icon cwh-error"></i>
      {{ message }}</span
    >
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: "",
        isShow: false,
        result: false,
      };
    },
    methods: {
      show(result, message, duration = 1500) {
        this.isShow = true;
        this.message = message;
        this.result = result;

        setTimeout(() => {
          this.isShow = false;
        }, duration);
      },
    },
  };
</script>

<style scoped>
  .cwh-icon {
    color: white;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    line-height: 18px;
    text-align: center;
  }
  .cwh-check {
    background: #52c41a;
  }
  .cwh-error {
    background: #ff4d4f;
  }
  .toast {
    position: fixed;
    top: 4%;
    left: 50%;
    transform: translateX(-50%);
    color: black;
    font-size: 13px;
    background: white;
    padding: 10px 16px;
    border-radius: 2px;
    transition: 0.5s;
    visibility: hidden;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
  }
  .appear {
    visibility: visible;
    top: 10%;
  }
</style>
