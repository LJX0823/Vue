<style scoped>
.aside{
position: absolute;
left: 5%;

}
.el-menu-vertical-demo{
  height: 80vh;
}

</style>
<template>
  <div class="aside">
    <el-row class="tac">
      <el-col :span="30">
        <el-menu
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="1" @click="showFoodMenu">
            <i class="el-icon-fork-spoon"></i>
            <span slot="title">食品</span>
          </el-menu-item>
          <el-menu-item index="2" @click="showDrinkMenu" >
            <i class="el-icon-cold-drink"></i>
            <span slot="title">饮料</span>
          </el-menu-item>
          <el-menu-item index="3"  @click="showUserMenu">
            <i class="el-icon-menu"></i>
            <span slot="title">管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    showFoodMenu: function () {
      this.$router.push({path: '/Home/foodMenu'})
    },
    showUserMenu: function () {
      this.$router.push({path: '/Home/Login'})
    },
    showDrinkMenu: function () {
      this.$router.push({path: '/Home/drinkMenu'})
    },
    }
}
</script>
