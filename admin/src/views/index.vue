<style scoped>
  .form{
    width: 400px;
    margin:  0 auto;
    padding-top: 40px;
    
  }
</style>

<template>
<div>
    <div
      is=Header
    v-bind:name = "post.name"
    >
    </div>
    <div class="form">
    <Form :model="formItem" :label-width="60">
        <FormItem label="纬度">
            <Input v-model="formItem.latitude" placeholder="输入纬度(latitude)"></Input>
        </FormItem>
          <FormItem label="经度">
            <Input v-model="formItem.longitude" placeholder="输入经度(longitude)"></Input>
        </FormItem>
        <FormItem label="地址">
            <Input v-model="formItem.address" placeholder="输入地址(address)"></Input>
        </FormItem>
          <FormItem label="范围">
            <Input v-model="formItem.radius" placeholder="输入范围(radius)"></Input>
        </FormItem>
           <FormItem label="是否使用地址">
            <i-switch v-model="formItem.map" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
        </FormItem>
        <FormItem label= "签到时间">
            <TimePicker type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
        </FormItem>
        <FormItem label="海报">
            <Upload
            name="banner"
            :before-upload="Uploadbanner"
            action="http://localhost:8360/admin/setup">
            <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
        </Upload>
        <div v-if="formItem.banner !== null">Upload file: {{ formItem.banner.name }} </div>
    
          
        </FormItem>
         <FormItem label="规则">
            <Upload
                 <Upload
                    :before-upload="Uploadrulesimg"
                    action="http://localhost:8360/admin/setup">
                <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
            </Upload>
        <div v-if="formItem.rulesimg !== null">Upload file: {{ formItem.rulesimg.name }} </div>
    
            </Upload>
            <Input v-model=" formItem.rulestext" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" v-on:click ='postdata'>Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>
    </div>
    <div
      is = Fooder
    >
    </div>
</div> 
</template>
<script>
import Header from '@/components/common/header.vue'
import Fooder from '@/components/common/fooder'
export default {
  name:'index',
  components: {
    Header,
    Fooder
  },
  data () {
            return {
                post:{
                    name:'ok'
                },
                formItem: {
                    token:'',
                    latitude:'',
                    longitude:'',
                    address:'',
                    map:'',
                    date:'',
                    rulestext:'',
                    rulesimg:'',
                    banner:''
                }
            }
        },
    created:function () {
        const token = localStorage.getItem('token');
        const name  = localStorage.getItem('name');
        this.post.name  = name;
        if(!token){
            this.$router.push('/login')
        }else{
            this.formItem.token = token;
             console.log(this.formItem.token)
        }
    },
    methods:{
        Uploadbanner(file){
            this.formItem.banner = file;
            console.log(file)
            return false;
        },
        Uploadrulesimg(file){
            this.formItem.rulesimg = file;
            return false;
        },
        postdata:function(){
            const fordata = new FormData();
            fordata.append('token',this.formItem.token);
            fordata.append('latitude',this.formItem.latitude);
            fordata.append('longitude',this.formItem.longitude);
            fordata.append('address',this.formItem.address);
            fordata.append('map',this.formItem.map);
            fordata.append('date',this.formItem.date);
            fordata.append('rulestext',this.formItem.rulestext);
            fordata.append('rulesimg',this.formItem.rulesimg);
            fordata.append('banner',this.formItem.banner);
            console.log(fordata)
            this.$axios.post('/admin/setup',fordata).then((res)=>{
                console.log(res)
            })

        }
    }
}
</script>

