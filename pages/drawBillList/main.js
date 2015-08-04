/**
 * Created by nic on 2015/6/10.
 */
define(["avalon", 'mmRouter', "text!/template/drawBillList.html", "SysConfig", 'SysUtil'], function (avalon, router, userList, SysConfig, SysUtil) {
    avalon.templateCache.userList = userList;

    avalon.vmodels.root.menus.push({
        title: "提款单列表",
        url: "#!/drawBillList/"
    });

    var model = avalon.define({
        $id: "drawBillList",

        billList: [],

        page: 1,
        limit: 20,
        Maxpage: 0,

        getBillList: function ($event, page) {

            layer.load(2);

            page = parseInt(page);

            $.jsonp({
                url: SysConfig.ApiUrl + "V1.0.0/Admin/DrawBill/list?_method=GET",
                data: {
                    index: model.limit * (page - 1),
                    limit: model.limit
                },
                callbackParameter: 'callback',
                success: function (obj) {
                    obj = $.parseJSON(obj);
                    SysUtil.ApiCallback(obj);
                    var data = obj.data;

                    model.page = page;
                    if (typeof(data.count) != 'undefined') {
                        model.Maxpage = Math.floor(data.count / model.limit);
                    }
                    model.billList = data.DrawBill;

                    console.dir(obj);

                    layer.closeAll('loading');
                    avalon.scan(document.body);
                },
                error: function () {

                }
            })

        },

        e$Click: function ($event, index, type) {

            var str = '';
            switch (type) {
                case 0:
                    str = '确认这份提款单？';
                    break;
                case 30:
                    str = '要取消这份提款单吗？';
                    break;
                case 50:
                    str = '要设为恶意提款单吗？';
                    break;
            }

            layer.open({
                skin: 'mySkin',
                title:'',
                content:'<h1>'+str+ '</h1><h2>￥ ' + model.billList[index].amount + '</h2><p>来自店铺:'+ model.billList[index].storeId + '</p>',
                shade: 0.3,
                shadeClose: true,
                closeBtn: false,
                btn: ["确认", "取消"],
                yes: function ($w) {
                    layer.load(2);
                    var url = '';
                    var data = {drawBillId: model.billList[index]._id};
                    if (type == 0) {
                        url = SysConfig.ApiUrl + "V1.0.0/Admin/DrawBill/ensure?_method=POST";
                    }
                    else {
                        url = SysConfig.ApiUrl + "V1.0.0/Admin/DrawBill/info?_method=POST";
                        data['status'] = type;
                    }

                    //console.log('data:');
                    //console.dir(data);
                    $.jsonp({
                        url: url,
                        callbackParameter: "callback",
                        data: data,
                        success: function (obj) {
                            obj = $.parseJSON(obj);
                            console.dir(obj);
                            layer.close($w);
                            layer.closeAll('loading');
                            if(obj.code==0){
                                layer.msg('操作完成！');
                            }
                            else{
                                layer.msg(obj.msg);
                            }
                        },
                        error: function () {
                            layer.msg('您的网络连接不太顺畅哦');
                            layer.closeAll('loading');
                        }
                    })
                }
            });
        }
    });

    avalon.filters.f$drawBillStatus = function (str) {
        switch (str) {
            case 0:
                return '待提款';
            case 10:
                return '提款中';
            case 20:
                return '提款失败';
            case 30:
                return '取消提款';
            case 40:
                return '提款完成';
            case 50:
                return '恶意提款';
            default :
                return '未知的提款状态';
        }

    };

    avalon.filters.f$current = function (str) {
        return '￥ '+ str;
    };

    //model.$watch("page", function (a) {
    //    avalon.scan(document);
    //});

    avalon.router.get("/drawBillList/", function () {
        avalon.vmodels.root.bodyPage = "./pages/drawBillList/template/drawBillList.html";
        model.getBillList('', 1);
    });

});
