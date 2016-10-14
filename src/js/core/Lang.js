/**
 * 多语言支持
 */
ZUI.Lang = {};

ZUI.Lang.render = function(parentContainer)
{
	var items = this.findItems(parentContainer);
	items.each(function(){
		var lang = $(this).attr("data-lang");
		var str = lang.substr(1,lang.length-2);
		$(this).text(eval(str));
	});
}

ZUI.Lang.findItems = function(parentContainer)
{
	var sel = "*[data-lang^='{'][data-lang$='}']";
	return parentContainer == undefined ? $(sel) : parentContainer.find(sel);
}