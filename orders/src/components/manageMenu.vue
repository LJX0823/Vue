<template>
  <div>
    <el-row :style="{ padding: '0px',width:'80%' }">
      <el-col class="card" v-for="(food,index) in Foods" :key="index">
        <el-card>
          <img :src="food.imgUrl" class="image" />
          <div style="padding: 14px;">
            <span>{{food.name}}</span>
            <div class="bottom clearfix">
              <time class="blance">￥{{food.price}}</time>
              <input type="hidden" :value="food.id" name="id" />
              <el-button type="text" class="button">
                <i class="el-icon-setting" @click="toModify(food)"></i>
                <i class="el-icon-delete" @click="del(food)"></i>
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-card style="height:228px;width:198px">
        <i class="el-icon-plus avatar-uploader-icon" @click="draw=true"></i>
      </el-card>
    </el-row>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" direction="ttb">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form label-width="100px" label-position="top" size="medium" :inline="isInline">
        <el-form-item label="名称">
          <el-input v-model="food.name"></el-input>
        </el-form-item>
        <el-form-item label="种类">
          <el-select v-model="food.isDrink" placeholder="请选择活动区域">
            <el-option label="餐品" value="0"></el-option>
            <el-option label="饮品" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="food.price"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="modifySummit">立即修改</el-button>
          <el-button @click="drawer=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer title="我是标题" :visible.sync="draw" :with-header="false" direction="btt">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form label-width="100px" label-position="top" size="medium" :inline="isInline">
        <el-form-item label="名称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="种类">
          <el-select v-model="isDrink" placeholder="请选择活动区域">
            <el-option label="餐品" value="0"></el-option>
            <el-option label="饮品" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="price"></el-input>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="id"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="toCreate">立即创建</el-button>
          <el-button @click="drawer=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<<script>
export default {
    data(){
        return {
            Foods:[],
            food:{},
            drawer:false,
            imageUrl:'',
            imgUrl:'',//用于存放更改图片的地址
            isInline:true,
            isDrink:'',
            name:'',
            price:'',
            id:'',
            draw:false
        }
    },
      created:function(){
      this.$axios.get('/api/showMenu').then(res=>{
        debugger
        this.Foods=res.data;
      })  
  },
      methods: {
      toModify(food){
         this.drawer=true;
         this.food=food;
         this.imageUrl=this.food.imgUrl;
      },
      modifySummit(){
        debugger
        let data={
          name:this.food.name,
          isDrink:this.food.isDrink,
          id:this.food.id,
          price:this.food.price,
          imgUrl:this.imgUrl || this.imageUrl,
        }
        this.$axios.post('/api/modifyMenu',data).then(res=>{
          if(res.data.status=='0000'){
            this.drawer=false;
            this.$message('修改成功');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
      },
      toCreate(){
        let data={
          name:this.name,
          price:this.price,
          id:this.id,
          isDrink:this.isDrink,
          imgUrl:this.imgUrl,
        }
        this.$axios.post('api/createNew',data).then(res=>{
                    if(res.data.status=='0000'){
            this.drawer=false;
            this.$message('添加成功');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
      },
      del(food){
      this.$confirm('此操作将永久删除该物品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
            id:food.id
          }
          this.$axios.post('/api/del',data).then(res=>{
            if(res.data.status=='0000'){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
           setTimeout(() => {
              window.location.reload()
            }, 2000);
            }else{
              alert('删除错误')
            }

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });   
        }) 
      },
      handleAvatarSuccess(res, file) {
        debugger
        this.imageUrl = URL.createObjectURL(file.raw);
        let path='../../'+res.path.slice(res.path.indexOf('static'))
        this.imgUrl=path.replace(/\\/g,"/");
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>
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
.el-icon-shopping-cart-2 {
  cursor: pointer;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>