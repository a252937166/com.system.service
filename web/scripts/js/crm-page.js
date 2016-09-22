crm.page = function(params,callback){
	var self = this;
	self.options = $.extend({},self.options,params);
	self.callback = callback;
	self.dataList=self.options.dataList;
	self.divIdStart = self.options.appendTo.split("#")[1]+"_crm_page";
	self.initPage();
};
crm.page.prototype.pageCount = 0;
crm.page.prototype.recordCount = 0;
crm.page.prototype.isQueryCount = true;
crm.page.prototype.loadDataEndBack = null;
crm.page.prototype.loadDataBeforBack = null;
crm.page.prototype.callback = null;
crm.page.prototype.dataList = null;
crm.page.prototype.divIdStart = null;

crm.page.prototype.initPage = function(){
	var self = this;
	self.loadRecordCount(function(){
		self.refreshPage();
	});
};
crm.page.prototype.refreshPage = function(){
	var self = this;
	self.setPageCount(self.getPageCount());
	if(self.options.currentPage > self.getPageCount()){
		self.options.currentPage = self.getPageCount();
	}
	self.loadPageData(function(){
		self.drawPage();
		self.bindEvent();
		self.writeCss();
	});
	
};
crm.page.prototype.loadRecordCount = function(callback){
	var self = this;
	//xlj
	if(self.options.dataList){
		self.recordCount=self.options.dataList.length;
		callback();
	}else if(self.options.countUrl){
		crm.ajax.postNormal(self.options.countUrl, self.options.params, function(data){
			if(data.expName){
				crm.exception.handleException(data);
			}else if(data){
				self.recordCount = data.recordCount;
				
				callback();
			}
		});
	}
};
crm.page.prototype.loadPageData = function(interiorCallback){
	var self = this;
	if(self.loadDataBeforBack)self.loadDataBeforBack();
	self.options.params['start'] = self.getStart();
	self.options.params['limit'] = self.getLimit();
	//xlj
	if(self.options.dataList){
		interiorCallback();
		var datas=[];
		for ( var int = self.getStart(); int < self.options.dataList.length; int++) {
			if(int>=(self.getStart()+self.getLimit())) break;
			var data = self.options.dataList[int];
			datas.push(data);
		}
		if(self.callback)self.callback(datas);
		if(self.loadDataEndBack)self.loadDataEndBack();
	}else if(self.options.dataurl){
		crm.ajax.postNormal(self.options.dataurl, self.options.params, function(data){
			if(data.expName){
				crm.exception.handleException(data);
			}else if(data){
				interiorCallback();
				if(self.callback)self.callback(data);
				if(self.loadDataEndBack)self.loadDataEndBack();
			}
		});
	}
};
crm.page.prototype.drawPage = function(){
	var self = this;
	$(this.options.appendTo).empty();
	var $pageDiv = $("<ul id='"+self.divIdStart+"_list' id='"+self.divIdStart+"' class='pagination'></ul>");
	var $firstPage = "",$upPage = "";
	if(self.options.currentPage>1){
		$firstPage = $("<li><a id='"+self.divIdStart+"_firstPage'>&laquo;</a></li>");
		$upPage = $("<li><a id='"+self.divIdStart+"_prev'>&lt;</a></li>");
	}else{
		$firstPage = $("<li class='loseBut'><a>&laquo;</a></li>");
		$upPage = $("<li class='loseBut'><a>&lt;</a></li>");
	}

	$pageDiv.append($firstPage).append($upPage);

	var $div = $("<div id='"+self.divIdStart+"_div'></div>");
	var $pageSize = $("<div id='"+self.divIdStart+"_label'>"+
			"<div id='"+self.divIdStart+"_pageSizeInput'>"+
				"<input type='text' id='"+self.divIdStart+"_pageSize' placeholder='条/页' class='form-control'>" +
				"<button id='"+self.divIdStart+"_submit' class='btn btn-info btn-sm'>确定</button><hr style='margin:2px;'>"+
			"</div>"+
			"<span id='"+self.divIdStart+"_sl'> <font>"+self.options.pageSize+"</font>条/页 </span>"+
			"<span id='"+self.divIdStart+"_rp'> <font>"+self.getCurrentPage()+"/"+self.getPageCount()+"</font>页</span>" +
			"<span id='"+self.divIdStart+"_rl' style='padding-left:3px;'> 总数:<font>"+self.recordCount+"</font></span></div>");

	var startPage = 1;
	if(self.options.currentPage-startPage> Math.floor(self.options.pageButCount/2)){
		startPage =self.options.currentPage- Math.floor(self.options.pageButCount/2);
	}
	if(startPage>self.pageCount-self.options.pageButCount){
		startPage = self.pageCount-self.options.pageButCount+1;
	}
	var end = startPage+self.options.pageButCount-1;
	if(self.pageCount<=self.options.pageButCount){
		startPage = 1;
		end = self.pageCount;
	}
	
	for (var i = startPage; i <= end; i++) {
		if (self.options.currentPage == i){
			$pageDiv.append("<li class='active "+self.divIdStart+"_pageNum' id='"+self.divIdStart+"_"+i+"'><a>"+i+"</a></li>");
		}else {
			$pageDiv.append("<li class='"+self.divIdStart+"_pageNum' id='"+self.divIdStart+"_"+i+"'><a>"+i+"</a></li>");
		}
	}

	if(self.options.currentPage<self.pageCount){
		var $lastPage = $("<li><a id='"+self.divIdStart+"_lastPage'>&raquo;</a></li>");
		var $downPage = $("<li><a id='"+self.divIdStart+"_next'>&gt;</a></li>");
	}else{
		var $lastPage = $("<li class='loseBut'><a>&raquo;</a></li>");
		var $downPage = $("<li class='loseBut'><a>&gt;</a></li>");
	}
	$pageDiv.append($downPage).append($lastPage);
	
	$div.append($pageDiv).append($pageSize);
	$(self.options.appendTo).append($div);

};

crm.page.prototype.writeCss = function(){
	var self = this;
	$(".loseBut").css({"opacity":0.5,"font-color":'#999999',"cursor":'default'});
	$("#"+this.divIdStart+"_pageSizeInput").hide();
	if(self.options.dataList){
		$("#"+this.divIdStart+"_list").css({"margin":"0 auto"});
		$("#"+this.divIdStart+"_label").css({"font-size": '12px',"text-align":'center',"line-height":'30px',"border-radius": "5px 5px 0px 0px"});
		$("#"+this.divIdStart+"_pageSize").css({"margin": "5px","font-size":"13px","height":"30px","width":"60px","display": "inline"});
	}else{
		$("#"+this.divIdStart+"_list").css({"float":"left","position":"relative","margin":"0px"});
		$("#"+this.divIdStart+"_label").css({"width":'220px',"float":'left',"font-size": '16px',"text-align":'center',"line-height":'34px',"border-radius": "5px 5px 0px 0px"});
		$("#"+this.divIdStart+"_pageSize").css({"margin": "5px","font-size":"16px","height":"30px","width":"65px","display": "inline"});
	}
	$("#"+this.divIdStart+"_submit").css({"display": "inline","margin-right": "8px"});
};

crm.page.prototype.bindEvent = function(){
	var self = this;
	$("#"+self.divIdStart+"_firstPage").click(function(){
		self.options.currentPage = 1;
		self.isQueryCount?self.initPage():self.refreshPage();
	});
	
	$("#"+self.divIdStart+"_lastPage").click(function(){
		self.options.currentPage = eval(self.pageCount);
		self.isQueryCount?self.initPage():self.refreshPage();
	});
	
	$("#"+self.divIdStart+"_prev").click(function(){
		if(self.options.currentPage<=1){
			crm.tip.info("已经是第一页了");
			return true;
		}
		--self.options.currentPage;
		self.isQueryCount?self.initPage():self.refreshPage();
	});

	$("#"+self.divIdStart+"_next").click(function(){
		if(self.options.currentPage >= self.pageCount){
			crm.tip.info("已经是最后一页");
			return true;
		}
		++self.options.currentPage;
		self.isQueryCount?self.initPage():self.refreshPage();
	});
	
	$("."+self.divIdStart+"_pageNum a").click(function(){
		self.options.currentPage = eval($(this).html());
		self.isQueryCount?self.initPage():self.refreshPage();
	});
	
	$("#"+self.divIdStart+"_submit").click(function(){
		self.setPageSize($("#"+self.divIdStart+"_pageSize").val());
	});
	
	if(self.options.dataList){
		
	}else{
		$("#"+self.divIdStart+"_label").mouseover(function(){
		$("#"+self.divIdStart+"_label").css({'background-color':'white','border': '1px solid #DDDDDD'});
		$("#"+self.divIdStart+"_list").css({'top':45,"height":"33px"});
		$("#"+self.divIdStart+"_rl").css({opacity:'.2'});
		$("#"+self.divIdStart+"_rp").css({opacity:'.2'});
		$("#"+self.divIdStart+"_pageSizeInput").show();
		$("#"+self.divIdStart+"_pageSize").focus();
	});

	$("#"+self.divIdStart+"_label").mouseout(function(){
		$("#"+self.divIdStart+"_label").css({'background-color':'','border': '0px solid #DDDDDD',"line-height":"30px"});
		$("#"+self.divIdStart+"_list").css({'top':1,"height":"33px"});
		$("#"+self.divIdStart+"_rl").css({opacity:'1'});
		$("#"+self.divIdStart+"_rp").css({opacity:'1'});
		$("#"+self.divIdStart+"_pageSizeInput").hide();
	});
	}
	$("#"+self.divIdStart+"_pageSizeInput").keydown(function(event){
		if(event.keyCode == 13){
			self.setPageSize($("#"+self.divIdStart+"_pageSize").val());
			return false;
		}
	});
	$("#"+self.divIdStart+"_pageSize").keyup(function(event){
		this.value=this.value.replace(/[^\d]/ig,'');
	});
};
crm.page.prototype.setPageSize = function(length){
	var self = this;
	if(length>0&&length<1000){
		self.options.currentPage = 1;
		self.options.pageSize = eval(length);
		self.isQueryCount?self.initPage():self.refreshPage();
	}else{
		crm.tip.info("超出范围（最小1，最大1000）");
	}
};
crm.page.prototype.getPageSize = function(){
	return this.options.pageSize;
};
crm.page.prototype.setRecordCount = function(recordCount){
	$("#"+this.divIdStart+"_rl").html("总数:"+recordCount);
	this.recordCount = recordCount;
};
crm.page.prototype.setDataurl = function(dataurl){
	this.options.dataurl = dataurl;
};
crm.page.prototype.getDataurl = function(dataurl){
	return this.options.dataurl;
};
crm.page.prototype.getRecordCount = function(){
	return this.recordCount;
};
crm.page.prototype.getPageCount = function(){
	var pageCount = Math.floor((eval(this.recordCount)+eval(this.options.pageSize)-1)/eval(this.options.pageSize));
	if(pageCount == 0)pageCount = 1;
	return pageCount;
};
crm.page.prototype.setPageCount = function(pageCount){
	this.pageCount = pageCount<1?1:pageCount;
};
crm.page.prototype.getLimit = function(){
	var self = this;
	if(self.options.dataList){
		return this.options.pageSize;
	}else{
		return this.options.pageSize+eval(this.getStart());
	}
};
crm.page.prototype.getStart = function(){
	this.options.currentPage<1?this.options.currentPage = 1:null;
	return (this.options.currentPage-1)*this.options.pageSize;
};
crm.page.prototype.setIsQueryCount = function(isQueryCount){
	this.isQueryCount = isQueryCount;
};
crm.page.prototype.getIsQueryCount = function(){
	return this.isQueryCount;
};
crm.page.prototype.setCurrentPage = function(currentPage){
	this.options.currentPage = currentPage<1?1:currentPage;
};
crm.page.prototype.getCurrentPage = function(){
	return this.options.currentPage;
};
crm.page.prototype.setParams = function(params){
	this.options.params = params;
};
crm.page.prototype.onLoadDataEnd = function(loadDataEndBack){
	this.loadDataEndBack = loadDataEndBack;
};
crm.page.prototype.onLoadDataBefore = function(loadDataBeforBack){
	this.loadDataBeforBack = loadDataBeforBack;
};
crm.page.prototype.options = {
	appendTo:'',
	currentPage:1,
	params:{},
	pageSize:10,
	dataurl:"",
	countUrl:"",
	pageButCount:10
};