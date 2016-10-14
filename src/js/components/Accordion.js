ZUI.Accordion = function(option)
{
	var self = this;
	this.view = option.view;
	
	var titles = this.view.find("> .title");
	var contents = this.view.find("> .content");
	
	titles.click(function(e){
		selectTitle($(this));
	});
	
	function selectTitle(title)
	{
		if(title.hasClass("active"))return;
		var selectedTitle = self.view.find("> .title.active");
		if(selectedTitle.length > 0)
		{
			selectedTitle.removeClass("active");
			selectedTitle.next().removeClass("active");
		}
		if(title != null)
		{
			title.addClass("active");
			title.next().addClass("active");
		}
	}
}