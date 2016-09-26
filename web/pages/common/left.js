/**
 * Created by OuyangDuning on 2016/9/25.
 */
var showMenus = function () {
    readMenus();
}

var readMenus = function () {
    url = path + "/menu.action?findMenus";
    $.ajax({
        type: "GET",
        url: url,
        data: null,
        dataType: "json",
        success: function (data) {
            if (data.length > 0) {
                drawMenus(data)
            }
        }
    });
};

var drawMenus = function(menuData) {
        var menuStr = "";
        for(var i=0; i<menuData.length; i++) {
            if (i==0) {
                menuStr += "<li class='active'>";
            } else {
                menuStr += "<li class=''>";
            }
            menuStr += "<a><i class='icon-dashboard'></i>";
            menuStr += "<span class='menu-text' data-url=";
            menuStr += menuData[i]["menuUrl"];
            menuStr += ">";
            menuStr += menuData[i]["menuName"];
            menuStr += "</span></a></li>"
        }

        $("#menuList").html(menuStr);

        initClick();
};
var initClick = function () {
    $("#menuList").find("li").find("a")
        .unbind("click")
        .bind("click",drawPage)
        .css("cursor","pointer");;
};
var drawPage = function () {
    var liArr = $(this).parents("ul").find("li").removeClass();
/*    $.each(liArr,function (i,obj) {
       $(obj).removeClass();
    });*/
    $(this).parents("li").attr("class","active");
    // drawTitleName($(this).find("span").text());
    var pagePath = path + $(this).find("span").attr("data-url");
    $("#page-content").load(pagePath);
};
//1. 读取数据
//2. 将数据按照格式拼写
//3. 处理一些样式问题
//4. 实现页面跳转