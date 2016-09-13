	define(["jquery"], function($) {
		var Dialog = {
			msgdiv : null,
			msgdivtimeout : null,
			msgHide : function() {
				Dialog.msgdiv.fadeOut(500);
			},
			getMsgDiv : function(config) {
				return '<div bgdiv=true  class="cc_'
						+ config.type
						+ '" style="border-radius: 8px;	-moz-border-radius: 8px;		margin-top: 2px;	padding: 10px 15px;">'
						+ '<table ><tr>	<td  ><div imgdiv="true" class="hh_img_'
						+ config.type
						+ '"  ></div></td><td style="font-weight: bold;	font-size: 18px;" msg=true>'
						+ config.msg + '</td></tr></table></div>'
			},
			msg : function(config) {
				config = config || {};
				// var title = config.title || '提示';
				var format = config.format || '提示内容';
				var time = config.time || 2000;
				var type = config.type;
				var parneframe = $.cc.getRootFrame();
				if (parneframe.Dialog && parneframe.Dialog.msgdiv == null) {
					parneframe.Dialog.msgdiv = parneframe
							.$('<div  id="msg-div" style="position: absolute;left: 35%;top: 10px;width: 300px;z-index: 20000000;">'
									+ Dialog.getMsgDiv({
										type : type,
										msg : format
									}) + '</div>');
					parneframe.$("body").append(parneframe.Dialog.msgdiv);
					parneframe.Dialog.msgdiv.hide();
					parneframe.Dialog.msgdiv.fadeIn(500);
				} else {
					var msg_div = parneframe.$("#msg-div");
					msg_div.find('[imgdiv=true]').attr('class', 'hh_img_' + type);
					msg_div.find('[bgdiv=true]').attr('class', 'hh_' + type);
					msg_div.find('[msg=true]').html('&nbsp;&nbsp;' + format);
					parneframe.Dialog.msgdiv.fadeIn(500);
				}
				if (parneframe.Dialog.msgdivtimeout) {
					clearTimeout(parneframe.Dialog.msgdivtimeout);
				}
				parneframe.Dialog.msgdivtimeout = parneframe.setTimeout(
						'$.cc.getRootFrame().Dialog.msgHide()', time);
			},
			okmsg : function(value) {
				Dialog.msg({
					type : 'green',
					title : '<font color="green">成功</font>',
					format : '<font >' + value + '</font>',
					time : 1500
				});
			},
			errormsg : function(value) {
				Dialog.msg({
					type : 'red',
					title : '<font color="red">错误</font>',
					format : '<font>' + value + '</font>',
					time : 3000
				});
			},
			infomsg : function(value) {
				Dialog.msg({
					type : 'blue',
					title : '<font color="blue">提示</font>',
					format : '<font>' + value + '</font>',
					time : 3000
				});
			},
			alert : function(message, callback) {
				$.cc.getRootFrame().Dialog.open({
					title : '提示',
					message : Dialog.getMsgDiv({
						type : 'blue',
						msg : message,
						buttons : [ {
							text : '确定',
							event : function() {
								if (callback) {
									callback();
								}
								$(this).dialog("close");
							}
						} ]
					})
				});
			},
			error : function(message) {
				$.cc.getRootFrame().Dialog.open({
					title : '错误',
					message : Dialog.getMsgDiv({
						type : 'red',
						msg : message
					})
				});
			},
			open : function(params) {
				var parneframe = $.cc.getRootFrame();
				params.params = params.params || {};
				params.params.parentPage = window;
				var dialog = new parneframe.DialogClass(params);
				//var dialog = new DialogClass(params);
				dialog.show();
				return dialog;
			},
			openthis : function(params) {
				var parneframe = window;
				params.params = params.params || {};
				params.params.parentPage = window;
				var dialog = new DialogClass(params);
				dialog.show();
				return dialog;
			},
			confirm : function(params) {
				params.title = params.title || '请确认';
				params.type = 'hh_question';
				var parneframe = $.cc.getRootFrame();
				if (params.buttons == null) {
					params.buttons = [ {
						text : '是',
						event : function() {
							parneframe.$(this).dialog("close");
							if (params.callback) {
								params.callback(1);
							}
							if (params.yes) {
								params.yes();
							}
						}
					}, {
						text : '否',
						event : function() {
							parneframe.$(this).dialog("close");
							if (params.callback) {
								params.callback(0);
							}
						}
					} ];
				}
				params.message = Dialog.getMsgDiv({
					type : 'yellow',
					msg : params.message
				});
				new parneframe.DialogClass(params).show();
			},
			close : function() {
				var parneframe = $.cc.getRootFrame();
				if (parneframe != null && window.name != null) {
					var dialogid = window.name.replace('iframe', '');
					var dialog = parneframe.$('#' + dialogid);
					var tab = parneframe.$('[aria-controls=' + dialogid + ']');
					if (tab.length > 0) {
						tab.find('span').trigger('click');
					} else if (dialog) {
						dialog.dialog("close");
						$(".ui-dialog-titlebar-close",parneframe.parent.document).click();
					}
				}
			},
			closethis : function() {
				var parneframe = parent.window;
				if (parneframe != null && window.name != null) {
					var dialogid = window.name.replace('iframe', '');
					var dialog = parneframe.$('#' + dialogid);
					var tab = parneframe.$('[aria-controls=' + dialogid + ']');
					if (tab.length > 0) {
						tab.find('span').trigger('click');
					} else if (dialog) {
						dialog.dialog("close");
					}
				}
			}
		}
		return Dialog;
	});

	