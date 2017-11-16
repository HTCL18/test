;(function($) {
	
	$.fn.changetag=function(options){
		var showmsg=$(".showmsg>div");
		if(options=="left"){
			/*if(showmsg.length==2){
				alert("已是最后一个");
				return;
			}*/
			lefttag(showmsg);
		}else{
			/*if(showmsg.length==2){
				alert("这是第一个");
				return;
			}*/
			righttag(showmsg);
		}
	};
	function lefttag(showmsg){
		for (var v = 0; v < showmsg.length; v++) {
			var id=parseInt(showmsg[v].id);
			if(id==showmsg.length-1){
				showmsg[v].id=0;
				$(showmsg[v]).css("display","block");
				$(showmsg[v]).css("float","left");
			}else{
				showmsg[v].id=id+1;
				$(showmsg[v]).css("display","block");
				$(showmsg[v]).css("float","right");
				if(id+1>=2){
					$(showmsg[v]).css("display","none");
				}
			}
		}
	}
	function righttag(showmsg){
		for (var v = 0; v < showmsg.length; v++) {
			var id=parseInt(showmsg[v].id);
			if(id==0){
				showmsg[v].id=showmsg.length-1;
				$(showmsg[v]).css("display","block");
				if(showmsg[v].id>=2){
					$(showmsg[v]).css("display","none");
				}
			}else{
				showmsg[v].id=parseInt(showmsg[v].id)-1;
				$(showmsg[v]).css("display","block");
				if(showmsg[v].id==1){
					$(showmsg[v]).css("float","right");
				}
				if(showmsg[v].id==0){
					$(showmsg[v]).css("float","left");
				}
				if(showmsg[v].id>=2){
					$(showmsg[v]).css("display","none");
				}
			}
		}
	}
})(jQuery);