define(["jquery","Doing","Request"], function($,Doing,Request) {
		var DialogClass = function(params) {
			this.width = 300;
			this.height = 160;
			this.id = $.cc.getUUID();
			this.title = '&nbsp;';
			this.message = '提示内容';
			this.modal = true;
			this.url = null;
			this.type = 'hh_info';
			this.buttons = [ {
				text : '确定',
				event : function() {
					$(this).dialog("close");
				}
			} ];
			$.extend(this, params);
			if (this.url) {
				this.buttons = [];
			}
		}

		DialogClass.prototype.show = function() {
			var dialog = this;
			var id = this.id;
			var body = $(document.getElementsByTagName("BODY")[0]);
			var html = '<div id="' + id + '" title="' + this.title
					+ '" style="overflow-x:hidden;overflow-y:hidden;">';
			if (this.url != null) {
				// var form = $(this.formHtml);
				var doinghtml = '<div id="' + id + '_div" style="height:55px;">'
						+ Doing.doingdivhtml3 + '</div>';
				html += doinghtml + "<iframe id='" + id + "iframe' name='" + id
						+ "iframe' frameborder=0  width=100% height=100% src='"
						+ Request.getHref(this.url, this.urlParams) + "' />";
				if (dialog.params) {
					$.cc.setFrameParams(id + 'iframe', dialog.params);
				}
			} else {
				this.height += $(this.message).text().length / 10 * 16;
				html += this.message;
			}
			html += '</div>';

			body.append($(html));

			var buttonList = this.buttons;
			var buttons = {};
			for (var i = 0; i < buttonList.length; i++) {
				buttons[buttonList[i].text] = buttonList[i].event;
			}

			if (this.width > $.cc.browser.getWidth()) {
				this.width = $.cc.browser.getWidth();
			}
			if (this.height > $.cc.browser.getHeight()) {
				this.height = $.cc.browser.getHeight();
			}
debugger
			$("#" + id).dialog(
					{
						// resizable : false,
						height : this.url != null ? 100 : this.height,
						width : this.url != null ? 200 : this.width,
						title : this.url != null ? "请稍后..." : null,
						modal : this.modal,
						position : {
							my : "center",
							at : this.position_at || "center",
							of : window
						},
						closeText : '关闭',
						buttons : buttons,
						close : function(event, ui) {debugger;
							var iframe = document.getElementById(id + 'iframe');
							if (iframe) {
								iframe.src = "about:blank";
								iframe.parentElement.removeChild(iframe);
							}
							$(this).remove();
						},
						open : function() {
							var openthis = $(this);
							var titlehead = openthis.prev('div');
							titlehead.dblclick(function() {
								if (openthis.data('big') == null) {
									openthis.dialog({
										width : $.cc.browser.getWidth() - 30,
										height : $.cc.browser.getHeight() - 30,
										position : {
											my : "center",
											at : "center",
											of : window
										}
									});
									openthis.data('big', true);
								} else {
									openthis.dialog({
										width : openthis.data('width'),
										height : openthis.data('height'),
										position : {
											my : "center",
											at : "center",
											of : window
										}
									});
									openthis.data('big', null);
								}
							});
							var iframe = window.frames[id + 'iframe'];
							if (iframe) {
								var iframeLoad = function() {
									$('#' + id + '_div').remove();
									var param = {};
									if (dialog.title == null || dialog.title == ''
											|| dialog.title == '&nbsp;') {
										param.title = iframe.document.title;
									} else {
										param.title = dialog.title;
									}
									var width = iframe.width || dialog.width;
									var height = iframe.height || dialog.height;

									if (width) {
//										if (width > $.cc.browser.getWidth()) {
//											width = $.cc.browser.getWidth();
//										}
										param.width = width;
									}
									if (height) {
//										if (height > $.cc.browser.getHeight()) {
//											height = $.cc.browser.getHeight();
//										}
										param.height = height;
									}
									openthis.data('height', height);
									openthis.data('width', width);
									openthis.dialog(param);
								}
								$.cc.iframeLoad(iframe, iframeLoad);
								/*
								 * var agt = window.navigator.userAgent; var isGecko =
								 * agt.toLowerCase().indexOf("gecko") != -1; if
								 * (!isGecko) { alert(1);
								 * iframe.attachEvent("onreadystatechange", function()
								 * {// 在ie下可以给iframe绑定onreadystatechange事件 alert(1); if
								 * ((/loaded|complete/)
								 * .test(self.innerFrame.readyState)) { iframeLoad(); }
								 * }); } else { iframe.onload = iframeLoad; };
								 */
							}
						}
					});
		}	
	return DialogClass;
});