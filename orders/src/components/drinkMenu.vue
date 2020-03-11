<template>
  <div class="menu">
    <el-row :style="{ padding: '0px',width:'80%' }">
      <el-col class="card" v-for="(drink,index) in drinks" :key="index">
        <el-card>
          <img
            :src="drink.imgUrl"
            class="image"
          />
          <div style="padding: 14px;">
            <span>{{drink.name}}</span>
            <div class="bottom clearfix">
              <time class="blance">￥{{drink.price}}</time>
              <input type="hidden" :value="drink.id" name="id">
              <el-button type="text" class="button">
                <i class="el-icon-shopping-cart-2" @click="addOne(drink)"></i>
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
  height: 110px;
}
.menu {
  position: absolute;
  left: 15%;
  width: 80%;
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
  props:['chosenNums'],
  data () {
    return {
      chosenNum: this.chosenNums,
      drinks:[],

    }
  },
  created:function(){
      this.$axios.get('/api/showDrink').then(res=>{
        debugger
        this.drinks=res.data;
      })  
  },
  methods: {
    addOne: function (e) {
      debugger
      this.chosenNum = this.chosenNum + 1
      this.$emit('chosenNums', this.chosenNum)
      this.$emit('chosenOne',e);
    }
  }
}
</script>