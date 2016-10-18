ZUI.ColorPicker = function(option)
{
	var self = this;
	this.view = option.view;
	
	var box = $("<div class='box'>");
	box.appendTo(this.view);
	
	box.colorPicker({
		animationSpeed:0,
		renderCallback:function(elm,toggled)
		{
			if(toggled == true)//open
			{
				//donothing...
			}
			else if(toggled == false) //close
			{
				self.view.trigger(ZUI.ColorPicker.SUBMIT);
			}
			else if(toggled == undefined)
			{
				self.view.trigger(ZUI.ColorPicker.CHANGE);
			}
		}
	});
	
	this.getValue = function()
	{
		return box.val();
	}
	
	this.setValue = function(value)
	{
		box.val(value);
		box.css("background-color",value);
	}
	
	this.setValue(option.color || "#000");
}

ZUI.ColorPicker.CHANGE = "ZUI_ColorPicker_Change";
ZUI.ColorPicker.SUBMIT = "ZUI_ColorPicker_Submit";