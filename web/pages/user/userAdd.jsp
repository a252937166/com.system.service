<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    request.setAttribute("path",path);
    request.setAttribute("basePath",basePath);
%>

<style type="text/css">
    .val_span {
        margin-top: 5px;
    }

    .val_span span {
        color: red;
    }
</style>
<script type="text/javascript" src="${path}/pages/user/userAdd.js"></script>
<script type="text/javascript">
    initPage();
</script>
<div class="row">
    <div class="col-xs-12">
        <form class="form-horizontal" role="form">
            <div class="form-group">
                <label class="col-sm-3 control-label no-padding-right" for="form-field-1">登录名</label>

                <div class="col-sm-9">
                    <input type="text" id="userCode" placeholder="登录名" class="col-xs-10 col-sm-5">
                    <div class="val_span"><span id="userCode_span"></span></div>
                </div>
            </div>

            <div class="space-4"></div>
            <div class="form-group">
                <label class="col-sm-3 control-label no-padding-right" for="form-field-1">用户名</label>

                <div class="col-sm-9">
                    <input type="text" id="userName" placeholder="用户名" class="col-xs-10 col-sm-5">
                    <div class="val_span"><span id="userName_span"></span></div>
                </div>
            </div>

            <div class="space-4"></div>

            <div class="form-group">
                <label class="col-sm-3 control-label no-padding-right" for="form-field-2">密码</label>

                <div class="col-sm-9">
                    <input type="password" id="userPassword" placeholder="密码" class="col-xs-10 col-sm-5">
                    <span class="help-inline col-xs-12 col-sm-7">
						<span class="middle"></span>
					</span>
                    <div class="val_span"><span id="userPassword_span"></span></div>
                </div>
            </div>
            <div class="space-4"></div>
            <div class="form-group">
                <label class="col-sm-3 control-label no-padding-right" for="form-field-1">电话</label>

                <div class="col-sm-9">
                    <input type="text" id="userPhone" placeholder="电话" class="col-xs-10 col-sm-5">
                    <div class="val_span"><span id="userPhone_span"></span></div>
                </div>
            </div>

            <div class="space-4"></div>
            <div class="form-group">
                <label class="col-sm-3 control-label no-padding-right" for="form-field-1">邮箱</label>

                <div class="col-sm-9">
                    <input type="text" id="userEmail" placeholder="邮箱" class="col-xs-10 col-sm-5">
                    <div class="val_span"><span id="userEmail_span"></span></div>
                </div>
            </div>

            <div class="clearfix form-actions">
                <div class="col-md-offset-3 col-md-9">
                    <button class="btn btn-info" onclick="userAdd();" type="button">
                        <i class="icon-ok bigger-110"></i>
                        提交
                    </button>

                    &nbsp; &nbsp; &nbsp;
                    <button class="btn" onclick="backMain();" type="reset">
                        <i class="icon-undo bigger-110"></i>
                        返回
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>