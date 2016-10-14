ZUI.PopWin = function(option)
{
	var self = this;
	this.view = option.view;
	
	var closeBt = this.view.find(".titleBar .remove");
	closeBt.click(function(){
		self.hide();
	});
	
	var mask = $("<div class='zui mask'></div>");
	
	this.show = function()
	{
		mask.insertBefore(this.view);
		this.view.css("display","flex");
		this.view.css("left","calc(50% - "+this.view.outerWidth()*0.5+"px)");
		this.view.css("top","calc(50% - "+this.view.outerHeight()*0.5+"px)");
	}
	
	this.hide = function()
	{
		this.view.css("display","none");
		mask.remove();
	}
}