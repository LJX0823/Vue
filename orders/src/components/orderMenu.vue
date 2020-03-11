  <template>
  <div>
    <div class="block">
      <span class="demonstration">指定日期</span>
      <el-date-picker v-model="date" type="date" placeholder="选择日期" :editable="editable"></el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="small" round @click="datePick">搜索</el-button>
      <el-button type="primary" icon="el-icon-search" size="small" round @click="showAll">ALL</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="time" label="时间" width="180"></el-table-column>
      <el-table-column prop="amount" label="金额" width="180"></el-table-column>
      <el-table-column prop="orderName" label="订单名"></el-table-column>
    </el-table>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      tableData: [],
      date: "",
      editable: false
    };
  },
  created() {
    this.$axios.get("/api/showOrders").then(res => {
      this.tableData = res.data;
    });
  },
  methods: {
    datePick() {
      debugger;
      if (this.date != "" && this.date != null) {
        let year = this.date.getFullYear();
        let month = this.date.getMonth() + 1;
        let day = this.date.getDate();
        let date = year + "-" + month + "-" + day;
        this.$axios.post("/api/lookup", { date: date }).then(res => {
          this.tableData = res.data;
        });
      } else {
        this.$axios.get("/api/showOrders").then(res => {
          this.tableData = res.data;
        });
      }
    },
    showAll() {
      this.date='',
      this.$axios.get("/api/showOrders").then(res => {
        this.tableData = res.data;
      });
    }
  }
};
</script>