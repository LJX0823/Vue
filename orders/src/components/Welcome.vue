<template>
  <div class="row">
    <div id="home" class="col-sm-12 text-center">
      <div class="background">
        <h1>欢迎大家品尝!</h1>
        <h2>这里有你非常喜欢的各色食物饮品!</h2>
        <el-button type="success" round @click="goToMenu()" class="btn">开始点餐</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToMenu () {
      // 跳转到上一次浏览的页面
      // this.$router.go(-1)

      // 指定跳转的地址
      // this.$router.replace('/menu')

      // 指定跳转路由的名字下
      // this.$router.replace({name:'menuLink'})
      // 通过push进行跳转
      // this.$router.push('/menu')
      this.$router.push({ path: '/Home' })
    }
  }
}
</script>

<style>
#home {
  background: url("../../static/img/pizza.jpg") no-repeat;
  padding: 10%;
  background-position-x: 50%;
}

h1,
h2 {
  margin: 6%;
}

.background {
  background: #eee;
  opacity: 0.9;
  margin: 0 auto;
  padding: 20px 0;
}

</style>
