var mongoose =require('mongoose');
var db=mongoose.connect("mongodb://localhost:27017/zf");
db.connection.on("error",function(error){
    console.log("数据库连接失败",+error);
})
db.connection.on("open",function(){
    console.log("数据库连接成功");
})
var PersonSchema = new mongoose.Schema({
    name : { type:String },
    home : { type:String },
    age  : { type:Number, default:0 },
    time : { type:Date, default:Date.now },
    email: { type:String,default:''}
});
var PersonModel = db.model("charge", PersonSchema);
var personEntity = new PersonModel({
    name : "zf",
    age  : 6,
    email: "zf@qq.com",
    home:'beijing'
});
personEntity.save(function(error,doc){
    if(error){
        console.log("error :" + error);
    }else{
        console.log(doc);
    }
});