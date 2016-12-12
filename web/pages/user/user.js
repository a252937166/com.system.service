/**
 * Created by OuyangDuning on 2016/9/28.
 */

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
            console.log(data);
        }
    })
};

var drawAddPage = function (url) {
    var addPath = path + url;
    $("#page-content").load(addPath);
};