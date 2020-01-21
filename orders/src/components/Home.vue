<template>
  <div :style="{height:'100vh'}">
    <Header></Header>
    <Aside></Aside>
    <router-view @chosenNums="changeShopCar" />
    <div class="shopcar">
      <el-badge :value="chosenNums" class="item">
        <img class="pic" v-if="chosenNums>0" src="..\..\static\img\shopcar.png" @click="drawer = true"/>
        <img class="pic" v-else src="..\..\static\img\shopempty.png" @click="drawer = true" />
      </el-badge>
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        <span>我来啦!</span>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import Header from './common/Header.vue'
import Aside from './common/Aside.vue'
export default {
  components: {
    Header,
    Aside
  },
  data () {
    return {
      chosenNums: '',
      drawer: false
    }
  },
  methods: {
    changeShopCar (data) {
      this.chosenNums = data
    }
  }
}
</script>
<style scoped>
.shopcar {
  position: absolute;
  top: 420px;
  right: 80px;
  cursor: pointer;
}
.pic {
  width: 100px;
  height: 100px;
}
</style>
