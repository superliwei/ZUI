ZUI.Input = function(option)
{
	var self = this;
	this.view = option.view;
	
	this.input = $("<input type='text'>");
	this.input.appendTo(this.view);
	
	this.getValue = function()
	{
		return self.input.val();
	}
	
	this.setValue = function(value)
	{
		this.input.val(value);
	}
	
	this.input.change(function(){
		self.view.trigger(ZUI.Input.CHANGE,self.input.val());
	})

}

ZUI.Input.CHANGE = "ZUI_Input_Change";
