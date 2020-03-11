<template>
    <div>
        <img src="..\..\static\img\thank.jpg" alt="">
        <h2>感谢您的点餐，请随意选座等待享用</h2>
        <el-button type="success" round @click="goWelcome">完成</el-button>
    </div>
</template>
<script>
export default {
    data(){

    },
    methods:{
        goWelcome(){
            this.$router.push({path:'/'});
        }
    }
}
</script>