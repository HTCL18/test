//jqgrid公共翻页方法 
function doSearch(pgbutton){
	var rowNum = jQuery("#gridlist").jqGrid('getGridParam','rowNum');
 	var page = jQuery("#gridlist").jqGrid('getGridParam','page');
 	var sortname = jQuery("#gridlist").jqGrid('getGridParam','sortname');
 	var sortorder = jQuery("#gridlist").jqGrid('getGridParam','sortorder');
 	var total = jQuery("#gridlist").jqGrid('getGridParam','lastpage');
 	jQuery("#page").val(page);
 	jQuery("#rows").val(rowNum);
 	jQuery("#sidx").val(sortname);
 	jQuery("#sord").val(sortorder);				
	if(pgbutton=="next_gridpager"){
		page++;
	}else if(pgbutton=="prev_gridpager"){
		page--;
	}else if(pgbutton=="first_gridpager"){
		page=1;
	}else if(pgbutton=="last_gridpager"){
		page=total;
	}else{
		return '';
	}
 	jQuery("#gridlist").setGridParam({
 		rowNum:rowNum,
 		page:page
 		
 	}).trigger("reloadGrid");
}