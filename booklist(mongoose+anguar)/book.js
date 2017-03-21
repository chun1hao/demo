var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise
var booklist = require("./models/booklist");
//这里配置需要存入的集合名字 在下面new
mongoose.connect('mongodb://localhost:27017/book'); 



var db = mongoose.connection;
//打开本机localhost的test数据库时，我们可以监测是否有异常
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("链接数据成功！")
});

var app = express();


app.get('/index',function(req,res){
    res.render('index');
})
app.use(express.static("static")) 
app.set('views','./views') //告诉express 我们的 模板放在那里了
app.engine(".html",ejs.__express);
app.set("view engine","html") //告诉把模板的后缀改成htm

//处理post请求的中间件（插件）
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//加载初始页面
app.get('/frist',function(req,res){
	var body = req.body;
	booklist.find({},function(err,booklist){
		if (err) return console.error(err);
	   	res.json({booklist:booklist});
	})
})
//增加新数据
app.post('/list',function(req,res){
	var body = req.body;
	var lis = new booklist({
		name:body.name,
		author:body.author,
		price:body.price
	})
    lis.save(function(err,doc){
		if(err) return
		res.json({'msg':'添加成功',code:0})
	})
})
//删除
app.post('/del',function(req,res){
	var body=req.body
	booklist.remove(body,function(err,doc){
		if(err) return 
		res.json({'msg':'删除成功',code:0})
	})
	
})
//修改
app.post('/update',function(req,res){
	var body = req.body;

	booklist.update(body[0],body[1],function(err){
		if(err) return
	})
	// console.log(body[1])
})
app.listen(8090,function(){
	console.log("启动成功")
})