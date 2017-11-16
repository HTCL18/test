/*---------------------------从数据字典中查询出select需要的内容的方法-------------------------------  */
//diccode 表C_DICINDEX中的diccode对应值
//selName 页面中select元素的id
//defualtShow 中默认显示的内容
var token = sessionStorage.getItem("token");
//var url = "http://192.168.88.13:8888/OrientTDM/orientForm/getEnumCombobox.rdm";
var url = requestPath + "/orientForm/getEnumCombobox.rdm";    //依赖与config.js，使用时config.js必需先加载
function queryDic(diccode, selName, defualtShow) {
	var $sel = $("#" + selName);
	$sel.html('<option selected="selected" value="">' + defualtShow
			+ '</option>');
	$.ajax({
		type : "post",
		url : url,
		async : true,
		contentType : "application/x-www-form-urlencoded",
		data : {
			"restrictionId" : diccode
		},
		headers:{Authorization:'Orient '+token},
		dataType : "json",
		success : function(rs) {
			if(rs == null || rs == undefined){
				return;
			}
			var res = rs.results;
			if(res == "" || res == undefined){
				return;
			}
			var len_rs = res.length;
			var optHtml = "";
			for (i = 0; i < len_rs; i++) {
				optHtml += '<option value="' + res[i].id + '">'
						+ res[i].value + '</option>';
			}
			$sel.append($(optHtml));
		},
		error : function() {
			$sel.html('<option selected="selected" value="">' + defualtShow+ '</option>');
		}
	});
}

/**
 * 在编辑页面中加载数据字典
 * @param {Object} diccode 数据字典中对应的KEY值
 * @param {Object} selId select对应的ID
 * @param {Object} defualtShow 显示的默认值，对应的value为空字符串
 */
function queryDicInEdit(diccode,selId,defualtShow){
	var $sel = $("#" + selId);
	var optArr = $sel.find("option");
	var $opt = "";
	$opt.val = function(){return "";};
	$opt.text = function(){return "";};
	if(optArr!= undefined||optArr != null||optArr.length>0){
		$opt = optArr.eq(0);
	};
	if($opt == ""||$opt == undefined){
		$sel.html('<option selected="selected" value="">' + defualtShow + '</option>');
	}else{
		$sel.html('<option value="">' + defualtShow + '</option>');
	}
	
	$.ajax({
		type : "post",
		url : url,
		async : true,
		contentType : "application/x-www-form-urlencoded",
		data : {
			"restrictionId" : diccode
		},
		headers:{Authorization:'Orient '+token},
		dataType : "json",
		success : function(rs) {
			if(rs == null || rs == undefined){
				defualtShow = $opt.text()==""?defualtShow:$opt.text();
				$sel.html('<option value="'+$opt.val()+'">' + defualtShow + '</option>');
				return;
			}
			var res = rs.results;
			if(res == "" || res == undefined){
				defualtShow = $opt.text()==""?defualtShow:$opt.text();
				$sel.html('<option value="'+$opt.val()+'">' + defualtShow + '</option>');
				return;
			}
			var len_rs = res.length;
			var optHtml = "";
			for (i = 0; i < len_rs; i++) {
				if($opt != "" && res[i].id == $opt.val()){
					optHtml += '<option selected="selected" value="' + res[i].id + '">' + res[i].value + '</option>';
				}else{
					optHtml += '<option value="' + res[i].id + '">' + res[i].value + '</option>';
				}
			}
			$sel.append($(optHtml));
		},
		error : function() {
			defualtShow = $opt.text()==""?defualtShow:$opt.text();
			$sel.html('<option value="'+$opt.val()+'">' + defualtShow + '</option>');
		}
	});
};
