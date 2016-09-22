crm.grid = {};
crm.grid.createJqGrid = function(tableId){
	var self = this;
	this.tableId = tableId;
	/**
	 * colModel是个Array  对象格式crm.grid.createJqGrid.prototype.colModeloptions
	 */
	this.colModel = new Array();
	this.height = null;
	this.colNames = new Array();
};

crm.grid.createJqGrid.prototype.options = {
		rowNum:20,
		multiselect: true,//定义是否有选择框
		autowidth: true,//使表格宽度能够自动调整
		onSelectAll:null,//(aRowids,status) 此事件发生在点击标题的复选框时发生（multiselect为true） aRowids 选定行ID的数组status 头复选框的选定的布尔值，true为选中，false为未选中
		onSelectRow:null
};

crm.grid.createJqGrid.prototype.colModeloptions = {
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
 * 配置grid项  options
 * @param param
 */
crm.grid.createJqGrid.prototype.setTableAttribute = function(param){
	var self = this;
	self.options = $.extend({},self.options,param);
};

crm.grid.createJqGrid.prototype.setTHead = function(headArray){
	this.colNames = headArray;
};

crm.grid.createJqGrid.prototype.setHeight = function(height){
	this.height = height;
};

crm.grid.createJqGrid.prototype.addColModel = function(param){
	var self = this;
	self.colModel.push($.extend({},self.colModeloptions,param));
};

crm.grid.createJqGrid.prototype.setGridMultiselect = function(multiselect){
	var self = this;
	self.options.multiselect = multiselect;
};

crm.grid.createJqGrid.prototype.jqGrid = function(params){
	var self = this;
	self.options = $.extend({},self.options,params);
	jQuery("#"+self.tableId).jqGrid(self.options);
};

crm.grid.createJqGrid.prototype.loadDataForJqGrid = function(data){
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

crm.grid.createJqGrid.prototype.getJqGrid = function(){
	return jQuery("#"+this.tableId);
};
/**
 * 重新加载数据
 * @param data
 */
crm.grid.createJqGrid.prototype.reloadGrid = function(data){
	jQuery("#"+this.tableId).setGridParam({data:data, datatype: "local"}).trigger("reloadGrid");
};

crm.grid.createJqGrid.prototype.setPageSize = function(rowNum){
	return jQuery("#"+this.tableId).setGridParam({rowNum:rowNum});
};
crm.grid.createJqGrid.prototype.refreshNumber = function(startIndex,cellName){
	for(var i = 1;i<=this.getRowNum();i++){
		var rowId= jQuery("#"+this.tableId)[0].rows[i].id;
		this.setCell(rowId,cellName, i+startIndex);
	}
};
crm.grid.createJqGrid.prototype.getRowNum = function(){
	return jQuery("#"+this.tableId).find("tr").length-1;
};