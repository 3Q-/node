/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    ejs = require('ejs');
    
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 80);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.set('view engine', 'html');
    app.engine('.html', ejs.__express);

    app.use(express.favicon());
    //app.use(express.logger('dev'));
    //app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(express.static(__dirname, 'public'));
    app.use(express.logger());
    app.use(function(req, res){
        res.send('Hello');
    });
});

ejs.open = '{{';
ejs.close = '}}';


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.all('/*', function(req, res, next){

    var path = req.path;

    if( path.indexOf('.') < 0 ){
        path = path.replace('/', '');
        if( path === "" ) path = 'index';

        if(path == 'index'){
            var op = {
                    title :path,
                    ary : [1,2,3,4,5,6]
                }
            res.render( path.replace('/', '-'), op);
            return;
        }

        res.render( path.replace('/', '-'), { title: path.replace('/', '-') });

    }else{
        next();
    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
