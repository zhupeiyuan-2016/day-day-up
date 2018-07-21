<style scoped>
.box {
    width: 250px;
    height: 28rem;
    float: left;
    margin: 10px;
}
#root{
    width: 560px;
    height: 30rem;
    box-shadow: 0 4px 20px rgba(0,0,0,.15);
    font-size: 16px;
}
.left {
    background: url(https://m.dev.daimatu.cn/static/img/box-left.1a188d9.png);
    background-size: cover;
}
.right {
  background-color:white;
}
.input-group{
    display: block;
    border-radius: 30px;
    margin: 20px 10px;
}
.icon{
    display: inline;
    text-align: center;
    font-size: 20px;
    padding: 2px;
}
.title{
    padding-top: 90px;
}
</style>

<template>
    <div id="root">
        <div  class="left box">
            <div style="position:relative;top:100px; text-align: center;">
                <img src="http://ouvyoji2r.bkt.clouddn.com/%E6%88%91%E5%BE%AE%E4%BF%A1%E6%94%B6%E6%AC%BE%E4%BA%8C%E7%BB%B4%E7%A0%81.png" style="width:150px;">
                <h4>微信扫一扫，即刻登陆</h4> 
            </div>
        </div>
        <div  class="right box">
            <div class="title">
                <h1>登录</h1>
            </div>
            <div class="input-group">
                <span class="icon">
                    <Icon type="android-person"  color=" #03a9f4" ></Icon>
                </span>
                <Input v-model="name" placeholder="Enter something..." clearable style="width: 200px"></Input>
            </div>
            <div class="input-group">
                <span class="icon">
                    <Icon type="locked" color=" #03a9f4" ></Icon>
                </span>
                <Input v-model="password" placeholder="Enter something..." clearable style="width: 200px"></Input>
            </div>
            <div class="input-group">
                <Radio v-model="remember" >
                    <span v-on:click="rememberStatus">记住密码</span>
                </Radio>
            </div>
            <Button type="success" long style="background:#03A9F4">登录</Button>
        </div>
    </div>
</template>
<script>
export default {
    name:"sfs",
    data:function(){
        return {
            name:'',
            password:'',
            remember:''
        }
    },
    methods:{
        rememberStatus: function () {
        this.remember = this.remember?false:true;
    }
    }
}
</script>
