<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/9/23
  Time: 0:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="navbar-container" id="navbar-container">
    <div class="navbar-header pull-left">
        <a href="#" class="navbar-brand">
            <small>
                <i class="icon-leaf"></i>
                客户关系管理系统
            </small>
        </a><!-- /.brand -->
    </div><!-- /.navbar-header -->
    <div class="navbar-header pull-right" role="navigation">
        <ul class="nav ace-nav" style="height: 40px;">
            <li class="green" style="cursor: pointer;" onclick="cancelLation();">
                <a data-toggle="dropdown" class="dropdown-toggle" >
                    <i class="icon-off"></i>注销
                </a>
            </li>
        </ul><!-- /.ace-nav -->
    </div>
    <div class="navbar-header pull-right" role="navigation">
        <div id="nameAndRole" style="margin-top: 10px;margin-right: 10px;"></div>
    </div>
</div><!-- /.container -->
<script type="text/javascript">
    $(function(){
        var nameAndRole = loginInfo_userName + "用户；" + loginInfo_roleName + "角色正在登陆";
        $("#nameAndRole").text(nameAndRole);
    })
</script>

