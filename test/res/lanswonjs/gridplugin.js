function setGridColWidth(gridId, colName, width, c_width) {
	
	
	var $gridTable = jQuery("#" + gridId);
	var $col = $('#' + gridId + '_' + colName);

	if (!c_width)
		c_width = $gridTable.css("width").replace("px", "") * 1 + 10;

	$col.parent().parent().parent().css("width", c_width - 10);
	$gridTable.css("width", c_width - 10);

	$('#jqgh_' + gridId + '_' + colName).css("width", width);

	$col.css("width", (width + 5));

	var index = $col.parent().find("th").index($col);

	$('#' + gridId + ' tr:first td').eq(index).css("width", width + 5);
}

function autoGridColWidth(gridId, colName, minwidth, maxwidth, outFrame) {
	
	gridId=gridId.replace('#','');
	var $gridTable = jQuery("#" + gridId);
	var c_width = 0;
	var _width = 0;
	var frameWidth = 0;
	$gridTable.setGridParam().hideCol(colName);
	c_width = $gridTable.css("width").replace("px", "") * 1 + 10;
	if (outFrame)
		frameWidth = outFrame.css("width").replace("px", "");
	else
		frameWidth = window.innerWidth;
	if (minwidth) {

		_width = frameWidth - c_width;

		if (_width < minwidth)
			_width = minwidth;
		if (maxwidth && _width > maxwidth)
			_width = maxwidth;

		setGridColWidth(gridId, colName, _width, c_width);
		$gridTable.setGridParam().showCol(colName);
	}

	if (!minwidth && frameWidth > c_width) {
		_width = frameWidth - c_width;
		if (maxwidth && _width > maxwidth)
			_width = maxwidth;
//		if (_width < 0)
//			_width = -50;
		setGridColWidth(gridId, colName, _width, c_width);

		$gridTable.setGridParam().showCol(colName);
	}

	var f = function() {

		if (outFrame)
			frameWidth = outFrame.css("width").replace("px", "");
		else
			frameWidth = window.innerWidth;
		$gridTable.setGridParam().showCol(colName);
		var _width = frameWidth - c_width;
		if (minwidth && _width < minwidth)
			_width = minwidth;
		if (maxwidth && _width > maxwidth)
			_width = maxwidth;
//		if (!minwidth && _width < 0)
//			_width = -50;
		setGridColWidth(gridId, colName, _width, c_width);
	}

	if (!outFrame)
		window.addEventListener("resize", f);
	else {
		if (!$gridTable[0].autocol_interval)
			$gridTable[0].autocol_interval = setInterval(function() {
				f();
			}, 100);
	}
}

function autoGridWidth(gridId, autoDOM, colNames) {
	gridId='#'+gridId.replace('#','');
	

	
	var gridTable = $(gridId)[0];
	var temp=$(autoDOM).css("width").replace("px","");
	if(!gridTable.autogrid_interval)
		gridTable.autogrid_interval=setInterval(function() {
			temp=$(autoDOM).css("width").replace("px","");
			if (gridTable._width != temp) {
				
				if (typeof(colNames)!=='string')
					for (var i = 0; i < colNames.length; i++)
						$(gridTable).setGridParam().hideCol(colNames[i]);	
				else if(typeof(colNames)=='string'){
					$(gridTable).setGridParam().hideCol(colNames);		
				}
					
				else 
					return;
				$(gridTable).setGridWidth(temp);

				gridTable._width = temp;
			}
		}, 100);
}
