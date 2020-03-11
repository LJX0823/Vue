<template>
  <div class="box">
    <el-alert :title="success" type="success" show-icon v-if="success!=''"></el-alert>
    <el-alert :title="error" type="error" show-icon v-if="error!=''"></el-alert>
    <h1>自定义您的登录密码</h1>
    <label for>输入新的密码</label>
    <el-input
      type="text"
      placeholder="请输入内容"
      v-model="psw"
      maxlength="10"
      show-word-limit
      show-password
    ></el-input>
    <label for>确认新的密码</label>
    <el-input
      type="text"
      placeholder="请输入内容"
      v-model="confirmPsw"
      maxlength="10"
      show-word-limit
      show-password
    ></el-input>
    <el-button type="success" round class="btn" @click="modifyPsw">确认修改</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      psw: "",
      confirmPsw: "",
      error: "",
      success:'',
    };
  },
  methods: {
    modifyPsw() {
      if (this.psw === "") {
        this.error='密码不能为空'
        return;
      }
      if (this.confirmPsw === "" ) {
        this.error='请确认新密码'
        return;
     }
      if(this.psw!==this.confirmPsw){
          this.error='前后密码不一致'
      }
     let data={
         password:this.psw,
     }
     this.$axios.post('/api/modifyPsw',data).then(res=>{
         debugger
         if(res){
             this.success='修改成功即将跳转回登录页';
             setTimeout(() => {
                this.$router.push({
                    path:'/Home/Login'
                }) 
             }, 3000);
         }
     })
    }
  }
};
</script>
<style scoped>
.box {
  width: 400px;
  position: absolute;
  left: 50%;
  margin-left: -200px;
  margin-top: 200px;
}
.btn {
  margin-top: 20px;
}

</style>