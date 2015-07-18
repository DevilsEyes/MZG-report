/**
 * Created by nic on 2015/6/10.
 */
define(["avalon",'mmRouter', "text!/template/message.html","SysConfig",'SysUtil'], function(avalon,router, message,SysConfig,SysUtil) {
    avalon.templateCache.message = message;

    avalon.vmodels.root.menus.push({
            title: "发通知",
            url: "#!/message/"
        });

    //exports.userList= model = avalon.define({
    var model = avalon.define({
        $id: "message",

        sector:0,
        platform:-1,
        content:'',
        content2:'',
        url:'',
        url2:'',
        send: function () {
            var formData = {};
            if(model.sector!=0)formData['sector']=model.sector;
            if(model.platform!=-1)formData['platform']=model.platform;
            formData['content'] = model.content;
            formData['url'] = model.url;
            if(formData['content']==''||formData['url']=='')return alert('消息不能为空');
            $.jsonp({
                url: SysConfig.ApiUrl+"V1.0.0/Admin/messageList?_method=PUT",
                callbackParameter:"callback",
                data:formData,
                success:function(data){
                    var data = JSON.parse(data);
                    SysUtil.ApiCallback(data);
                    if(data.code!=0)
                        return alert(data.msg);
                    else
                    {
                        model.content2 = model.content;
                        model.url2 = model.url;
                        model.content = '';
                        model.url = '';
                        return alert('成功：'+data.data['count']+'个');
                    }
                }
            });
        }

    });

    avalon.router.get("/message/", function(){
        avalon.vmodels.root.bodyPage = "message";
    });

});
