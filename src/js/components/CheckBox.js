ZUI.CheckBox = function(option)
{
	var self = this;
	this.view = option.view;
	
	this.box = $("<div class='box'>");
	this.box.appendTo(this.view);
	
	this.check = $("<div class='check'>&radic;</div>");
	this.check.appendTo(this.view);
	
	this.box.click(function(e){
		self.check.toggle();
		self.view.trigger(ZUI.CheckBox.CHANGE);
	})

	this.getValue = function()
	{
		return self.check.css("display") == "block";
	}
	
	this.setValue = function(bol)
	{
		self.check[bol ? "show" : "hide"]();
	}
}
ZUI.CheckBox.CHANGE = "ZUI_CheckBox_Change";
