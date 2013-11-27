
/*
 * GET home page.
 */



exports.index = function(req, res){

    console.log(req.path);
    var path = req.path.replace('/', '');
    if( path === "" ) path = 'index';
    if( path.indexOf('.') < 0 ){
        res.render( path, { title: path });
    }else{
        res.end();
    }
};



//exports.index = function(req, res){
//    console.log(req.path);
//    res.render('index', { title: 'Express' });
//};
//
//exports.login = function(req, res){
//    res.render('login', { title: '用户登陆'});
//};
//
//exports.doLogin = function(req, res){
//    var user={
//        username:'admin',
//        password:'admin'
//    }
//    if(req.body.username===user.username && req.body.password===user.password){
//        res.redirect('/home');
//    }
//    res.redirect('/login');
//};
//
//exports.logout = function(req, res){
//    res.redirect('/');
//};
//
//exports.home = function(req, res){
//    var user={
//        username:'admin',
//        password:'admin'
//    }
//    res.render('home', { title: 'Home',user: user});
//};
