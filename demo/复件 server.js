var express = require('express');
var partials = require('express-partials');
var app = express();
var fs = require('fs');
var port = 80;
var jqtpl = require("jqtpl");
var jade = require('jade');

app.set('views', __dirname +'\\view');
app.set('view engine', 'html');
app.set('layout', true);
app.engine('html', require('jqtpl/lib/express').render );
app.use( partials() );


var layout = __dirname +'\\index';
var css = __dirname +'\\css';
var js = __dirname +'\\js';
var img = __dirname +'\\img';

var Render = function(req, res, pageName, option){
        option.css = css;
        option.js = js;
        option.img = img;
        res.render(pageName, option);
    };

app.get('/jade', function(req, res, next){
});

app.get('/', function(req, res, next){

    res.render('index',{
        'layout' : layout,
        'num' : port
    });

    //Render(req, res, 'index', {
    //    layout : layout,
    //    pagejs : index.js
    //});
});

app.get('/', function(req, res){
    res.render('index');
});

app.listen(port);
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
console.log( date.toHyphenDateString() +' '+ time+' server running at port '+ port +'...');
