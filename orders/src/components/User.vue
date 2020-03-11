<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1" @click="showOrderMenu">订单查看</el-menu-item>
      <el-menu-item index="2" @click="showModifyMenu">管理菜单</el-menu-item>
      <el-menu-item index="3" @click="showPswMenu">修改密码</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>
<script>
export default {
    methods: {
    showOrderMenu: function () {
      this.$router.push({path: '/User/orderMenu'})
    },
    showModifyMenu: function () {
      this.$router.push({path: '/User/manageMenu'})
    },
    showPswMenu: function () {
      this.$router.push({path: '/User/modifyPsw'})
    },
    }
}
</script>