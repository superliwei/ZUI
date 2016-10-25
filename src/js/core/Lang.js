/**
 * 多语言支持
 */
ZUI.Lang = {};

ZUI.Lang.render = function(parentContainer)
{
	var items = this.findItems(parentContainer);
	items.each(function(){
		var lang = $(this).attr("data-lang");
		$(this).text(ZUI.Lang.getText(lang));
	});
}

ZUI.Lang.getText = function(exp)
{
	var str = exp.substr(1,exp.length-2);
	return eval(str);
}

ZUI.Lang.findItems = function(parentContainer)
{
	var sel = "*[data-lang^='{'][data-lang$='}']";
	return parentContainer == undefined ? $(sel) : parentContainer.find(sel);
}