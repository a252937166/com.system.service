<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/9/22
  Time: 23:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    request.setAttribute("path",path);
    request.setAttribute("basePath",basePath);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <title>客户管理管理系统</title>
    <script type="text/javascript">
        var path = "${path}";
        var basePath = "${basePath}";
        var loginInfo_userId = "${sessionScope.loginInfo.userId}";
        var loginInfo_userName = "${sessionScope.loginInfo.userName}";
        var loginInfo_roleId = "${sessionScope.loginInfo.roleId}";
        var loginInfo_roleName = "${sessionScope.loginInfo.roleName}";
    </script>
    <script type="text/javascript" src="${path}/scripts/jquery/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/ace/assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="${path}/scripts/ace/assets/css/font-awesome.min.css">

    <link rel="stylesheet" type="text/css" href="${path}/scripts/ace/assets/css/ui.jqgrid.css">
    <link rel="stylesheet" type="text/css" href="${path}/scripts/ace/assets/css/ace-fonts.css">
    <link rel="stylesheet" type="text/css" href="${path}/scripts/ace/assets/css/ace.min.css">
    <link rel="stylesheet" type="text/css" href="${path}/scripts/ace/assets/css/jquery-ui-1.10.3.full.min.css">
    <script type="text/javascript" src="${path}/scripts/ace/assets/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${path}/scripts/ace/assets/js/ace-elements.min.js"></script>
    <script type="text/javascript" src="${path}/scripts/ace/assets/js/jqGrid/jquery.jqGrid.min.js"></script>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="${path}/scripts/easyui/themes/icon.css">
    <script type="text/javascript" src="${path}/scripts/easyui/jquery.easyui.min.js"></script>

    <link rel="stylesheet" type="text/css" href="${path}/scripts/fancyBox/jquery.fancybox.css">
    <script type="text/javascript" src="${path}/scripts/fancyBox/jquery.fancybox.js"></script>
    <script type="text/javascript" src="${path}/scripts/echarts/echarts-all.js"></script>

    <script type="text/javascript" src="${path}/scripts/datepicker/WdatePicker.js"></script>

    <script type="text/javascript" src="${path}/scripts/ajax/ajax.js"></script>
    <script type="text/javascript" src="${path}/scripts/js/date.js"></script>
    <script type="text/javascript" src="${path}/scripts/js/crm.js"></script>
    <script type="text/javascript" src="${path}/scripts/js/crm-grid.js"></script>
    <script type="text/javascript" src="${path}/scripts/js/crm-grid1.js"></script>
    <script type="text/javascript" src="${path}/scripts/js/crm-page.js"></script>
    <script type="text/javascript" src="${path}/scripts/js/crm-ajax.js"></script>
    <script type="text/javascript" src="${path}/pages/index/index.js"></script>
    <script type="text/javascript" src="${path}/pages/common/left.js"></script>
<%--    <script type="text/javascript" src="${path}/pages/index/serMain.js"></script>
    <script type="text/javascript" src="${path}/pages/index/manMain.js"></script>--%>
    <script type="text/javascript">
        $(function(){
            showDiv();
        })
    </script>
</head>
<body>
<div class="navbar navbar-default" id="header">
</div>
<div class="main-containter" id="main-containter">
    <div class="main-containter-inner">
        <div class="sidebar" id="left"></div>
        <div class="main-content" id="main-content">
            <div class="breadcrumbs" id="breadcrumbs"> </div>
            <div class="page-content" id="page-content">
                <!-- 					欢迎来到客户关系管理系统！！！ -->

                欢迎来到客户关系管理系统！！！

            </div>
        </div>
    </div>
</div>
</body>
</html>

