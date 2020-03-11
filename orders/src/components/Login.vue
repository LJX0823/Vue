<template>
  <div class="login-box">
    <el-alert :title="error" type="error" show-icon v-if="error!=''"></el-alert>
    <label for>帐号</label>
    <el-input placeholder="请输入内容" v-model="username"></el-input>
    <label for>密码</label>
    <el-input placeholder="请输入内容" v-model="password" show-password></el-input>
    <el-button type="primary" round class="btn" @click="login">登录</el-button>
    <el-button type="danger" @click="open" round>重置密码</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password
      };
      this.$axios.post("/api/login", data).then(
        res => {
          if (res.data.status === "0000") {
            this.$router.push({
              path: "/User"
            });
          } else {
            this.error = "密码错误";
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    open() {
      this.$confirm("此操作将重置密码为初始密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
         this.$axios.get('/api/resetPsw').then(res=>{
             debugger
            if(res.data.status!='0000'){
            this.error='重置密码失败';
            return;
            }
         })
          this.$message({
            type: "success",
            message: "重置成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    }
  }
};
</script>
<style  scoped>
.login-box {
  width: 400px;
  position: absolute;
  left: 50%;
  margin-left: -200px;
}
.btn {
  margin-top: 10px;
}
</style>