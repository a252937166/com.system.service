/**
 * 请求工具类
 */
crm.ajax = {
	opt : {
		url : "",//请求地址
		data : "",//请求参数
		dataType : "json"//请求返回类型
	}
	,event:{
		success : null,//请求成功函数
		error : null,//请求错误函数
		complete : null//请求结束函数
	}
	,post : function(optionParams,eventParams){
		var self = this;
		self.options = $.extend({},self.opt,self.event,optionParams,eventParams);
		self.ajaxResult = $.post(self.options.url,self.options.data,self.options.success,self.options.dataType);
		self.ajaxResult.complete(self.options.complete);
		self.ajaxResult.error(self.options.error);
	}
	,postNormal : function(url,data,successFun,dataType){
		if(dataType == null) dataType = "json";
		$.post(url,data,successFun,dataType);
	}
	
	
};