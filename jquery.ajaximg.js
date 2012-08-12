/*
此插件基于Jquery
插件名：jquery.ajaximg(切换图片，服务器端)
开发者 usual2970
版本 1.0
Blog：http://t.qq.com/usual2970
*/
(function($){
	$.fn.ajaximg=function(options){
		var opts=$.extend({},$.fn.ajaximg.defaults,options);
		var widget_id=$(this).css({"position":"relative","overflow":"hidden"}).attr("id");
		$(this).find("#next").live("click",function(){
			var cur_id=$("#"+widget_id).attr("alt");
			$.fn.ajaximg.next(widget_id,cur_id,opts);
		});

		$(this).find("#prev").live("click",function(){
			var cur_id=$("#"+widget_id).attr("alt");
			$.fn.ajaximg.previous(widget_id,cur_id,opts);
		});
		$(this).find("#nav li").live("click",function(){
			var cur_id=$("#"+widget_id).attr("alt");
			var spec_id=parseInt($(this).attr("alt"))-1;
			$.fn.ajaximg.gospecial(widget_id,cur_id,opts,spec_id);
		});
		$.fn.ajaximg.init(widget_id,opts);

	}

	$.fn.ajaximg.defaults={
		width:500,
		height:300,
		wrapheight:500,
		border:"1px solid #ccc",
		backgorund:"gray",
		url:"test.php"

	};
	//初始化
	$.fn.ajaximg.init=function(id,opts){
		
		$.get("test.php?id=0",function(rs){
			rs=eval("("+rs+")");
			var content="<div id='prev' style='z-index:9;position:absolute;left:0px;line-height:"+opts.height+"px;top:0px;'>previous</div><div id='content_img' style='z-index:5;position:absolute;left:0px;top:0px;'>";
			content+="<img src='"+rs.row.img+"'>";
			content+="</div><div id='content_img' style='position:absolute;top:0px;left:"+opts.width+"px;'></div><div id='next' style='z-index:9;position:absolute;right:0px;line-height:"+opts.height+"px;top:0px;'>next</div>";
			$("#"+id).css({"width":opts.width+"px","height":opts.wrapheight+"px","border":opts.border,"background":opts.backgorund}).html(content).attr("alt","0");

			var nav="<ul style='position:absolute;right:0px;top:"+opts.height+"px;list-style:none;margin:0px;padding:0px;' id='nav'>";
			for(i=1;i<=rs.total;i++){
				if(i==1){
					nav+="<li style='float:left' class='current' alt='"+i+"' style='cursor:pointer;'>"+i+"</li><li style='float:left'>-</li>";
					continue;
				}
				if(i==rs.total) nav+="<li style='float:left' alt='"+i+"' style='cursor:pointer;'>"+i+"</li>";
				else nav+="<li style='float:left' alt='"+i+"' style='cursor:pointer;'>"+i+"</li><li style='float:left'>-</li>";

				
			}
			nav+="</ul>";
			$(nav).appendTo("#"+id);
		});
		
		
	}
	//加载下一张图片
	$.fn.ajaximg.next=function(id,cur_id,opts){
		cur_id=parseInt(cur_id)+1;
		$.get("test.php?id="+cur_id,function(rs){
			if(!!!rs) return false;
			else{
				rs=eval("("+rs+")");
				var width=opts.width;
				var size=$("#"+id).find("#content_img").length;
				if(size>2) $("#"+id).find("#content_img:first").remove();
				var img="<img src='"+rs.row.img+"' broder='0'/>";
				var first=$("#"+id).find("#content_img:first");
				var last=$("#"+id).find("#content_img:last");
				first.animate({"left":"-"+width+"px"},500);
				last.html(img).animate({"left":"0px"},500);

				$("<div id='content_img' style='position:absolute;left:"+opts.width+"px;top:0px;'></div>").appendTo("#"+id);
				var temp_id=cur_id+1;
				$("#"+id).attr("alt",cur_id).find("#nav li[alt="+temp_id+"]").attr("class","current").siblings().removeClass("current");

			}	
		});
		
	}
	//加载前一张图片
	$.fn.ajaximg.previous=function(id,cur_id,opts){
		cur_id=parseInt(cur_id)-1;
		$.get("test.php?id="+cur_id,function(rs){
			if(!!!rs) return false;
			else{
				rs=eval("("+rs+")");
				var width=opts.width;
				var size=$("#"+id).find("#content_img").length;
				if(size>2) $("#"+id).find("#content_img:last").remove();
				var img="<img src='"+rs.row.img+"' broder='0'/>";
				var first=$("#"+id).find("#content_img:first");
				var last=$("#"+id).find("#content_img:last");
				last.animate({"left":width+"px"},500);
				first.html(img).animate({"left":"0px"},500);

				$("<div id='content_img' style='position:absolute;left:-"+opts.width+"px;top:0px;'></div>").prependTo("#"+id);
				var temp_id=cur_id+1;
				$("#"+id).attr("alt",cur_id).find("#nav li[alt="+temp_id+"]").attr("class","current").siblings().removeClass("current");
			}	
		});



		

	}
	//加载指定图片
	$.fn.ajaximg.gospecial=function(id,cur_id,opts,spec_id){
		if(spec_id<cur_id){
			cur_id=spec_id;
			$.get("test.php?id="+cur_id,function(rs){
				if(!!!rs) return false;
				else{
					rs=eval("("+rs+")");
					var width=opts.width;
					var size=$("#"+id).find("#content_img").length;
					if(size>2) $("#"+id).find("#content_img:last").remove();
					var img="<img src='"+rs.row.img+"' broder='0'/>";
					var first=$("#"+id).find("#content_img:first");
					var last=$("#"+id).find("#content_img:last");
					last.animate({"left":width+"px"},500);
					first.html(img).animate({"left":"0px"},500);

					$("<div id='content_img' style='position:absolute;left:-"+opts.width+"px;top:0px;'></div>").prependTo("#"+id);
					var temp_id=cur_id+1;
					$("#"+id).attr("alt",cur_id).find("#nav li[alt="+temp_id+"]").attr("class","current").siblings().removeClass("current");
				}	
			});
		}
		else if(spec_id>cur_id){
			cur_id=spec_id;
			$.get("test.php?id="+cur_id,function(rs){
				if(!!!rs) return false;
				else{
					rs=eval("("+rs+")");
					var width=opts.width;
					var size=$("#"+id).find("#content_img").length;
					if(size>2) $("#"+id).find("#content_img:first").remove();
					var img="<img src='"+rs.row.img+"' broder='0'/>";
					var first=$("#"+id).find("#content_img:first");
					var last=$("#"+id).find("#content_img:last");
					first.animate({"left":"-"+width+"px"},500);
					last.html(img).animate({"left":"0px"},500);

					$("<div id='content_img' style='position:absolute;left:"+opts.width+"px;top:0px;'></div>").appendTo("#"+id);
					var temp_id=cur_id+1;
					$("#"+id).attr("alt",cur_id).find("#nav li[alt="+temp_id+"]").attr("class","current").siblings().removeClass("current");

				}	
			});
		}
	}
})(jQuery);


