var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');
var port = 80;


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
  //app.use(express.static(__dirname + '/public')); //注意顺序，为了能够用到404，要把这个提前。
  //app.use(app.router);
});


var layout = __dirname +'\\view\\layout';
var css = __dirname +'\\css';
var js = __dirname +'\\js';
var img = __dirname +'\\img';

console.log(layout);

var index = {
    "title": "首页 | 北京秦运恒信息技术有限公司",
    "motto": "原来购物可以如此简单和生动",
    "columns": [
        {
            "title": "最新产品",
            "desc": "使用iPad展示商品为顾客提供更加丰富的渠道来探索和喜爱您的产品。",
            "img": "/images/index/img1.png",
            "href": "/products/"
        },
        {
            "title": "解决方案",
            "desc": "我们会与您一起找到适合您的解决方案，让您的事业蒸蒸日上。",
            "img": "/images/index/img2.png",
            "href": "/solutions/"
        },
        {
            "title": "关于我们",
            "desc": "年轻而专业。梦想加实干。敏捷和执着。这就是我们，您一定会喜欢跟我们合作。",
            "img": "/images/index/img3.png",
            "href": "/company/"
        }
    ]
};

var oldconsole=console.log;
log=function(obj,error){
    if(process.platform!="win32"){
        var color=(error)?"33[1;31m":"33[1;32m";
        process.stdout.write(color);
        oldconsole(obj);
        process.stdout.write("33[0m");
    }else{
        oldconsole(obj);
    }
}
console.log=function(obj){
    log(obj,true);
}


// Read JSON files
//这里出现过一个非常恶心的bug，我们发现我们拿windows记事本产生的json文件node.js解析会有问题，于是去掉第一个字节。为了保证安全，文件也上来加了一个回车。
//由于我们是一上来只解析一次，所以我们采用了同步方式
//var info=JSON.parse(fs.readFileSync('chinese.json', 'utf8').substr(1));
//var routes=JSON.parse(fs.readFileSync('router.json','utf8').substr(1));

// Start router

var startRouter=function(path){
        app.get(route, function(req,res){
            //console.log("Connect to "+path);
            var page=info[routes[path].data];
            res.render(routes[path].template,page);//最核心的一句
        });
   };

//for(route in routes){//如果直接for循环而不是调用函数，你就会发现route永远是最后一个
//    startRouter(route);
//}

//File not found

app.get('/', function(req, res){
    res.render('index',{
        'layout' : __dirname +'\\view\\layout.jade',
        'xiexie' : 'good'
    });
});

//app.get('/*', function(req, res){
//    res.render('404',{
//        status: 404,
//        title:'404 - 文件未找到'
//    });
//});



Date.prototype.toHyphenDateString = function(){
    var y = this.getFullYear();
    var m = this.getMonth()+1;
    var d = this.getDate();
    if( m < 10 ) m = '0' + m;
    if( d < 10 ) d = '0' + d;
    return y +'-'+ m +'-'+ d;
};
var date = new Date();
var time = date.toLocaleTimeString();
//console.log( date.toHyphenDateString() +' '+ time+' server running at port '+ port +'...');

try{
    app.listen(port);
    log( date.toHyphenDateString() +' '+ time+' server running at port '+ port +'...');
}catch(e){
    log("Error: "+e.message,1);
}
