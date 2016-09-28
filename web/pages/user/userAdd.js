var initPage = function(){
	initBind();
};
var initBind = function(){
	$("#userCode").bind("blur",function(){
		valid.valieCode();
	});
	$("#userName").bind("blur",function(){
		valid.valieName();
	});
	$("#userPassword").bind("blur",function(){
		valid.valiePassword();
	});
	$("#userPhone").bind("blur",function(){
		valid.valiePhone();
	});
	$("#userEmail").bind("blur",function(){
		valid.valieEamil();
	});
};

//鼠标移开验证字段是否合法
var valid = {
		valieCode:function(){
			var codeRe = /^\w+$/; 
			if($("#userCode").val().trim() != null){
				var re = new RegExp(codeRe);
				if(!re.test($("#userCode").val())){
					$("#userCode_span").html("请输入正确的登录名");
				}else{
					$("#userCode_span").empty();
				}
			}else{
				$("#userCode_span").empty();
			}
		},
		valieName:function(){
			var nameRe = /^[\u0391-\uFFE5]+$/;		//中文
			if($("#userName").val().trim() != null){
				var re = new RegExp(nameRe);
				if(!re.test($("#userName").val())){
					$("#userName_span").html("请输入正确的用户名");
				}else{
					$("#userName_span").empty();
				}
			}else{
				$("#userName_span").empty();
			}
		},
		valiePassword:function(){
			var passRe = /^(\w|[\(\)\!@#$%^&*\[\]{};’,<>?|=+）|])+$/;//密码
			if($("#userPassword").val().trim() != null){
				var re = new RegExp(passRe);
				if(!re.test($("#userPassword").val())){
					$("#userPassword_span").html("请输入正确密码格式");
				}else{
					$("#userPassword_span").empty();
				}
			}else{
				$("#userPassword_span").empty();
			}
		},
		valiePhone:function(){
			var phoneRe = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;//电话
			if($("#userPhone").val().trim() != null){
				var re = new RegExp(phoneRe);
				if(!re.test($("#userPhone").val())){
					$("#userPhone_span").html("请输入正确电话格式");
				}else{
					$("#userPhone_span").empty();
				}
			}else{
				$("#userPhone_span").empty();
			}		
		},
		valieEamil:function(){
			var emailRe = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;   	//邮箱
			if($("#userEmail").val().trim() != null){
				var re = new RegExp(emailRe);
				if(!re.test($("#userEmail").val())){
					$("#userEmail_span").html("请输入正确邮箱格式");
				}else{
					$("#userEmail_span").empty();
				}
			}else{
				$("#userEmail_span").empty();
			}
		}
};

var userAdd = function(){
	var params = [
	              {name:"userVO.userCode",value:$("#userCode").val()},
	              {name:"userVO.userName",value:$("#userName").val()},
	              {name:"userVO.userPassword",value:$("#userPassword").val()},
	              {name:"userVO.userPhone",value:$("#userPhone").val()},
	              {name:"userVO.userEmail",value:$("#userEmail").val()},
	              ];
	var url = path + "/user.action?addUser";
	var flag = valiParam();
	if(flag){
		$.ajax({
			type:'get',
			url:url,
			data:params,
			dataType:"json",
			success:function(data){
				if(data == "1"){
					alert("新增成功");
					backMain();
				}else{
					alert("新增失败");
				}
			}
		});
	}else{
		alert("信息填写不合法");
	}
};

var valiParam = function(){
	var flag = true;
	var codeRe = /^\w+$/; 					//英文
	var nameRe = /^[\u0391-\uFFE5]+$/;		//中文
	var passRe = /^(\w|[\(\)\!@#$%^&*\[\]{};’,<>?|=+）|])+$/;//密码
	if($("#userCode").val().trim() != null){
		var re = new RegExp(codeRe);
		if(!re.test($("#userCode").val())){
			flag = false;
			return;
		}else{
			flag = true;
		}
	}else{
		flag = false;
	};
	if($("#userName").val().trim() != null){
		var re = new RegExp(nameRe);
		if(!re.test($("#userName").val())){
			flag = false;
			return;
		}else{
			flag = true;
		}
	}else{
		flag = false;
	};
	if($("#userPassword").val().trim() != null){
		var re = new RegExp(passRe);
		if(!re.test($("#userPassword").val())){
			flag = false;
			return;
		}else{
			flag = true;
		}
	}else{
		flag = false;
	}
	
	return flag;
}
var backMain = function(){
	var userPath  = path + "/pages/user/user.jsp";
	$("#page-content").load(userPath);
};