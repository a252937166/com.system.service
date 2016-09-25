<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/9/23
  Time: 0:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script type="text/javascript">
    $(function(){
        showMenus();
// 			initPage();
    })
</script>
<div class="sidebar-shortcuts" id="sidebar-shortcuts">
    <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
        <button class="btn btn-success">
            <i class="icon-signal"></i>
        </button>

        <button class="btn btn-info">
            <i class="icon-pencil"></i>
        </button>

        <button class="btn btn-warning">
            <i class="icon-group"></i>
        </button>

        <button class="btn btn-danger">
            <i class="icon-cogs"></i>
        </button>
    </div>

    <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
        <span class="btn btn-success"></span>

        <span class="btn btn-info"></span>

        <span class="btn btn-warning"></span>

        <span class="btn btn-danger"></span>
    </div>
</div>
<!-- #sidebar-shortcuts -->

<ul class="nav nav-list" id="menuList">
    <%--<li class="active" id="user">
        <a><i class="icon-dashboard"></i> <span
                class="menu-text" data-url="/pages/user/user.jsp"> 用户管理 </span></a>
    </li>
    <li id="role">
        <a><i class="icon-text-width"></i> <span
                class="menu-text"> 角色管理 </span></a>
    </li>
    <li id="menu">
        <a><i class="icon-text-width"></i> <span
                class="menu-text"> 菜单管理 </span></a>
    </li>--%>
</ul>
<!-- /.nav-list -->

<div class="sidebar-collapse" id="sidebar-collapse">
    <i class="icon-double-angle-left" data-icon1="icon-double-angle-left"
       data-icon2="icon-double-angle-right"></i>
</div>

