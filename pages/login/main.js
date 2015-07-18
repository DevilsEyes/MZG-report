/**
 * Created by nic on 2015/6/10.
 */
define(["avalon",'mmRouter', "text!/template/login.html",'SysConfig','SysUtil'], function(avalon,router, login,SysConfig,SysUtil) {
    avalon.templateCache.login = login;

    var model = avalon.define({
        $id: "login",
        account: "",
        password: "",

        login: function (sort) {

            var formData = {order: [sort]};
            formData[sort] = {order: -1};
            $.jsonp({
                url: SysConfig.ApiUrl+"/V1.0.0/Admin/login?_method=POST",
                callbackParameter: "callback",
                data: {
                    phonenum:model.account,
                    password:model.password
                },
                success: function (data) {
                    var data = JSON.parse(data);
                    SysUtil.ApiCallback(data);
                    if(data.code==0)
                    {
                        SysUtil.LoginSuccess();
                    }
                }
            });


        }

    });

    avalon.router.get("/login/", function(){
        avalon.vmodels.root.bodyPage = "login";
    });
    //avalon.router.navigate('login');

});
