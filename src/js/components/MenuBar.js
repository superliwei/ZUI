ZUI.MenuBar = function(option)
{
	this.view = option.view;
	
	var items = this.view.find(">.item");
	items.each(function(){
		new MenuBarItem($(this));
	});
	
	var self = this;
	$(document).mousedown(function(e){
		var targetParent = $(e.target).parent();
		if(targetParent.hasClass("zui menubar") || targetParent.parent().hasClass("zui menubar"))return;
		if(targetParent.hasClass("zui menu") && targetParent.data("owner") === self)return;
		self.hideMenu();
	});
	
	var currentMenuBarItem;
	var isItemDown = false;
	
	this.hideMenu = function()
	{
		selectItem(null);
		isItemDown = false;
	}
	
	function selectItem(menuBarItem)
	{
		if(!isItemDown)return;
		if(currentMenuBarItem === menuBarItem)return;
		if(currentMenuBarItem != undefined)
		{
			currentMenuBarItem.hideMenu();
			currentMenuBarItem = undefined;
		}
		if(menuBarItem != null)menuBarItem.showMenu();
		currentMenuBarItem = menuBarItem;
	}
	
	function handleItemDown(menuBarItem)
	{
		if(isItemDown)return;
		isItemDown = true;
		selectItem(menuBarItem);
	}
	
	function MenuBarItem(view)
	{
		var _self = this;
		view.mousedown(function(){
			handleItemDown(_self);
		});
		view.mouseover(function(){
			selectItem(_self);
		});
		
		this.showMenu = function()
		{
			var menuView = view.find(">.menu");
			if(menuView.length > 0)
			{
				view.addClass("selected");
				self.view.trigger(ZUI.Menu.OPEN,menuView);
				this.menu = new ZUI.Menu({
					view : menuView.clone()
				});
				this.menu.view.data("owner",self);
				this.menu.view.css("display","block");
				this.menu.view.appendTo('body');
				this.menu.view.offset({
					left : view.offset().left,
					top : view.offset().top + view.height()
				});
			}
		}
		
		this.hideMenu = function()
		{
			if(this.menu != undefined)
			{
				view.removeClass("selected");
				this.menu.view.remove();
				this.menu.hideSubMenu();
				this.menu = undefined;
			}
		}
	}
}