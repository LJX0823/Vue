<template>
  <div>
    <img src="..\..\static\img\weixin.png" alt="微信图" class="image" />
    <img src="../../static/img/zfb.jpg" alt class="image" />
    <h1>总计：￥{{amount}}</h1>
    <div class="btn-box">
      <el-popover placement="top" width="160" >
        <p>想添加新东西or不想要了</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="quitPay">不想要了</el-button>
          <el-button type="primary" size="mini" @click="addNew">添加新东西</el-button>
        </div>
        <el-button slot="reference" type="danger" round>取消支付</el-button>
      </el-popover>
      <el-button type="success" round @click="createOrders">已完成支付</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props:['amount','shopCarList'],
  data() {
    return {
      zfbUrl: "../../static/img/zfb.jpg",
      orderName:'',
      date:'',
      time:'',
    };
  },
  methods: {
    createOrders(){
      console.log(this.shopCarList);
      for(var i=0;i<this.shopCarList.length;i++){
        var name=this.shopCarList[i].name+'X'+this.shopCarList[i].num;
        this.orderName+=name;
      }
      console.log(this.orderName);
      let d=new Date();
      let year=d.getFullYear()
      let month=d.getMonth()+1;
      let day=d.getDate();
      this.date=year+'-'+month+'-'+day;
      var hour=d.getHours();
      var minute=d.getMinutes();
      var second=d.getSeconds();
      if(minute<10){
        this.time=hour+':'+'0'+minute+':'+second; 
      }else{
        this.time=hour+':'+minute+':'+second;
      }
      let data={
        orderName:this.orderName,
        amount:this.amount,
        time:this.time,
        date:this.date
      }
      this.$axios.post('/api/createOrder',data).then(res=>{
        debugger
        if(res.data.status==='0000'){
          this.$emit('active', 3);
          this.$router.push({path:'Thank'})
        }else{
          alert(res.data.message)
        }
      })
    },
    quitPay(){
      this.$router.push({path: '/'})
    },
    addNew(){
      this.$router.push({path: '/Home/foodMenu'})
    }    
  },
};
</script>
<style  scoped>
.image {
  width: 400px;
  display: inline-block;
  height: 400px;
}
.btn-box {
  margin-top: 100px;
  margin-left: 15px;
}
</style>