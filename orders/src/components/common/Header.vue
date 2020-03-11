<template>
    <div>
<el-steps :active="active" align-center>
  <el-step title="步骤 1" description="选择你需要的餐饮"></el-step>
  <el-step title="步骤 2" description="支付"></el-step>
  <el-step title="步骤 3" description="等待享用"></el-step>
</el-steps>
<el-divider></el-divider>
    </div>
</template>
<script>
export default {
  props:['active']
}
</script>