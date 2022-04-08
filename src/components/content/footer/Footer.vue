<template>
  <div class="footer" ref="footer">
    <div class="divider"></div>
    <div class="footer-bg">
      <div class="offers">
        <div class="title">TLSBooks Offers</div>
        <ul class="offers-content">
          <li>
            <i class="fa-solid fa-angles-right"></i> thousands of print based
            worksheets
          </li>
          <li>
            <i class="fa-solid fa-angles-right"></i> hundreds of fun coloring
            pages
          </li>
          <li>
            <i class="fa-solid fa-angles-right"></i> contributors offering
            worksheets,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;activities,and coloring pages
          </li>
          <li>
            <i class="fa-solid fa-angles-right"></i> easy access with no
            membership<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requirements
          </li>
          <li>
            <i class="fa-solid fa-angles-right"></i> over 500 CCSS aligned
            worksheets
          </li>
          <li>
            <i class="fa-solid fa-angles-right"></i> longevity; online since
            2000
          </li>
        </ul>
      </div>
      <div class="informations">
        <div class="informations-title">Site Information</div>
        <ul class="informations-content">
          <li><i class="fa-solid fa-angles-right"></i> About</li>
          <li><i class="fa-solid fa-angles-right"></i> Privacy</li>
          <li>
            <i class="fa-solid fa-angles-right"></i> Terms and Conditions of Use
          </li>
          <li><i class="fa-solid fa-angles-right"></i> Contact us</li>
        </ul>
      </div>
      <div class="about">
        <div class="about-title">About TLSBooks</div>
        <div class="about-content">
          TLSBooks is an educational website dedicated to<br />
          bringing you free worksheets and other materials. All<br />
          of the content on this website is free for individual or
          <br />classroom use. We believe that it should be fast and <br />easy
          to give your students the edge they need, and we<br />
          are dedicated to helping them learn the skills they<br />
          need to succeed — for free.
        </div>
      </div>
    </div>
    <div class="copyright">
      <div class="text">Copyright &copy 2000-2022 Publishing</div>
      <div class="icons">
        <div class="twitter">
          <i class="fa-brands fa-twitter"></i>
        </div>
        <div class="pinterest"><i class="fa-brands fa-pinterest-p"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        screenHeight: 0,
      };
    },
    mounted() {},
  };
</script>

<style scoped>
  .twitter {
    float: left;
    width: 30px;
    height: 30px;
    color: #fff;
    border-radius: 50%;
    background: #b5d56a;
    position: relative;
    margin-right: 20px;
  }
  .fa-brands {
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pinterest {
    float: left;
    width: 30px;
    height: 30px;
    color: #fff;
    border-radius: 50%;
    background: #84bed6;
    position: relative;
  }
  .footer {
    position: absolute;
    top: 2516px;
    width: 100%;
    height: 523px;
    background: black;
  }
  .title {
    position: absolute;
    top: 70px;
    color: white;
    left: 20%;
    font-size: 20px;
    font-weight: bold;
  }
  .offers-content {
    color: #eeeadf;
    position: absolute;
    top: 100px;
    left: 20%;
    list-style: none;
    font-size: 14px;
  }
  .informations-title {
    position: absolute;
    top: 70px;
    color: white;
    left: 43%;
    font-size: 20px;
    font-weight: bold;
  }
  .informations-content {
    color: #eeeadf;
    position: absolute;
    top: 100px;
    left: 43%;
    list-style: none;
    font-size: 14px;
  }
  .about-title {
    position: absolute;
    top: 70px;
    color: white;
    left: 64%;
    font-size: 20px;
    font-weight: bold;
  }
  .text {
    font-size: 14px;
    color: wheat;
    line-height: 70px;
    float: left;
    margin-left: 20%;
  }
  .icons {
    float: left;
    margin: 20px 0 0 45%;
  }
  .about-content {
    margin-top: 25px;
    color: #eeeadf;
    position: absolute;
    top: 100px;
    left: 64%;
    list-style: none;
    line-height: 30px;
  }
  li {
    margin-top: 30px;
  }
  i {
    font-size: 12px;
    margin-right: 10px;
  }
  .divider {
    height: 3px;
    width: 100%;
    background-image: repeating-linear-gradient(
      to right,
      #f0c24b 0px,
      #f0c24b 8.3%,
      #b5d56a 8.3%,
      #b5d56a 16.6%,
      #ea7066 16.6%,
      #ea7066 24.9%,
      #84bed6 24.9%,
      #84bed6 33.2%,
      #a597e7 33.2%,
      #a597e7 41.5%,
      #ea77ad 41.5%,
      #ea77ad 50%
    );
  }
  .footer-bg {
    height: 450px;
    width: 100%;
    background: url(~$assets/img/footer-bg.png);
  }
  .copyright {
    width: 100%;
    height: 70px;
    background: #041319;
  }
</style>
