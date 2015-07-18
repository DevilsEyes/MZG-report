/**
 * Created by nic on 2015/6/11.
 */
define(["avalon", "text!../page/aaa.html"], function(avalon, demo_aaa) {

    avalon.templateCache.demo_aaa = demo_aaa;
    var model = avalon.define({
        $id: "aaa",
        param: "空"
    });

    avalon.vmodels.root.page = "demo_aaa";
    avalon.router.get("/demo/aaa/:param", function(){
        model.param = this.params.param;
    });

});