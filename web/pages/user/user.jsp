<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/9/25
  Time: 23:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    request.setAttribute("path",path);
    request.setAttribute("basePath",basePath);
%>
<style type="text/css">
    #showNewsContent {
        width: 100%;
        border: 1px dotted #ccc;
    }

    #showNewsContent:hover {
        border: 1px solid #FFD700;
    }
</style>
<script type="text/javascript" src="${path}/pages/user/user.js"></script>
<script type="text/javascript">
    $(function () {
        initPage();
    })
</script>
<div class="row">
    <div class="col-md-12" id="searchContion">
        <div id="condition" style="min-width: 1140px;">
            <div id="showNews"
                 style="cursor: pointer; border-radius: 5px; border: 0px dotted #000; min-height: 40px; width: 100%;">
                <div id="showNewsList">
                    <div id="showNewsContent"
                         style="margin-top: 10px; min-height: 30px; border-radius: 5px;"
                         class="tags tags-hover">
                        <i id='search' class="icon-search bigger-110  blue"></i>&nbsp;&nbsp;
                        <font id="content" color="#c1cdc1">搜索内容</font>
                    </div>
                </div>
                <form id="formSearch" name="formSearch"
                      style="display: none; margin-top: 2px; margin-bottom: 2px;">
                    <table class="sinosoft-table-default" style="width: 98%;">
                        <tbody>
                        <tr>
                            <td style="min-width: 80px;" align="right" width="10%">
                                <label for="userCode" class="control-label">
                                    登录帐号:
                                </label>
                            </td>
                            <td style="min-width: 200px;" width="20%">
                                <input placeholder="登录帐号" id="userCode"
                                       onkeypress="if(event.keyCode==13) searchClick();"
                                       class="form-control input-sm inputState" type="text">
                            </td>
                            <td style="min-width: 80px;" align="right" width="10%">
                                <label for="userName" class="control-label">
                                    用户名:
                                </label>
                            </td>
                            <td style="min-width: 200px;" width="20%">
                                <input placeholder="用户名" id="userName"
                                       onkeypress="if(event.keyCode==13) searchClick();"
                                       class="form-control input-sm inputState" type="text">
                            </td>
                            <td align="right" colspan=1>
                                <button type="button" class="btn btn-xs btn-primary"
                                        style="border-radius: 10px;" onclick="searchClick();">
                                    <i class="icon-search bigger-110"></i> 搜 索
                                </button>
                                &nbsp;
                                <button type="button" class="btn btn-xs btn-primary"
                                        style="border-radius: 10px;" onclick="clearClick();">
                                    <i class="icon-trash bigger-130"></i> 清 空
                                </button>
                                &nbsp;
                                <button type="button" class="btn btn-xs btn-primary"
                                        style="border-radius: 10px;" onclick="cancleClick();">
                                    <i class="icon-reply bigger-130"></i> 取 消
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-12" style="margin-top: 10px;">
        <a data-toggle="tab" onclick="drawAddPage('/pages/user/userAdd.jsp')" class="btn-new-mail">
		<span class="btn bt1n-small btn-purple no-border">
			<i class="icon-edit"></i>
			<span class="">新增用户</span>
		</span>
        </a>

        <a data-toggle="tab" onclick="updateUser()" class="btn-new-mail">
		<span class="btn bt1n-small btn-purple no-border">
			<i class="icon-edit"></i>
			<span class="">修改用户</span>
		</span>
        </a>
        <a data-toggle="tab" onclick="deleteUser()" class="btn-new-mail">
		<span class="btn bt1n-small btn-purple no-border">
			<i class="icon-edit"></i>
			<span class="">删除用户</span>
		</span>
        </a>
        <div class="table-responsive" style="margin-top:10px">
            <table class="table table-bordered table-hover" id="userList">
            </table>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12" style="height: 35px;width: 100%;">
            <div id="page" style="text-align: left;cursor: pointer;left: 180px;bottom: 2px;position: absolute;"></div>
        </div>
    </div>
</div>

