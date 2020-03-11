const models = require('./db');
const express = require('express');
const multer = require('multer')
const router = express.Router();//这里用到了express的路由级中间件
// var sd = require('silly-datetime')

//注册账号的接口
//  /api为代理的服务
// router.post('/api/user/register', (req, res) => {
//     //这里的req.body 其实使用了body-parser中间件 用来对前端发送来的数据进行解析
//     //查询数据库中name= req.body.name 的数据
//     models.Login.find({ username: req.body.username }, (err, data) => {
//         if (err) {
//             res.send({ 'status': 1002, 'message': '查询失败', 'data': err });
       

        
//         } 
//         else if(req.body.username==''||req.body.password==''){
//             res.send({'message':'不可为空'});

//         }
//         else {
//             console.log('查询成功' + data)
//             //data为返回的数据库中的有相同name的集合
//             if (data.length > 0) {
//                 res.send({ 'status': 1001, 'message': '该用户名已经注册！' });
//             } else {
//                 let newName = new models.Login({
//                     username: req.body.username,
//                     password: req.body.password
//                 });
//                 //newName.save 往数据库中插入数据
//                 newName.save((err, data) => {
//                     if (err) {
//                         res.send({ 'status': 1002, 'message': '注册失败！', 'data': err });
//                     } else {
//                         res.send({ 'status': 1000, 'message': '注册成功!' });
//                     }
//                 });
//             }
//         }
//     })
// })
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, __dirname + '/../../orders/static/img')
    },
   // 文件重命名
    filename   : (req, file, cb) => {
        console.log(file)
        cb(null,file.originalname)
    }
});
const upload = multer({storage:storage})
router.post('/api/upload',upload.single('file'), async (req, res) => {
  const file = req.file;
  console.log(file)
  file.url = `http://localhost:3000/uploads/${file.filename}`
  res.send(file)
})
router.post('/api/login', (req, res) => {
    models.Login.find({ username: req.body.username, password: req.body.password  }, (err, data) => {
        if (err) {
            // res.send(err);
            res.send({ 'status': '9999', 'message': '查询数据库失败!', 'data': err });
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({ 'status': '0000', 'message': '登录成功!' });
            }else{
                res.send({'status': '3001','message':'密码错误'})
            } 
        }
    })
})

router.post('/api/createOrder', (req, res) => {
    let newArticle = new models.Order({
        orderName: req.body.orderName,
        amount: req.body.amount,
        time: req.body.time,
        date: req.body.date
    });
    newArticle.save((err, data) => {
        if (err) {
            res.send({ 'status': '9999', 'message': '添加失败！', 'data': err });
        } else {
            res.send({ 'status': '0000', 'message': '添加成功!' });
        }
    });
})
router.post('/api/createNew', (req, res) => {
    let newFood = new models.Food({
     name:req.body.name,
     id:req.body.id,
     price:req.body.price,
     imgUrl:req.body.imgUrl,
     isDrink:req.body.isDrink,
    });
    newFood.save((err, data) => {
        if (err) {
            res.send({ 'status': '9999', 'message': '添加失败！', 'data': err });
        } else {
            res.send({ 'status': '0000', 'message': '添加成功!' });
        }
    });
})
router.get("/api/showFood", (req, res) => {
    models.Food.find({ isDrink: '0' }, (err, data) => {
        console.log(data)
        res.send(data)
        if(err){
            console.log(err) //控制台输出错误
        }
    });
})
router.get("/api/showDrink", (req, res) => {
    models.Food.find({ isDrink: '1' }, (err, data) => {
        console.log(data)
        res.send(data)
        if(err){
            console.log(err)
        }
    });
})
router.get("/api/showMenu", (req, res) => {
    models.Food.find({}, (err, data) => {
        console.log(data)
        res.send(data)
        if(err){
            console.log(err)
        }
    });
})
router.get("/api/showOrders", (req, res) => {
    models.Order.find({}, (err, data) => {
        console.log(data)
        res.send(data)
        if(err){
            res.send({status:'9999'})
        }
    });

})
router.post("/api/lookup", (req, res) => {
    models.Order.find({date:req.body.date}, (err, data) => {
        console.log(data)
        res.send(data)
        if(err){
            res.send({status:'9999'})
        }
    });

})
router.post("/api/del",(req,res)=>{
    models.Food.remove({id:req.body.id},(err,data)=>{
        console.log(data);
        res.send({status:'0000'});
        if(err)
        res.send({status:'9999'})
    })
})
router.post("/api/modifyPsw",(req,res)=>{
    console.log(req.body.password)
    models.Login.update({username:'admin'},{password:req.body.password},(err,data)=>{
        console.log(data);
        res.send({status:'0000'});
    })
})
router.get("/api/resetPsw",(req,res)=>{
    
    
    models.Login.find({username:'admin'},(err,data)=>{
        models.Login.update({username:'admin'},{password:data[0].orginpsw},(err,data)=>{
            if(err){
                console.log(err)
            }else{
            res.send({data:data,status:'0000'});
            }
        })
    })
})
router.post("/api/modifyMenu",(req,res)=>{
    
    models.Food.update({id:req.body.id},{name:req.body.name,isDrink:req.body.isDrink,price:req.body.price,imgUrl:req.body.imgUrl},(err,data)=>{
        console.log(data);
        res.send({status:'0000'});
        if(err){
            res.send({status:'9999'})
            console.log(err)
        }
    })
})
module.exports = router; 
