/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    ejs = require('ejs'),
    app = express();

//环境变量
app.configure(function(){
    app.set('port', process.env.PORT || 80); //端口号
    app.set('view engine', 'ejs'); //ejs 模版引擎
    app.set('view engine', 'html'); //这个不懂
    app.engine('.html', ejs.__express); //过滤.html文件 不用加后缀名
    app.use(express.favicon());
    app.use(app.router);
});

//开发模式 
app.configure('development', function(){
    app.use(express.errorHandler());
});

ejs.open = '{{';
ejs.close = '}}';

app.all('/*', function(req, res){

    var path = req.path.split('/');  //路径切割 第一个为空
    var url = path[1] ? path[1] : 'index'; //工程文件名, 没有默认搭建站点主页
    var web = path[2] ? path[2] : 'index';  //页面名称 没有就出来该工程的主页
    
    //判断是页面还是static文件 .js .css
    if ( req.path.indexOf('.' ) < 0 ){
        if(path.length > 3){
            //如果用了.com/demo/web/web这种路径  模板用 web_web.html 
            web = path.slice(2).join('_');
        }
        if( url == 'index'){  //首页路径
            app.set('views', __dirname + '\\views');
        }else{  //工程路径
            app.set('views', __dirname + '\\projects\\'+url );
        }
        res.render( web , { title: web });
    }else{
        
        //后缀名判断文件类型
        var filetype = path[path.length - 1].split('.');

        //图片都是访问img文件
        if( filetype[1] === 'png' || filetype[1] === 'gif' ||  filetype[1] === 'jpg' || filetype[1] === 'bmp' ){ filetype[1] = 'img' }

        if( url == filetype[1] ){//打开的是站点首页的路径
            res.sendfile( __dirname + '\\public\\'+ filetype[1] +'\\'+ path[path.length - 1]);
        }else{ //工程文件的static文件路径
            res.sendfile( __dirname + '\\projects\\'+ url +'\\'+ filetype[1] +'\\'+ path[path.length - 1]);
        }
    }
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
