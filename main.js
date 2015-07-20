/**
 * Created by nic on 2015/6/10.
 */


define(['avalon','mmRouter'], function(){

    avalon.log("加载avalon完毕，开始构建根VM与加载其他模块");
    avalon.templateCache.empty = " ";
    var model = avalon.define({
        $id: "root",
        bodyPage:'empty',
        menus: [
            //{
            //    title: "报表",
            //    url: "report/index.html"
            //}
        ],
        logined:false
    });
    model.$watch("logined", function(newV,oldV){
        if(newV!=oldV&&newV==false)window.location.href = './'
    });
    //
    avalon.router.get("/", function(){
        location.href='#!/login';
    });

    avalon.scan(document.body);
    return model;

});