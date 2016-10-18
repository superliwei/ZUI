ZUI.TextArea = function(option)
{
	var self = this;
	this.view = option.view;
	
	this.textArea = $("<textarea>");
	this.textArea.appendTo(this.view);
	
	this.getValue = function()
	{
		return this.textArea.val();
	}
	
	this.setValue = function(value)
	{
		this.textArea.val(value);
	}
	
	this.textArea.change(function(){
		self.view.trigger(ZUI.TextArea.CHANGE);
	});
}

ZUI.TextArea.CHANGE = "ZUI_TextArea_Change";