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
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
        </FormItem>
         <FormItem label="规则">
            <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
        </Upload>
          <Input v-model=" formItem.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
         </FormItem>
        <FormItem>
            <Button type="primary">Submit</Button>
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
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    text: ''
                }
            }
        }
}
</script>

