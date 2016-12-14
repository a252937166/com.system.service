/**
 * Created by OuyangDuning on 2016/9/28.
 */
var grid = null;

var initPage = function () {
    initStyle();
    initPageData();
};

var initStyle = function () {
    $("#showNewsList").on("click",function(event){
        if($("#formSearch ").is(":hidden")){
            $("#formSearch input").each(function(){
                $(this).val("");
            });
            $("#showNewsContent").hide();
            $("#formSearch").slideDown();
            $("#showNews").css({
                border:"1px dotted #000"
            });
            var height = parseInt($("#showMap").outerHeight(true)-28)+"px";
            $("#showMap").css({
                height:height
            });
        }else{
            $("#showNewsContent").show();
            $("#formSearch").hide();
            $("#showNews").css({
                border:"0px dotted #000"
            });
        }
    });
};

/**
 * 初始化页面数据
 */
var initPageData = function () {
    var url = path + "/user.action?findUsers";
    $.ajax({
        type:'post',
        url:url,
        data:null,
        dataType:'json',
        success:function (data) {
            // drawTable(data);
            for (var i = 0; i < data.length; i ++) {
                data[i].no = i + 1;
                data[i].time = new Date(data[i]["createDate"].time).format("yyyy-MM-dd")
            }
            if (grid) {
                myJqGrid.reloadGrid(data);
            } else {
                myJqGrid.initJqGrid(data);
            }
        }
    })
};

var myJqGrid = {
    initJqGrid : function (data) {
        grid = new crm.grid.createJqGrid("userList");//获得页面上的table对象
        grid.setHeight($(window).height() - 330);//设置table高度
        grid.setTHead(['','序号','登录账号','用户名','电话', '邮箱','创建时间']);//设置table的head
        grid.addColModel({name:'userId',index:'userId',hidden:true,key:true});
        grid.addColModel({name:'no',index:'no',sortable:false,width:25});
        grid.addColModel({name:'userCode',index:'userCode',sortable:false,width:60});
        // grid.addColModel({name:'roleName',index:'roleName',sortable:false,width:90});
        grid.addColModel({name:'userName',index:'userName',sortable:false,width:90});
        grid.addColModel({name:'userPhone',index:'userPhone',sortable:false,width:150});
        grid.addColModel({name:'userEmail',index:'userEmail',sortable:false,width:70});
        grid.addColModel({name:'time',index:'time',sortable:false,width:70});
        grid.setTableAttribute({onSelectRow:function(rowId){checkAllSelectRow();}});
        grid.loadDataForJqGrid(data);

    },
    reloadGrid : function (data) {
        grid.getJqGrid().clearGridData();
        // grid.setPageSize(page.getPageSize());
        grid.reloadGrid(data);
        // grid.refreshNumber(page.getStart(), "number");
    }
};

/**
 * 新增用户界面
 * @param url 新增页面地址
 */
var drawAddPage = function (url) {
    var addPath = path + url;
    $("#page-content").load(addPath);
};