crm.grid1 = {};
crm.grid1.createGrid = function(tableId){
	var self = this;
	var options = {
			tableId:tableId
	};
	self.options = $.extend({},self.options,options);
};
crm.grid1.createGrid.prototype.options = {
	tableId : null
};
crm.grid1.createGrid.prototype.rowOptions = {
		rowId:null,//tr 属性 id
		style:null,//tr 属性style
		className:null,//tr 属性class
		align:null,//tr 属性align
		valign:null,//tr 属性valign
		title:null,//tr 属性title
		onclick:null,//tr 事件 onclick
		ondblclick:null,//tr 事件ondblclick
		onmouseover:null,//tr 事件onmouseover
		onmouseout:null,//tr 事件onmouseout
		cells:[]//td数组[]  数组项为crm.grid1.createGrid.prototype.cellOptions格式的json对象
};
crm.grid1.createGrid.prototype.cellOptions = {
		cellId:null, //td 属性id
		celltext:null, //td 显示文本
		style:null,//td 属性style
		className:null,//td 属性class
		align:null,//td 属性align
		valign:null,//td 属性valign
		title:null,//td 属性title
		onclick:null,//td 事件 onclick
		ondblclick:null,//td 事件ondblclick
		onmouseover:null,//td 事件onmouseover
		onmouseout:null//td 事件onmouseout
};
crm.grid1.createGrid.prototype.getTableId = function(){
	return this.options.tableId;
};
/**
 * 设置table单击选中行
 */
crm.grid1.createGrid.prototype.tableOnclickSelectRow = function(){
	var self = this;
	$("#"+this.options.tableId +" tbody tr").each(function(){
		$(this).bind("click",function(){
			self.selectRow($(this).attr("id"));
		});
	});
};
/**
 * 
 * @param data json格式数据
 * rowIdObjName  rowId对应的对象属性名
	cellObjArray  cell对象信息数组 [{cellId:"",celltext:"",style:""...}...]  格式同cellOptions
 * 
 */
crm.grid1.createGrid.prototype.loadJSONObject = function(data,rowIdObjName,cellObjArray,rowParams){
	if(data){
		this.clearAll();
		for(var d=0;d<data.length;d++){
			var cells = new Array();
			if(cellObjArray){
				for(var i=0;i<cellObjArray.length;i++){
					var cellParams = $.extend({},this.cellOptions,cellObjArray[i]);
					var cellValue = (data[d][cellObjArray[i].celltext]?data[d][cellObjArray[i].celltext]:cellObjArray[i].celltext);
					cellParams.celltext = cellValue;
					if(cellObjArray[i].cellId){
						cellParams.cellId=(data[d][cellObjArray[i].cellId]?data[d][cellObjArray[i].cellId]:cellObjArray[i].cellId);
					}
					cells.push(cellParams);
				}
			}
			var row = {
					rowId:data[d][rowIdObjName],
					cells:cells
			};
			if(rowParams)
				row = $.extend({},row,rowParams);
			this.addLastRow(row);
		}
	}
};
/**
 * url  请求地址
 * param 请求参数
 * rowIdObjName  rowId对应的对象属性名
	cellObjArray  ell对象信息数组 [{cellId,celltext}]
 * callBack  回掉函数
 */
crm.grid1.createGrid.prototype.loadJSON = function(url,param,rowIdObjName,cellObjArray,rowParams,callBack){
	var self = this;
	crm.ajax.postNormal(url,param,function(resultData){
		var data = resultData;
		if(resultData.constructor != Array && resultData.datas != null && resultData.pageNo != null) //分页数据
			data = resultData.datas;
		if(data && !data.expName){
			self.loadJSONObject(data,rowIdObjName,cellObjArray,rowParams);
		}
		if(callBack)
			callBack(data);
	},"json");
};

/**
 * 新增一行
 * params 格式同crm.grid1.createGrid.prototype.rowOptions
 * ind 插入位置
 */
crm.grid1.createGrid.prototype.addRow = function(params, ind){
	var self = this;
	self.rowOptions = $.extend({},self.rowOptions,params);
	var $tr = $('<tr id="'+self.rowOptions.rowId+'"'
			+(self.rowOptions.style?' style="'+self.rowOptions.style+'"':'')
			+(self.rowOptions.className?' class="'+self.rowOptions.className+'"':'')
			+(self.rowOptions.align?' align="'+self.rowOptions.align+'"':'')
			+(self.rowOptions.valign?' valign="'+self.rowOptions.valign+'"':'')
			+(self.rowOptions.title?' title="'+self.rowOptions.title+'"':'')
			+'></tr>');
	var tr = '<tr id="'+self.rowOptions.rowId+'"'
			+(self.rowOptions.style?' style="'+self.rowOptions.style+'"':'')
			+(self.rowOptions.className?' class="'+self.rowOptions.className+'"':'')
			+(self.rowOptions.align?' align="'+self.rowOptions.align+'"':'')
			+(self.rowOptions.valign?' valign="'+self.rowOptions.valign+'"':'')
			+(self.rowOptions.title?' title="'+self.rowOptions.title+'"':'')
			+'></tr>';
	if(self.rowOptions.onclick){
		$tr.bind("click",function(){
			self.rowOptions.onclick($(this).attr('id'));
		});
	}
	if(self.rowOptions.ondblclick){
		$tr.bind("dblclick",function(){
			self.rowOptions.ondblclick($(this).attr('id'));
		});
	}
	if(self.rowOptions.onmouseover){
		$tr.bind("mouseover",function(){
			self.rowOptions.onmouseover($(this).attr('id'));
		});
	}
	if(self.rowOptions.onmouseout){
		$tr.bind("mouseout",function(){
			self.rowOptions.onmouseout($(this).attr('id'));
		});
	}
	$.each(self.rowOptions.cells,function(i){
		var cell = $.extend({},self.cellOptions,self.rowOptions.cells[i]);
		$td = $('<td'
				+(cell.cellId?' id="'+cell.cellId+'"':'')
				+(cell.style?' style="'+cell.style+'"':'')
				+(cell.className?' class="'+cell.className+'"':'')
				+(cell.align?' align="'+cell.align+'"':'')
				+(cell.valign?' valign="'+cell.valign+'"':'')
				+(cell.title?' title="'+cell.title+'"':'')
				+'>' + cell.celltext + '</td>');
		if(cell.onclick){
			$td.bind("click",function(){
				cell.onclick();
			});
		}
		if(cell.ondblclick){
			$td.bind("dblclick",function(){
				cell.ondblclick();
			});
		}
		if(cell.onmouseover){
			$td.bind("mouseover",function(){
				cell.onmouseover();
			});
		}
		if(cell.onmouseout){
			$td.bind("mouseout",function(){
				cell.onmouseout();
			});
		}
		$tr.append($td);
	});
	if(self.getColsNum() > self.rowOptions.cells.length){
		for(var i=0;i<self.getColsNum()-self.rowOptions.cells.length;i++){
			$tr.append($('<td ></td>'));
		}
	}
	
	if(!ind){
		$("#" + self.options.tableId + ">tbody").append($tr);
	}else if(ind == "0"){
		$("#" + self.options.tableId + ">tbody").prepend($tr);
	}else{
		//$("#userList >tbody > tr:eq("+ind+")").append($tr);
	}
	
	self.row(self.rowOptions.rowId).click(function(rowId){
		self.selectRow(rowId);
	});
};
/**
 * 新增到第一行
 * params 格式同crm.grid1.createGrid.prototype.rowOptions
 */
crm.grid1.createGrid.prototype.addFirstRow = function(params){
	this.addRow(params, "0");
};
/**
 * 新增到最后一行
 * params 格式同crm.grid1.createGrid.prototype.rowOptions
 */
crm.grid1.createGrid.prototype.addLastRow = function(params){
	this.addRow(params);
};
/**
 * 删除一行
 */
crm.grid1.createGrid.prototype.deleteRow = function(rowId){
	$("#" + this.options.tableId ).children().find("#"+rowId).remove();
};
/**
 * 选中一行
 */
crm.grid1.createGrid.prototype.selectRow = function(rowId){
	$("#" + this.options.tableId +" tbody tr").each(function(){
		$(this).removeClass("table-selectrow");
	});
	$("#" + this.options.tableId ).children().find("#"+rowId).addClass("table-selectrow");
};
/**
 * 删除选中行
 */
crm.grid1.createGrid.prototype.deleteSelectedRow = function(){
	$("#" + this.options.tableId ).children().find(".table-selectrow").remove();
};
/**
 * 获取选中行Id
 */
crm.grid1.createGrid.prototype.getSelectedRowId = function(){
	return $("#" + this.options.tableId ).children().find(".table-selectrow").attr("id");
};
/**
 * 显示行
 */
crm.grid1.createGrid.prototype.showRow = function(rowId){
	$("#" + this.options.tableId ).children().find("#"+rowId).show();
};
/**
 * 隐藏行
 */
crm.grid1.createGrid.prototype.hideRow = function(rowId){
	$("#" + this.options.tableId ).children().find("#"+rowId).hide();
};
/**
 * 获取table中所有行id数组
 **/
crm.grid1.createGrid.prototype.getAllRowIds = function(){
	var ids = new Array();
	$("#" + this.options.tableId +" tbody tr").each(function(){
		ids.push($(this).attr("id"));
	});
	return ids;
};
/**
 * 获取行总数
 */
crm.grid1.createGrid.prototype.getRowsNum = function(){
	return $("#" + this.options.tableId +" tbody tr").length;
};
/**
 * 获取列总数
 */
crm.grid1.createGrid.prototype.getColsNum = function(){
	return $("#"+this.options.tableId+" th").length;
};
/**
 * 清空所有行
 */
crm.grid1.createGrid.prototype.clearAll = function(){
	$("#"+this.options.tableId +" tbody tr").remove();
};
/**
 * table不选中任何行
 */
crm.grid1.createGrid.prototype.clearSelection = function(){
	$("#" + this.options.tableId ).children().find(".table-selectrow").removeClass("table-selectrow");
};
/**
 * 根据查询条件过滤表格
 * @param searchStr 查询条件
 * @param cellIndex 过滤条件依据列号 列从0 开始
 */
crm.grid1.createGrid.prototype.search = function(searchStr,cellIndex){
	var self = this;
	$("#"+this.options.tableId+" tbody tr").each(function (){
		var cellValue = self.cell($(this).attr("id"),cellIndex).getValue();
		if(cellValue && cellValue.indexOf(searchStr)!=-1){
			$(this).show();
		}else{
			$(this).hide();
		}
	});
};
/**
 * 获取row对象
 */
crm.grid1.createGrid.prototype.row = function(rowId){
	var options = {
			tableId:this.options.tableId,
			rowId:rowId
		};
	return new crm.grid1.row(options);
};
/**
 * 获取cell对象
 */
crm.grid1.createGrid.prototype.cell = function(rowId,col){
	var options = {
			tableId:this.options.tableId,
			rowId:rowId,
			col:col
			};
	return new crm.grid1.cell(options);
};

/**row start**/
crm.grid1.row = function(params){
	var self = this;
	self.options = $.extend({},self.options,params);
};
crm.grid1.row.prototype.options = {
	tableId : null,
	rowId : null
};
/**
 * 为tr绑定事件
 */
crm.grid1.row.prototype.attachEvent = function(evName,callBack){
	var self = this;
	$("#" + self.options.tableId ).children().find("#"+self.options.rowId).bind(evName,function(){
		callBack(self.options.rowId);
	});
};
crm.grid1.row.prototype.click = function(callBack){
	var self = this;
	self.attachEvent("click", callBack);
};
/**
 * 为tr添加class一个或多个class  多个calss使用空格分隔类名
 */
crm.grid1.row.prototype.addClass = function(className){
	$("#" + this.options.tableId ).children().find("#"+this.options.rowId).addClass(className);
};
/**
 * 删除tr的class中一个或多个class  多个calss使用空格分隔类名
 */
crm.grid1.row.prototype.removeClass = function(className){
	$("#" + this.options.tableId ).children().find("#"+this.options.rowId).removeClass(className);
};
/**
 * 修改tr元素的style
 * style json格式
 * 		{"name":"value",
 * 		 "name2":"value2",
 * 		....
 * 		}
 * 		name：属性名 eg："color"，value：属性值 eg:"red"；如果value为空字符串值""，则从元素中删除name属性
 */
crm.grid1.row.prototype.modifyStyle = function(style){
	$("#" + this.options.tableId ).children().find("#"+this.options.rowId).css(style);
};
/**
 * 设置或返回被选元素的属性值
 * attrName  属性名
 * value  属性值；为空时返回属性值，不为空时设置属性值
 */
crm.grid1.row.prototype.attr = function(attrName,value){
	if(value)
		$("#" + this.options.tableId ).children().find("#"+this.options.rowId).attr(attrName,value);
	else return $("#" + this.options.tableId ).children().find("#"+this.options.rowId).attr(attrName);
};
/**row end**/

/**cell start**/
/**
 * 定义cell对象
 */
crm.grid1.cell = function(params){
	var self = this;
	self.options = $.extend({},self.options,params);
};
crm.grid1.cell.prototype.options = {
	tableId : null,
	rowId : null,
	col : null//列序号  从0开始
};
/**
 * 获取cell文本值
 */
crm.grid1.cell.prototype.getValue = function(){
	return $("#" + this.options.tableId ).children().find("#"+this.options.rowId+ " > td:eq("+this.options.col+")").html();
};
/**
 * 设置cell文本值
 */
crm.grid1.cell.prototype.setValue = function(value){
	$("#" + this.options.tableId ).children().find("#"+this.options.rowId+ " > td:eq("+this.options.col+")").html(value);
};
/**
 * 为td绑定事件
 */
crm.grid1.cell.prototype.attachEvent = function(evName,callBack){
	var self = this;
	$("#" + this.options.tableId ).children().find("#"+this.options.rowId+ " > td:eq("+this.options.col+")").bind(evName,function(){
		callBack(self.options.rowId,self.options.col);
	});
};
/**
 * 为td添加class一个或多个class  多个calss使用空格分隔类名
 */
crm.grid1.cell.prototype.addClass = function(className){
	$("#" + this.options.tableId ).children().find("#"+this.options.rowId+ " > td:eq("+this.options.col+")").addClass(className);
};
/**
 * 删除td的class中一个或多个class  多个calss使用空格分隔类名
 */
crm.grid1.cell.prototype.removeClass = function(className){
	$("#" + this.options.tableId ).children().find("#"+this.options.rowId+ " > td:eq("+this.options.col+")").removeClass(className);
};
/**
 * 修改td元素的style
 * style json格式
 * 		{"name":"value",
 * 		 "name2":"value2",
 * 		....
 * 		}
 * 		name：属性名 eg："color"，value：属性值 eg:"red"；如果value为空字符串值，则从元素中删除name属性
 */
crm.grid1.cell.prototype.modifyStyle = function(style){
	$("#" + this.options.tableId ).children().find("#"+this.options.rowId+ " > td:eq("+this.options.col+")").css(style);
};
/**
 * 设置或返回被选元素的属性值
 * attrName  属性名
 * value  属性值；为空时返回属性值，不为空时设置属性值
 */
crm.grid1.cell.prototype.attr = function(attrName,value){
	if(value)
		$("#" + this.options.tableId ).children().find("#"+this.options.rowId+ " > td:eq("+this.options.col+")").attr(attrName,value);
	else return $("#" + this.options.tableId ).children().find("#"+this.options.rowId+ " > td:eq("+this.options.col+")").attr(attrName);
};
/**cell end**/


/**table行事件 start**/
crm.grid1.createGrid.prototype.eventOptions = {
	onRowDblClicked:null,//双击tr事件
	onRowClicked:null,//单击tr事件
	onMousemove:null,//鼠标进入tr事件
	onMouseout:null//鼠标离开tr事件
};
/**
 * 为table绑定事件
 */
crm.grid1.createGrid.prototype.attachEvent = function(params){
	var self = this;
	self.eventOptions = $.extend({},self.eventOptions,params);
	if(self.eventOptions.onRowClicked){
		$("#"+this.options.tableId +" tbody").on("click","tr",function(){
			self.eventOptions.onRowClicked($(this).attr("id"));
		});
	}
	if(self.eventOptions.onRowDblClicked){
		$("#"+this.options.tableId +" tbody").on("dblclick","tr",function(){
			self.eventOptions.onRowDblClicked($(this).attr("id"));
		});
	}
	if(self.eventOptions.onMousemove){
		$("#"+this.options.tableId +" tbody").on("mousemove","tr",function(){
			self.eventOptions.onMousemove($(this).attr("id"));
		});
	}
	if(self.eventOptions.onMouseout){
		$("#"+this.options.tableId +" tbody").on("mouseout","tr",function(){
			self.eventOptions.onMouseout($(this).attr("id"));
		});
	}
};
/**
 * table绑定单击行事件
 */
crm.grid1.createGrid.prototype.onclickRow = function(callBack){
	var param = {
			onRowClicked:callBack?callBack:null
	};
	this.attachEvent(param);
};
/**
 * table绑定双击行事件
 */
crm.grid1.createGrid.prototype.onDblclickRow = function(callBack){
	var param = {
			onRowDblClicked:callBack?callBack:null
	};
	this.attachEvent(param);
};
/**
 * table绑定鼠标进入行事件
 */
crm.grid1.createGrid.prototype.onMousemoveRow = function(callBack){
	var param = {
			onMousemove:callBack?callBack:null
	};
	this.attachEvent(param);
};
/**
 * table绑定鼠标移出行事件
 */
crm.grid1.createGrid.prototype.onMouseoutRow = function(callBack){
	var param = {
			onMouseout:callBack?callBack:null
	};
	this.attachEvent(param);
};
/**table行事件 end**/

crm.grid1.createJqGrid = function(tableId){
	var self = this;
	this.tableId = tableId;
	/**
	 * colModel是个Array  对象格式crm.grid1.createJqGrid.prototype.colModeloptions
	 */

	this.colModel = new Array();
	this.height = null;
	this.colNames = new Array();
};

crm.grid1.createJqGrid.prototype.options = {
		datatype:"json",
		rowNum:20,
		altRows:true,//设置表格是否允许行交替变色值
		multiselect: true,//定义是否有选择框
		multiboxonly: false,//单选
		autowidth: true,//使表格宽度能够自动调整
		sortname:null,
		sortorder:"desc",//排序 desc：降序  asc 升序
		onSortCol:null,
		ondblClickRow:null,
		onSelectAll:null,//(aRowids,status) 此事件发生在点击标题的复选框时发生（multiselect为true） aRowids 选定行ID的数组status 头复选框的选定的布尔值，true为选中，false为未选中
		onSelectRow:null
};

crm.grid1.createJqGrid.prototype.colModeloptions = {
		key:false,//设置此列为行id
		name:null,//列显示的名称
		index:null,//用来排序用的列名称
		width:null,//列宽度
		align:"left",//对齐方式
		sortable:true,//是否可以排序
		hidden:false,//是否隐藏
		classes:null
};

/**
 * 配置grid1项  options
 * @param param
 */
crm.grid1.createJqGrid.prototype.setTableAttribute = function(param){
	var self = this;
	self.options = $.extend({},self.options,param);
};

crm.grid1.createJqGrid.prototype.setTHead = function(headArray){
	this.colNames = headArray;
};

crm.grid1.createJqGrid.prototype.setHeight = function(height){
	this.height = height;
};

crm.grid1.createJqGrid.prototype.addColModel = function(param){
	var self = this;
	self.colModel.push($.extend({},self.colModeloptions,param));
};

crm.grid1.createJqGrid.prototype.setGridMultiselect = function(multiselect){
	var self = this;
	self.options.multiselect = multiselect;
};
crm.grid1.createJqGrid.prototype.ondblClickRow = function(ondblClickRow){
	var self = this;
	self.options.ondblClickRow = ondblClickRow;
};
crm.grid1.createJqGrid.prototype.onclickRow = function(onclickRow){
	var self = this;
	self.options.onSelectRow = onclickRow;
};

crm.grid1.createJqGrid.prototype.jqGrid = function(params){
	var self = this;
	self.options = $.extend({},self.options,params);
	jQuery("#"+self.tableId).jqGrid(self.options);
};

crm.grid1.createJqGrid.prototype.loadDataForJqGrid = function(data){
	var self = this;
	var options = {
		data: eval(data),
		datatype: "local",
		height: self.height,
		colNames:eval(self.colNames),
		colModel:eval(self.colModel),
		altRows: self.options.altRows,
		multiselect: self.options.multiselect,
		multiboxonly: self.options.multiboxonly,
		autowidth: self.options.autowidth
	 };
	this.jqGrid(options);
};

crm.grid1.createJqGrid.prototype.getJqGrid = function(){
	return jQuery("#"+this.tableId);
};
/**
 * 重新加载数据
 * @param data
 */
crm.grid1.createJqGrid.prototype.reloadGrid = function(data){
	jQuery("#"+this.tableId).setGridParam({data:data, datatype: "local"}).trigger("reloadGrid");
};

crm.grid1.createJqGrid.prototype.setPageSize = function(rowNum){
	return jQuery("#"+this.tableId).setGridParam({rowNum:rowNum});
};

/**
 * data  {name:value} name是colModel中列name value值
 */
crm.grid1.createJqGrid.prototype.addFirstRow = function(rowId,data){
	return jQuery("#"+this.tableId).addRowData(rowId,data, "first");
};

crm.grid1.createJqGrid.prototype.addLastRow = function(rowId,data){
	return jQuery("#"+this.tableId).addRowData(rowId,data, "last");
};

crm.grid1.createJqGrid.prototype.deleteRow = function(rowId){
	return jQuery("#"+this.tableId).delRowData(rowId);
};

crm.grid1.createJqGrid.prototype.updateRow = function(rowId,data){
	return jQuery("#"+this.tableId).setRowData(rowId,data);
};
/**
 * 获取选中行
 * @param data
 * @returns
 */
crm.grid1.createJqGrid.prototype.getSelectRowId = function(){
	return jQuery("#"+this.tableId).getGridParam("selectrow");
};

/**
 * 获取选中行
 * @param data
 * @returns
 */
crm.grid1.createJqGrid.prototype.selectRow = function(rowId){
	$("#" + this.tableId ).children().find("#"+rowId).addClass("table-selectrow");
};

/**
 * 获取选中行Id
 */
crm.grid1.createJqGrid.prototype.getSelectedRowId = function(){
	var selectObj =  $("#" + this.tableId ).children().find(".table-selectrow");
	var selectId = new Array();
	$.each(selectObj,function(i,obj){
		selectId.push($(obj).attr("id"));
	})
	return selectId;
};

/**
 * table不选中任何行
 */
crm.grid1.createJqGrid.prototype.clearSelection = function(){
	jQuery("#"+this.tableId).resetSelection();
};

/**
 * 返回checked行的rowId 是个数组 Array类型的
 * @param data
 * @returns
 */
crm.grid1.createJqGrid.prototype.getCheckRowId = function(){
	return jQuery("#"+this.tableId).getGridParam("selarrrow");
};

crm.grid1.createJqGrid.prototype.getRowNum = function(){
	return jQuery("#"+this.tableId).find("tr").length-1;
};
/**
 * 修改单元格的值
 * @param rowId 行ID
 * @param colname colname为列名（可以是从0开始的列的索引值）
 * @param value 设置的内容
 * @returns
 */
crm.grid1.createJqGrid.prototype.setCell = function(rowId, colname, value){
	return jQuery("#"+this.tableId).setCell(rowId,colname,value);
};

/**
 * 返回id = rowid行，column = iCol列的内容
 * @param rowId
 * @param iCol  iCol可以是列的索引或colName中定义的名称
 * @returns
 */
crm.grid1.createJqGrid.prototype.getCell = function(rowId, iCol){
	return jQuery("#"+this.tableId).getCell(rowId,iCol);
};

crm.grid1.createJqGrid.prototype.hideRow = function(rowId){
	$("#"+this.tableId).children().find("#"+rowId).hide();
};

crm.grid1.createJqGrid.prototype.showRow = function(rowId){
	$("#"+this.tableId).children().find("#"+rowId).show();
};
crm.grid1.createJqGrid.prototype.getRowId = function(rowInd){
	var ids = $("#"+this.tableId).getDataIDs();
	for(var i=0;i<ids.length;i++){
		if($("#"+this.tableId).getInd(ids[i]) == rowInd){
			return ids[i];
		}
	}
};
crm.grid1.createJqGrid.prototype.refreshNumber = function(startIndex,cellName){
	for(var i = 1;i<=this.getRowNum();i++){
		var rowId= jQuery("#"+this.tableId)[0].rows[i].id;
		this.setCell(rowId,cellName, i+startIndex);
	}
};
/**
* 根据查询条件过滤表格
* @param searchStr 查询条件
* @param cellIndex 过滤条件依据列号 列从0 开始
*/
crm.grid1.createJqGrid.prototype.search = function(searchStr,cInd){
	var self = this;
	$("#"+this.tableId+" tbody tr").each(function (){
		if($(this).attr("id")){
			var cellValue = jQuery("#"+self.tableId).getCell($(this).attr("id"),cInd);
			if(cellValue && cellValue.indexOf(searchStr)!=-1){
				$(this).show();
			}else{
				$(this).hide();
			}
		}
	});
};

/**
 * 获取table中所有行id数组
 **/
crm.grid1.createJqGrid.prototype.getAllRowIds = function(){
	var ids = new Array();
	$("#"+this.tableId+" tbody tr").each(function (){
		if($(this).attr("id")){
			ids.push($(this).attr("id"));
		}
	});
	return ids;
};

/**
 * 移动行
 * @param selectRowId
 * @param direction  up:上移；down:下移
 */
crm.grid1.createJqGrid.prototype.moveRow = function(selectRowId,direction){
	var selectRowInd = $("#"+this.tableId).getInd(selectRowId);
	var relativeRowId;
	if(direction == "up"){
		relativeRowId = this.getRowId(selectRowInd - 1);
	}else if(direction == "down"){
		relativeRowId = this.getRowId(selectRowInd + 1);
	}
	
	var data = $("#"+this.tableId).getGridParam("data");
	var selectInd,relativeInd;
	var selectRow,relativeRow;
	for(var i=0;i<data.length;i++){
		if(data[i].userMainId == selectRowId) {selectRow = data[i];selectInd=i;}
		if(data[i].userMainId == relativeRowId) {relativeRow = data[i];relativeInd=i};
	}
	data[selectInd] = relativeRow;
	data[relativeInd] = selectRow;
	this.reloadGrid($("#"+this.tableId).getGridParam("data"));
};
