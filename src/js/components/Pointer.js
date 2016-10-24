ZUI.Pointer = function(option)
{
	var self = this;
	this.view = option.view;
	var circle = $("<div class='circle'>");
	circle.appendTo(this.view);
	var handle = $("<div class='handle'>");
	handle.appendTo(circle);
	
	var container = $("<div>",{
		style : "top:0px;left:0px;overflow:hidden;position:absolute;width:100%;height:100%;background:rgba(0,0,0,0);"
	});
	var canvas = $("<canvas>");
	canvas.appendTo(container);
	
	this.view.mousedown(function(e){
		$(document).on("mousemove",moveHandler);
		$(document).on("mouseup",upHandler);
		var moved = false;
		var ctx = canvas.get(0).getContext("2d");
		var handle = self.view.find(".handle");
		var pos = handle.offset();
		var dp = {
			x:pos.left + handle.width()*0.5,
			y:pos.top + handle.height()*0.5
		};
		var originValue = self.value;
		
		function clearCanvas()
		{
			canvas.get(0).width = container.width();
		}
		
		function moveHandler(e)
		{
			e.preventDefault();
			if(!moved)
			{
				moved = true;
				container.appendTo("body");
				canvas.get(0).width = container.width();
				canvas.get(0).height = container.height();
			}
			clearCanvas();
			ctx.beginPath();
			ctx.strokeStyle="#FFFF00";
			ctx.moveTo(dp.x,dp.y);
			ctx.lineTo(e.clientX,e.clientY);
			ctx.stroke();
			self.view.trigger(ZUI.Pointer.UPDATE,e);
		}
		
		function upHandler(e)
		{
			$(document).off("mousemove",moveHandler);
			$(document).off("mouseup",upHandler);
			if(moved)
			{
				container.remove();
			}
			if(self.value != originValue)
			{
				self.view.trigger(ZUI.Pointer.CHANGE);
			}
		}
	});
	
	this.getValue = function()
	{
		return this.value;
	}
	
	this.setValue = function(value)
	{
		var active = value != undefined && value != "";
		this.view[active ? "addClass" : "removeClass"]("active");
		this.value = value;
	}
}

ZUI.Pointer.CHANGE = "ZUI_Pointer_Change";
ZUI.Pointer.UPDATE = "ZUI_Pointer_Update";