<template>
  <Layout >
    <Footer>
      <center>
        <span>前台首页|关于我们</span> 
        <p>{{beian}}</p>       
      </center>
    </Footer>
  </Layout>
</template>

<script>
export default {
    name:'Fooder',
    data:function(){
       return{
         beian:'Copyright © 2018-2022 jiumi.cn Inc. All rights reserved. 渝ICP备xxxx1号-3'
       }
    }
}
</script>
