function w_Loadlayout(sizeLeft,minLeft, maxLeft) {//不是很明白做什么的一个自定义的jQuery插件
    if ($('.layout').length > 0) {
    	if(!sizeLeft)
    		sizeLeft=400;
    	if(!minLeft)
    		minLeft=150;
    	if(!maxLeft)
    		maxLeft=600;
    	
    	
        $("#layout").splitter({
            type: "v",
            outline: true,
            minLeft: minLeft, sizeLeft: sizeLeft, maxLeft: maxLeft,
            anchorToWindow: true,
            accessKey: "L",
            fixsize:true   
        });
    }
}

function w_openDialog(url, _id, _title, _width, _height, _ok,_cancel) {
	var f_ok=false;
	if(_ok){
		f_ok=function () {
			_ok(_id);
            return false;
        }
	}
	
    top.$.dialog({
        id: _id,
        width: _width,
        height: _height,
        max: false,
        lock: true,
        title: _title,
        resize: false,
        extendDrag: true,
        content: 'url:' + RootPath() + url,
        ok: f_ok,
        cancel: _cancel
    });
}

function w_alertDialog(msg, type) {
    var msg = "<div class='ui_alert'>" + msg + "</div>"
    var icon = "";
    if (type >= 1) {
        icon = "/../../../../res/image/common/yes.png";
    } else if (type == -1) {
        icon = "/../../../../res/image/common/no.png";
    } else {
        icon = "/../../../../res/image/common/warn.png";
    }
    top.$.dialog({
        id: "alertDialog",
        icon: icon,
        content: msg,
        title: "提示",
        lock:true,//锁定背景
        ok: function () {
            return true;
        }
    });
}

function w_uploadDialog(url, _id, _title, _width, _height, callBack) {
    top.$.dialog({
        id: _id,
        width: _width,
        height: _height,
        max: false,
        lock: true,
        title: _title,
        resize: false,
        extendDrag: true,
        content: 'url:' + RootPath() + url,
        button: [
	        	{
	                name: '上传',
	                callback: function () {
	                	callBack(_id);
	                    return false;
	                }
	            } ,      			
				{
				    name: '关 闭',
				    callback: function () {
				        return true;
				    }
				}
             ]
    });
}