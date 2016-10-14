ZUI.ComboBox = function(option)
{
	var self = this;
	var selectedItem = null;
	this.view = option.view;
	
	this.box = $("<div class='box'>");
	this.box.appendTo(this.view);
	
	this.label = $("<div class='label'>");
	this.label.appendTo(this.box);
	
	this.arrow = $("<div class='arrow'><div class='icon'></div></div>");
	this.arrow.appendTo(this.box);
	
	this.list = this.view.find(".list");
	var listItems = this.list.find(".item");
	listItems.each(function(){
		$(this).mousedown(function(e){
			e.stopPropagation();
		});
		$(this).click(function(e){
			mousedownHandler();
			var item = $(this);
			if(selectedItem === item)return;
			selectItem(item);
			self.view.trigger(ZUI.ComboBox.CHANGE);
		});
	});
	
	this.box.click(function(e){
		self.box.addClass("dropdown");
		self.list.show();
	});
	
	$(document).on("mousedown",mousedownHandler);
	
	this.view.on(ZUI.ComboBox.DISPOSE,function(e){
		self.dispose();
	});
	
	function selectItem(item)
	{
		self.label.attr("data-lang",item.data("lang"));
		ZUI.Lang.render(self.box);
		selectedItem = item;
	}
	
	function mousedownHandler(e)
	{
		if(e && e.target === self.box.get(0))return;
		self.box.removeClass("dropdown");
		self.list.hide();
	}
	
	this.getValue = function()
	{
		return selectedItem == null ? undefined : selectedItem.data("value");
	}
	
	this.setValue = function(value)
	{
		var item = this.list.find(".item[data-value="+value+"]");
		selectItem(item);
	}
	
	this.dispose = function()
	{
		$(document).off("mousedown",mousedownHandler);
	}
}

ZUI.ComboBox.CHANGE = "ZUI_ComboBox_Change";
ZUI.ComboBox.DISPOSE = "ZUI_ComboBox_Dispose";