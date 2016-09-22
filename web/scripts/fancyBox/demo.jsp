<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String resPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/sofa/basis-resource";
	String appPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
	request.setAttribute("resPath", resPath);
	request.setAttribute("appPath", appPath);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>fancyBox Demo</title>
<script type="text/javascript" language="javascript">
	var appPath = '${appPath}';
</script>

<!-- jquery -->
<script src="${appPath}/scripts/jquery/jquery.min.js" type="text/javascript"></script>

<!-- Add fancyBox main JS and CSS files -->
<script type="text/javascript" src="${appPath}/scripts/fancyBox/jquery.fancybox.js?v=2.1.5"></script>
<link rel="stylesheet" type="text/css" href="${appPath}/scripts/fancyBox/jquery.fancybox.css?v=2.1.5" media="screen" />


<script type="text/javascript">
	$(function(){
		$("#fancyboxBth").bind("click",function(){
			$.fancybox.open({
				href : appPath + "/pages/qiyexinxichakan/qiyexinxichakan.jsp",
				type : 'iframe',
				width : 1280,
				autoDimensions : false,
				autoScale : true,
				padding : 5
			});
		});
	})
</script>
</head>
<body>
<div>
	<a href="javascript:void(0);" id="fancyboxBth">点击查看图片</a>
</div>
</body>
</html>