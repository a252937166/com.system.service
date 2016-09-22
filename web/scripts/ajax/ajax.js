var ajax = function(_url,_params,_fun){
	$.ajax({
		type:'post',
		url:_url,
		data:_params,
		dataType:'json',
		success:function(data){
			_fun.call(this,data);
		}
	});
};