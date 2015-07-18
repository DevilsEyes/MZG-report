/**
 * Created by nic on 2015/7/16.
 */
define(function(){

    return {
        ApiCallback:function(data)
        {
            if (data.code == 4003)
            avalon.vmodels.root.logined = false;
            if(data.code==0)avalon.vmodels.root.logined = true;
        },
        LoginSuccess:function()
        {
            location.href = '#!/userList/';
            avalon.vmodels.root.logined = true;
        }
    };
});