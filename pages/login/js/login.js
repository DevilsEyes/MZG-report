/**
 * Created by nic on 2015/6/11.
 */
define(function() {
    require(["avalon",'mmRouter', "text!./pages/userList/template/userList.html"], function(avalon,router, userList) {

        var model = avalon.define({
            $id: "userList",
            sort: "",


            dateFormat: new Date(),
            getFormatTime: function (time) {
                model.dateFormat.setTime(time);
                return model.dateFormat.toLocaleString();//.format("yyyy-MM-dd HH:mm:ss");
            },

            getReports: function (sort) {
                if (model.sort === sort)
                    return;
                var isEquals = false;
                for (i in model.fields) {
                    var field = model.fields[i];

                    if (field.sort && sort && field.sort === sort) {
                        isEquals = true;
                        break;
                    }
                }

                if (isEquals)
                    model.sort = sort;
                else
                    return;

                var formData = {order: [sort]};
                formData[sort] = {order: -1};
                $.jsonp({
                    url: ApiUrl+"Admin/Report/storeList",
                    callbackParameter: "callback",
                    data: formData,
                    success: function (data) {
                        var data = JSON.parse(data), ids = "";
                        avalon.vmodels.root.ApiCallback(data);
                        if (data.code != 0)
                            return alert(data.msg);

                        model.datas = data.data.list;
                    }
                });


            }

        });
    });

});