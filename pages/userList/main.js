/**
 * Created by nic on 2015/6/10.
 */
define(["avalon", 'mmRouter', "text!/template/userList.html", "SysConfig", 'SysUtil'], function (avalon, router, userList, SysConfig, SysUtil) {
    avalon.templateCache.userList = userList;

    avalon.vmodels.root.menus.push({
        title: "用户列表",
        url: "#!/userList/"
    });

    var by = function (name, s) {
        return function (o, p) {
            var a, b;
            if (typeof(o) === "object" && typeof(p) === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof(a) === typeof(b)) {
                    if (s === '0') {
                        return a < b ? -1 : 1;
                    } else {
                        return a < b ? 1 : -1;
                    }
                }
                if (s === '0') {
                    return typeof(a) < typeof(b) ? -1 : 1;
                }
                else {
                    return typeof(a) < typeof(b) ? 1 : -1;
                }
            }
            else {
                throw("error");
            }
        }
    };

    //exports.userList= model = avalon.define({
    model = avalon.define({
        $id: "userList",
        sort: "",
        totalNum: 0,
        sectorF: 0,
        androidNum: 0,
        iosNum: 0,
        page: 1,
        limit: 20,

        mySort: 'storeId',
        mySortF: '1',
        search:'',

        fields: [{
            name: "#"
        },
            {name: "店名"},
            {
                name: "作品数",
                sort: "product"
            },
            {
                name: "服务数",
                sort: "commodity"
            },
            {
                name: "客户数",
                sort: "customer"
            },
            {
                name: "预约数",
                sort: "orderNum"
            },
            {
                name: "访问量",
                sort: "count"
            }, {name: "行业"}, {name: "版本"}, {name: "平台"},
            {
                name: "注册时间",
                sort: "time"
            },
            {name: '机型'},
            {name: '最后'},
            {name: '手机'}
        ],
        wholeDatas: [],
        datas: [],
        sector: {
            0: "爱好",
            10: "美甲",
            20: "美发",
            30: "纹身",
            40: "摄影",
            50: "美容"
        },
        platform: {
            1: "ios",
            0: "安卓"
        },
        //dataFormat: new Date(),
        //getFormatTime: function (time) {
        //    report.dataFormat.setTime(time);
        //    return report.dataFormat.toLocaleString();
        //},

        dateFormat: new Date(),
        getFormatTime: function (time) {
            model.dateFormat.setTime(time);
            return model.dateFormat.toLocaleString();//.format("yyyy-MM-dd HH:mm:ss");
        }, 

        getReports: function (sort) {
            //if (model.sort === sort)
            //    return;
            //var isEquals = false;
            //for (var i in model.fields) {
            //    var field = model.fields[i];
            //
            //    if (field.sort && sort && field.sort === sort) {
            //        isEquals = true;
            //        break;
            //    }
            //}
            //
            //if (isEquals)
            //    model.sort = sort;
            //else
            //    return;

            layer.load(2);

            if (typeof (sort) == 'string')model.sort = sort;
            var formData = {order: [model.sort]};
            formData[model.sort] = {order: -1};
            if (model.sectorF != '0')formData['sector'] = model.sectorF;
            $.jsonp({
                url: SysConfig.ApiUrl + "V1.0.0/Admin/Report/storeList",
                callbackParameter: "callback",
                data: formData,
                success: function (data) {
                    var data = JSON.parse(data), ids = "";
                    SysUtil.ApiCallback(data);
                    if (data.code != 0) {
                        return alert(data.msg);
                    }
                    model.androidNum = 0;
                    model.iosNum = 0;
                    data.data.list.forEach(function (item) {
                        if (item.platform == 1)model.iosNum++;
                        else model.androidNum++;
                    });
                    //window.wholeDatas = data.data.list;

                    model.wholeDatas = data.data.list;
                    model.datas = model.wholeDatas;
                    model.mySort = 'storeId';
                    model.mySortF = '1';
                    layer.closeAll('loading');

                    //model.datas = model.wholeDatas.slice(model.limit*model.page,model.limit*(model.page+1));
                }
            });
        }
    });
    model.$watch("page", function (a) {
        avalon.scan(document);
    });

    model.$watch("mySort", w$Sort);
    model.$watch("mySortF", w$Sort);

    function w$Sort(a) {
        model.wholeDatas.sort(by(model.mySort, model.mySortF));
        model.datas = model.wholeDatas;
        avalon.scan(document);
    }

    model.$watch("search",w$Search);

    function w$Search(){
        if(model.search == ''){
            model.datas = model.wholeDatas;
            return;
        }
        for(var i=0;i<model.wholeDatas.size();i++){
            if(model.wholeDatas[i].storeName == model.search){
                model.datas = [model.wholeDatas[i]];
                avalon.scan(document);
                return;
            }
        }
    };

    avalon.router.get("/userList/", function () {
        avalon.vmodels.root.bodyPage = "userList";
        model.getReports('time');
    });

});
