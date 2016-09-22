<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/9/15
  Time: 17:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    request.setAttribute("path",path);
    request.setAttribute("basePath",basePath);
%>

<html>
<head>
    <title>hello</title>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/ace/assets/css/bootstrap.min.css">
    <script type="text/javascript" src="${path}/scripts/jquery/jquery.min.js"></script>
    <script type="text/javascript">
        var path = '${path}'
        $(function () {
            var url = path + "/hello.action"
            $.ajax({
                type : "get",
                url : url,
                data: null,
                success : function(data) {
                    alert(data);
                }
            });
        })
    </script>
</head>
<body>
Hello!!${username}
</body>
</html>
