ZUI.Menu = function(option)
{
	var self = this;
	this.view = option.view;
	
	var items = this.view.find(">.item");
	items.each(function(){
		new MenuItem($(this));
	});
	
	var currentMenuItem;
	
	function selectItem(menuItem)
	{
		if(currentMenuItem === menuItem)return;
		if(currentMenuItem != undefined)
		{
			currentMenuItem.hideMenu();
			currentMenuItem = undefined;
		}
		menuItem.showMenu();
		currentMenuItem = menuItem;
	}
	
	function MenuItem(view)
	{
		var arrow = view.find(".arrow");
		if(arrow.length == 0)
		{
			arrow = $('<div class="arrow">');
			arrow.appendTo(view);
			
			var menuView = view.find(">.menu");
			if(menuView.length > 0)
			{
				var icon = $('<i class="icon-caret-right"></i>');
				icon.appendTo(arrow);
			}
		}
		
		var _self = this;
		view.mouseover(function(){
			selectItem(_self);
		});
		
		view.click(function(e){
			if(view.hasClass("disabled"))return;
			if(view.find(">.menu").length > 0)return;
			var owner = self.view.data("owner");
			owner.hideMenu();
			owner.view.trigger(ZUI.Menu.ITEM_CLICK,view);
		});
		
		this.showMenu = function()
		{
			if(view.hasClass("disabled"))return;
			var menuView = view.find(">.menu");
			if(menuView.length > 0)
			{
				view.addClass("selected");
				self.view.data("owner").view.trigger(ZUI.Menu.OPEN,menuView);
				this.menu = new ZUI.Menu({
					view : menuView.clone()
				});
				this.menu.view.data("owner",self.view.data("owner"));
				this.menu.view.css("display","block");
				this.menu.view.appendTo('body');
				this.menu.view.offset({
					left : view.offset().left + view.width(),
					top : view.offset().top
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
	
	this.hideSubMenu = function()
	{
		if(currentMenuItem != undefined)
		{
			currentMenuItem.hideMenu();
		}
	}
}
ZUI.Menu.OPEN = "ZUI_Menu_Open";
ZUI.Menu.ITEM_CLICK = "ZUI_Menu_ItemClick";