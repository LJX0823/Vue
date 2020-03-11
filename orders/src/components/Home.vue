<template>
  <div :style="{height:'100vh'}  " class='home'>
    <Header :active='active'></Header>
    <Aside ></Aside>
    <router-view @chosenNums="changeShopCar" :chosenNums="chosenNums" :amount='amount' @chosenOne="intoShopCar" :shopCarList="shopCarList" @active="toEndStep" />
    <div class="shopcar">
      <el-badge :value="chosenNums!==0?chosenNums:''" class="item">
        <img
          class="pic"
          v-if="chosenNums>0"
          src="..\..\static\img\shopcar.png"
          @click="showShopCar"
        />
        <img class="pic" v-else src="..\..\static\img\shopempty.png" @click="showShopCar" />
      </el-badge>
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        <h1>您的清单</h1>
        <!-- <span>商品名称</span><span>价格</span> -->
        <div v-for="(food,index) in shopCarList" :key="index" class="list">
          <span>{{food.name}}</span>
          <span>X{{food.num}}</span>
          <span>单价：{{food.price}}</span>
          <i class="el-icon-delete" @click="deleteOne(index)"></i>
        </div>
        <div class="shopcarfoot">
          <span>总计：</span>
          <span>{{amount}}</span>
          <div v-if="this.shopCarList.length>0"><el-button type="success" round @click="toPay">立即支付</el-button></div>
        </div>
        
      </el-drawer>
    </div>
  </div>
</template>
<script>
import Header from "./common/Header.vue";
import Aside from "./common/Aside.vue";
export default {
  components: {
    Header,
    Aside
  },
  data() {
    return {
      chosenNums: 0,
      drawer: false,
      chosenOne: {},
      shopCarList: [],
      num: 1,
      isNew: true, //购物车品种是否为新增
      amount:0,//清单金额
      active:1,//进度条
    };
  },
  methods: {
    changeShopCar(data) {
      this.chosenNums = parseInt(data);
    },
    toEndStep(data){
      this.active=data;
    },
    intoShopCar(data) {   
      debugger;
      this.chosenOne = data;

      if (this.shopCarList.length > 0) {
        for (let i = 0; i < this.shopCarList.length; i++) {
          if (this.shopCarList[i].id === data.id) {
            this.shopCarList[i].num = this.shopCarList[i].num + 1;
            this.isNew = false;
            this.shopCarList[i].sum=parseInt(this.shopCarList[i].price)*parseInt(this.shopCarList[i].num) //多个同一物品的价格
          }else{
            if(this.shopCarList[i].num===1){
            this.shopCarList[i].sum=parseInt(this.shopCarList[i].price)
            }else{
            this.shopCarList[i].sum=parseInt(this.shopCarList[i].price)*parseInt(this.shopCarList[i].num)
            }
            }
        }
        if (this.isNew) {
          this.chosenOne.num = 1; //初始数量为1
          this.chosenOne.sum=this.chosenOne.price;
          this.shopCarList.push(this.chosenOne);
        }
        this.isNew=true;//初始化
      } else {
        this.chosenOne.num = 1; //初始数量为1
        this.chosenOne.sum=this.chosenOne.price;
        this.shopCarList.push(this.chosenOne);
        
      }
    },
    showShopCar(){
      this.drawer=true;
      this.amount=0//初始化
      for(let i=0;i<this.shopCarList.length;i++){
        debugger
        this.amount=parseInt(this.amount)+parseInt(this.shopCarList[i].sum);
      }
    },
    deleteOne(index){
      if(this.shopCarList[index].num>1)
      this.chosenNums=this.chosenNums-this.shopCarList[index].num;
      else
      this.chosenNums=this.chosenNums-1;
      this.shopCarList.splice(index,1);
      this.showShopCar();
    },
    toPay(){
      this.drawer=false;
      this.active=2;
      this.$router.push({path: '/Home/Pay'})

    }
  }
};
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
.shopcarfoot {
  position: fixed;
  bottom: 10%;
  width: 600px;
  font-size: 24px;
  
  
}
.shopcarfoot > span {
  text-align: center;
}
.list{
  font-size: 20px;
  display: flex;
  justify-content:space-around;
  line-height: 20px;
}
.list>span{
  text-align: left;
  width: 100px;
}
</style>
