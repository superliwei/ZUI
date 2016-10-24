(function(){
	var map = {
		"zui_combobox" : ZUI.ComboBox,
		"zui_accordion" : ZUI.Accordion,
		"zui_checkbox" : ZUI.CheckBox,
		"zui_input" : ZUI.Input,
		"zui_textarea" : ZUI.TextArea,
		"zui_menubar" : ZUI.MenuBar,
		"zui_slider" : ZUI.Slider,
		"zui_popwin" : ZUI.PopWin,
		"zui_colorpicker" : ZUI.ColorPicker,
		"zui_pointer" : ZUI.Pointer
	};
	
	for(var name in map)
	{
		new Plugin(name);
	}
	
	function Plugin(name)
	{
		$.fn[name] = function()
		{
			var arr = [];
			this.each(function(){
				var view = $(this);
				view.data("instance",view.data("instance") || new map[name]({
					view : view
				}));
				arr.push(view.data("instance"));
			});
			if(arr.length == 0)return undefined;
			if(arr.length == 1)return arr[0];
			return arr;
		}
	}
})();

$(function(){
	$(".zui.combobox").zui_combobox();
	$(".zui.accordion").zui_accordion();
	$(".zui.checkbox").zui_checkbox();
	$(".zui.input").zui_input();
	$(".zui.textarea").zui_textarea();
	$(".zui.menubar").zui_menubar();
	$(".zui.slider").zui_slider();
	$(".zui.popwin").zui_popwin();
	$(".zui.colorpicker").zui_colorpicker();
	$(".zui.pointer").zui_pointer();
	ZUI.Lang.render();
});