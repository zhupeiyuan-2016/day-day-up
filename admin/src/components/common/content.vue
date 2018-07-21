<style scoped>

</style>

<template>
<div >
<Layout >
  <Content :style="{float:'right',padding: '24px', minHeight: '280px', background: '#fff'}">
           
    <slot></slot>    
  </Content>
</Layout>
 
</div>

</template>
<script>
export default {
  name:'MyContent',
  data:function () {
    return{
      content:'容器¹'
    }
  }
}
</script>

