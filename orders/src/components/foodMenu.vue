<template>
  <div class="menu">
    <el-row :style="{ padding: '0px',width:'90%' }">
      <el-col class="card" v-for="o in 10" :key="o">
        <el-card>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="blance">￥11</time>
              <el-button type="text" class="button">
                <i class="el-icon-shopping-cart-2" @click="addOne"></i>
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.blance {
  font-size: 13px;
  color: #999;
}
.image {
  width: 200px;
  display: block;
}
.menu {
  position: absolute;
  left: 15%;
}
.card {
  width: 200px;
  margin-right: 10px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  cursor: pointer;
}

.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-icon-shopping-cart-2{
  cursor: pointer;
}
</style>
<script>
export default {
  data () {
    return {
      chosenNum: 0
    }
  },
  methods: {
    addOne: function () {
      debugger
      this.chosenNum = this.chosenNum + 1
      this.$emit('chosenNums', this.chosenNum)
    }
  }
}
</script>
