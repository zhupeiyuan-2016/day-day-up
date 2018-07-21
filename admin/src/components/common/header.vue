<style scoped>
.layout {
  border: 1px solid#f5f7f9 ;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  z-index: 800;
  /* overflow: hidden; */
}
.title {
  color: white;
  font-size: 12px;
  float: left;

}
.title::after{
  clear: both;
}
.layout-nav {
  height: 100px;
  font-size: 18px;
  float: right;
  margin: 4px;
}
</style>

<template>
<div class="layout">
<Layout>
    <Header>
       <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="title">
            <h1>{{title}}</h1>
          </div>
          <div class="layout-nav">
              <Dropdown>
                <a href="javascript:void(0)">
                    {{name}}
                <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>设置</DropdownItem>
                    <DropdownItem>退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
          </div>
       </Menu>
    </Header>
  </Layout>
  </div>
</template>
<script>
export default {
  name:'MyHeader',
  data:function(){
    return{
      title:'九米后台管理系统',
      msg:'headerSFDS',
      name:'jiumi'
    }
  }
}
</script>

