/**
 * Created by nic on 2015/6/11.
 */

require.config({
    baseUrl: '/MZG report/',
    paths: {
        jquery: 'vendor/jquery/jquery.min.js',
        //avalon: "vendor/avalon/avalon",
        text: 'vendor/require/text',
        domReady: 'vendor/require/domReady',
        css: 'vendor/require/css.js',
        mmRouter: 'vendor/avalon/mmRouter.js',
        SysConfig: 'config/SysConfig.js',
        SysUtil: 'config/SysUtil.js',
        SysValue: 'config/SysValue.js',
        jsonp: 'vendor/jsonp/jsonp.js',
        //loaderMap: './lib/loaderMap.js',
        userList: 'pages/userList/main.js',
        login: 'pages/login/main.js',
        userInfo: 'pages/userInfo/main.js',
        message: 'pages/message/main.js'
    },
    priority: ['text', 'css'],
    shim: {
        jquery: {
            exports: "jQuery"
        },
        avalon: {
            exports: "avalon"
        }
    }
});

//require(function(){
require(['avalon',
    'mmRouter',
    'userList?20150716',
    'login?20150716',
    'userInfo?20150716',
    'message?20150716',
    'main?20150619'], function(avalon,mmRouter,userList,login,index){

    avalon.router.error(function(){
        require(["text!./static/template/404.html"], function(not_found) {
            avalon.templateCache.not_found = not_found;
            avalon.vmodels.root.bodyPage = "not_found";
        });
    });
    avalon.history.start({
        basepath: "/"
    });
    avalon.scan(document.body);
});
    //});


