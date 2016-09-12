define(["jquery"], function($) {
	var Doing = {
			doingdivhtml : '<div id="doing" class="hh_overlay"></div>',
			doingdivhtml2 : '<div id="loading" class="hh_loading">'
					+ '<div class="loading-indicator">'
					+ '<img src="/cccommon/images/loading/loadingred.gif"'
					+ ' 	style="margin-right: 8px;margin-top: 3px;  float: left; vertical-align: top;" />&nbsp;&nbsp;'
					+ '<a href="javascript:Doing.hide();">关闭</a>' + '</div>' + '</div>',
			doingdivhtml3 : '<img src="/cccommon/images/loading/loadingred.gif" '
					+ ' 	style="margin-left: 18px;margin-top: 15px; float: left; vertical-align: top;" />',
			doingdiv : null,
			hide : function() {
				// var parneframe = $.cc.getRootFrame();
				var parneframe = window;
				parneframe.$("#doing").fadeOut(100);
				parneframe.$("#loading").fadeOut(100);
			},
			show : function() {
				// var parneframe = $.cc.getRootFrame();
				var parneframe = window;
				if (parneframe.Doing.doingdiv == null) {
					parneframe.Doing.doingdiv = $(Doing.doingdivhtml
							+ Doing.doingdivhtml2);
					parneframe.$("body").append(parneframe.Doing.doingdiv);
				}
				parneframe.$("#doing").fadeIn(200);
				parneframe.$("#loading").fadeIn(200);
			}
		};
	return Doing;
});