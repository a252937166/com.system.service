/**
 * Created by OuyangDuning on 2016/9/22.
 */

var showDiv = function(){
    var headUrl = path + "/pages/common/header.jsp";
    $("#header").load(headUrl);
    var leftUrl = path + "/pages/common/left.jsp";
    $("#left").load(leftUrl);
}