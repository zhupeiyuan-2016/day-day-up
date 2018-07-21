<style scoped>
.title {
  padding-top: 3rem;
}
h1 {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: white;
}
.title{
  background-color: #5cadff;
  height: 30vh;
}
.center{
  position: absolute;
  top: 18%;
  left:30%;
}
.fooder{
  position: absolute;
  bottom: 0%;
  height:70px;
  background-color: #f8f8f9;
  width: 100%;
}
</style>
<template>
  <div class="box" >
    <div class="title">
      <h1>{{name}}</h1>
    </div>
      <div
        is=loginBox
        class="center"
      >
      </div>
     <div
      is=fooder
      class="fooder"
     >
     </div>
      
  </div>
   
</template>
<script>
import loginBox from "@/components/login/loginBox.vue";
import fooder from "@/components/common/fooder.vue";
export default {
  name: "loginBackguound",
  components: {
    loginBox,
    fooder
  },
  data: function() {
    return {
      name:"九米CMS后台管理系统",
      msg: "背景图"
    };
  }
};
</script>

