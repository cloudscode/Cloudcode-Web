define(["jquery","Dialog","Doing","Request","jqueryui","button"], function($,Dialog,Doing,Request) {
	window.Dialog=Dialog;
	Array.prototype.inArray = function(eeee) {
		for (aaa = 0; aaa < this.length; aaa++) {
			if (this[aaa] == eeee) {
				return true;
			}
		}
		return false;
	};
	/* UUID start */
	function UUID() {
		this.id = this.createUUID();
	}
	UUID.prototype.valueOf = function() {
		return this.id;
	};
	UUID.prototype.toString = function() {
		return this.id;
	};
	UUID.prototype.createUUID = function() {
		var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
		var dc = new Date();
		var t = dc.getTime() - dg.getTime();
		var tl = UUID.getIntegerBits(t, 0, 31);
		var tm = UUID.getIntegerBits(t, 32, 47);
		var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security
		var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
		var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
		var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7)
				+ UUID.getIntegerBits(UUID.rand(8191), 8, 15)
				+ UUID.getIntegerBits(UUID.rand(8191), 0, 7)
				+ UUID.getIntegerBits(UUID.rand(8191), 8, 15)
				+ UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number
		return tl + tm + thv + csar + csl + n;
	};
	UUID.getIntegerBits = function(val, start, end) {
		var base16 = UUID.returnBase(val, 16);
		var quadArray = new Array();
		var quadString = '';
		var i = 0;
		for (i = 0; i < base16.length; i++) {
			quadArray.push(base16.substring(i, i + 1));
		}
		for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
			if (!quadArray[i] || quadArray[i] == '')
				quadString += '0';
			else
				quadString += quadArray[i];
		}
		return quadString;
	};
	UUID.returnBase = function(number, base) {
		return (number).toString(base).toUpperCase();
	};
	UUID.rand = function(max) {
		return Math.floor(Math.random() * (max + 1));
	};
	/* UUID END */
	$.cc = $.cc || {};
	$.cc.params = {};
	$.cc.widgetList = [ 'text', 'password', 'radio', 'selectTree', 'selectUser',
	            		'selectPageList', 'selectPic', 'checkbox', 'check', 'textarea',
	            		'ckeditor', 'tableitem', 'date', 'file', 'uploadpic', 'selectInput',
	            		'combobox', 'selectOrg', 'itemselect', 'selectColor', 'fileUpload' ];
    $.cc.widgetFind = '';
    for (var i = 0; i < $.cc.widgetList.length; i++) {
    	if (i != 0) {
    		$.cc.widgetFind += ',';
    	}
    	$.cc.widgetFind += '[xtype=' + $.cc.widgetList[i] + ']';
    }
//    $.cc.button = {
//			render : function(field, config) {
//				field.empty();
//				var $input = $("<button>"
//						+ (config.text == null ? '&nbsp;' : config.text) + "</button>");
//				$.cc.fn.setAttr(field, $input, config);
//				field.append($input);
//
//				var menuId = config.menuId;
//				if (menuId) {
//					$('#' + menuId).hide();
//					$('#' + menuId).css(
//							{
//								'border' : '1px solid '
//										+ $.cc.property.classObject.themeContent,
//								'position' : 'absolute'
//							});
//				}
//
//				$input.button(
//						{
//							disabled : config.disabled,
//							text : (!(config.textHidden == true))
//									&& (config.text != null && config.text != ''),
//							icons : {
//								primary : config.icon
//							}
//						}).click(function() {
//					if (config.onClick) {
//						config.onClick(config.params);
//					}
//					if (menuId) {
//						$(document).one("click", function() {
//							$('#' + menuId).hide();
//						});
//						$('#' + menuId).show().position({
//							my : "right top",
//							at : "right bottom",
//							of : this
//						});
//					}
//					return false;
//				});
//				if (config.itype == 'delete') {
//					// $input.addClass('hh_red_btn');
//					$input.button({
//						icons : {
//							primary : "hh_img_delete"
//						}
//					});
//				} else if (config.itype == 'add') {
//					// $input.addClass('hh_blue_btn');
//					$input.button({
//						icons : {
//							primary : "hh_img_add"
//						}
//					});
//				} else if (config.itype == 'edit') {
//					// $input.addClass('hh_yellow_btn');
//					$input.button({
//						icons : {
//							primary : "hh_img_edit"
//						}
//					});
//				} else if (config.itype == 'refresh') {
//					// $input.addClass('hh_green_btn');
//					$input.button({
//						icons : {
//							primary : "hh_img_refresh"
//						}
//					});
//				} else if (config.itype == 'query') {
//					$input.button({
//						icons : {
//							primary : "hh_img_query"
//						}
//					});
//				} else if (config.itype == 'view') {
//					$input.button({
//						icons : {
//							primary : "hh_img_view"
//						}
//					});
//				} else if (config.itype == 'manager') {
//					$input.button({
//						icons : {
//							primary : "hh_img_setting"
//						}
//					});
//				} else if (config.itype == 'save') {
//					$input.button({
//						icons : {
//							primary : "hh_img_save"
//						}
//					});
//				} else if (config.itype == 'close') {
//					$input.button({
//						icons : {
//							primary : "hh_img_delete"
//						}
//					});
//				} else if (config.itype == 'submit') {
//					$input.button({
//						icons : {
//							primary : "hh_img_green"
//						}
//					});
//				}
//
//			},
//			disabled : function(span) {
//				span.find('button').button({
//					disabled : true
//				});
//			},
//			undisabled : function(span) {
//				span.find('button').button({
//					disabled : false
//				});
//			}
//		};
    $.cc.property = {
    		img_add : '/cccommon/images/extjsico/add.gif',
    		img_delete : '/cccommon/images/extjsico/delete2.gif',
    		img_edit : '/cccommon/images/extjsico/edit.gif',
    		img_email_open : '/cccommon/images/icons/email/email_open.png',
    		img_email : '/cccommon/images/icons/email/email.png',
    		img_email_close : '/cccommon/images/icons/email/email_close.gif',
    		img_refresh : '/cccommon/images/icons/arrow/arrow_refresh.png',
    		img_excel : '/cccommon/images/myimage/excel.png',
    		img_wenjianjia : '/cccommon/images/framework/wenjianjia.jpg',
    		img_wenjian : '/cccommon/images/framework/wenjian.jpg',
    		loginUser : {},
    		execLoad : {},
    		classObject : {
    			'base' : {
    				'class' : 'base',
    				'content' : '#e6e6e6',
    				'head' : '#d3d3d3'
    			},
    			'black-tie' : {
    				'class' : 'black-tie',
    				'content' : '#a3a3a3',
    				'head' : '#333333'
    			},
    			'blitzer' : {
    				'class' : 'blitzer',
    				'content' : '#e3a1a1',
    				'head' : '#cc0000'
    			},
    			'cupertino' : {
    				'class' : 'cupertino',
    				'content' : '#deedf7',
    				'head' : '#aed0ea'
    			},
    			'dark-hive' : {
    				'class' : 'dark-hive',
    				'content' : '#555555',
    				'head' : '#333333'
    			},
    			'dot-luv' : {
    				'class' : 'dot-luv',
    				'content' : '#d9d9d9',
    				'head' : '#0b3e6f'
    			},
    			'eggplant' : {
    				'class' : 'eggplant',
    				'content' : '#7e7783',
    				'head' : '#3d3644'
    			},
    			'excite-bike' : {
    				'class' : 'excite-bike',
    				'content' : '#aaaaaa',
    				'head' : '#222222'
    			},
    			'flick' : {
    				'class' : 'flick',
    				'content' : '#dddddd',
    				'head' : '#444444'
    			},
    			'hot-sneaks' : {
    				'class' : 'hot-sneaks',
    				'content' : '#aaaaaa',
    				'head' : '#2c4359'
    			},
    			'humanity' : {
    				'class' : 'humanity',
    				'content' : '#d49768',
    				'head' : '#cb842e'
    			},
    			'le-frog' : {
    				'class' : 'le-frog',
    				'content' : '#72b42d',
    				'head' : '#285c00'
    			},
    			'mint-choc' : {
    				'class' : 'mint-choc',
    				'content' : '#695649',
    				'head' : '#453326'
    			},
    			'overcast' : {
    				'class' : 'overcast',
    				'content' : '#dddddd',
    				'head' : '#444444'
    			},
    			'pepper-grinder' : {
    				'class' : 'pepper-grinder',
    				'content' : '#d4d1bf',
    				'head' : '#453821'
    			},
    			'redmond' : {
    				'class' : 'redmond',
    				'content' : '#a6c9e2',
    				'head' : '#4297d7'
    			},
    			'smoothness' : {
    				'class' : 'smoothness',
    				'content' : '#e6e6e6',
    				'head' : '#d3d3d3'
    			},
    			'south-street' : {
    				'class' : 'south-street',
    				'content' : '#f5f3e5',
    				'head' : '#dfd9c3'
    			},
    			'start' : {
    				'class' : 'start',
    				'content' : '#a6c9e2',
    				'head' : '#2191c0'
    			},
    			'sunny' : {
    				'class' : 'sunny',
    				'content' : '#feeebd',
    				'head' : '#8e846b'
    			},
    			'swanky-purse' : {
    				'class' : 'swanky-purse',
    				'content' : '#efec9f',
    				'head' : '#443113'
    			},
    			'trontastic' : {
    				'class' : 'trontastic',
    				'content' : '#9fda58',
    				'head' : '#000000'
    			},
    			'ui-darkness' : {
    				'class' : 'ui-darkness',
    				'content' : '#666666',
    				'head' : '#000000'
    			},
    			'ui-lightness' : {
    				'class' : 'ui-lightness',
    				'content' : '#f6a828',
    				'head' : '#e78f08'
    			},
    			'vader' : {
    				'class' : 'vader',
    				'content' : '#888888',
    				'head' : '#404040'
    			}
    		}
    	};

	$.cc.browser = {
			type : null,
			getWidth : function() {
				if (window.ActiveXObject) {
					if (document.documentElement == null) {
						return null;
					}
					return document.documentElement.clientWidth;
				} else {
					if (document.body == null) {
						return null;
					}
					return document.body.clientWidth;
				}
			},
			getHeight : function() {
				if (window.ActiveXObject) {
					if (document.documentElement == null) {
						return null;
					}
					return document.documentElement.clientHeight;
				} else {
					if (document.body == null) {
						return null;
					}
					return document.body.clientHeight;
				}
			}
		}
	if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
		var g = window.navigator.userAgent.substring(30, 33);
		if (g == "6.0") {
			$.cc.browser.type = "IE6";
		} else if (g == "7.0") {
			$.cc.browser.type = "IE7";
		} else if (g == "8.0") {
			$.cc.browser.type = "IE8";
		} else if (g == "9.0") {
			$.cc.browser.type = "IE9";
		} else if (g == "10.") {
			$.cc.browser.type = "IE10";
		} else {
			$.cc.browser.type = "IEOther";
		}
	} else {
		if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
			$.cc.browser.type = "Firefox";
		} else if (window.navigator.userAgent.indexOf("Opera") >= 0) {
			$.cc.browser.type = "Opera";
		} else if (window.navigator.userAgent.indexOf("Chrome") >= 0) {
			$.cc.browser.type = "Chrome";
		} else if (window.navigator.userAgent.indexOf("Safari") >= 1) {
			$.cc.browser.type = "Safari";
		} else {
			$.cc.browser.type = "Other";
		}
	}
	$.cc.browser.getMainWidth = function() {
		var win = $.cc.getRootFrame();
		return win.$.cc.browser.getWidth();
	};
	$.cc.browser.getMainHeight = function() {
		var win = $.cc.getRootFrame();
		return win.$.cc.browser.getHeight();
	};
	var HeightSet = {
			cResizeTimer : null,
			triggerCustomHeightSet : function() {
				var a = $.cc.browser.getHeight();
				try {
					set_height(a);
				} catch (e) {
				}
			}
		};
		function set_height(height) {
			$('[xtype=pagelist]').each(function(){
				var columnList = $.cc.pagelist.getRenderWidth($(this));
				for(var i=0;i<columnList.length;i++){
					var column = columnList[i];
					var name = column.name;
					if(name){
						$(this).find('[pagelisttd='+name+']').width(column.width<30?40:column.width);
					}
				}
			});
			
			
			$("div[xtype=hh_content]").eq(0).height(height - 42);
			$("div[xtype=hh_main_content]").eq(0).height(height);
			for ( var p in $.cc.setHeightMap) {
				try {
					if ($.cc.setHeightMap[p]) {
						$.cc.setHeightMap[p].fun(height);
					}
				} catch (e) {
				}
			}
			setHeight(height);
		}
		function setHeight() {
		}
		function init() {
		}
	$.cc.getRootFrame = function() {
		if (window.parent && window.parent.set_height != null) {
			return $.cc.getRootFrame2(window.parent);
		} else {
			return window;
		}
	};
	$.cc.getRootFrame2 = function(param) {
		if (param != param.parent && param.parent.set_height != null) {
			return $.cc.getRootFrame2(param.parent);
		} else {
			return param;
		}
	};

	$.cc.setFrameParams = function(iframeId, params) {
		$.cc.getRootFrame().$.cc.params[iframeId] = params;
	}
	$.cc.getIframeParams = function() {
		if (window.frameElement) {
			var params = $.cc.getRootFrame().parent.$.cc.params[window.frameElement.id];
			// delete
			// $.cc.getRootFrame().$.cc.params[window.frameElement.id];
			return params || {};
		} else {
			return {};
		}
	};
	
	
	
	
	
	
	$.cc.getConfig = function(input) {
		var config = input.attr('config');
		if (config) {
			config = $.cc.toObject('{' + config + '}');
		} else {
			var configVar = input.attr('configVar');
			if (configVar) {
				var configVarObj = eval(configVar);
				var obj = {};
				for ( var p in configVarObj) {
					obj[p] = configVarObj[p];
				}
				config = obj;
			}
		}
		if (config == null || config == '') {
			config = {};
		}
		config.xtype = input.attr("xtype");
		config = $.extend(config, input.data());
		return config;
	}
	$.cc.objsToStr = function(objList, key) {
		var ids = '';
		for (var i = 0; i < objList.length; i++) {
			if (key) {
				ids += objList[i][key] + ',';
			} else {
				ids += objList[i]['id'] + ',';
			}
		}
		if (ids != '') {
			ids = ids.substr(0, ids.length - 1);
		}
		return ids;
	}

	$.cc.log = function(dd) {
		if ($.cc.browser.type.indexOf('IE') > -1) {
			alert(dd);
		} else {
			console.log(dd);
		}
	}

	$.cc.getUUID = function(length) {
		if (length) {
			var uuid = 'UUID' + UUID.prototype.createUUID();
			return uuid.substr(uuid.length - length);
		} else {
			return 'UUID' + UUID.prototype.createUUID();
		}
	}
	$.cc.getDate = function() {
		return new Date();
	}
	$.cc.toObject = function(string) {
		try {
			var j = "(" + string + ")";
			return eval(j);
		} catch (e) {
			try {
				console.log(e);
			} catch (e) {
			}
		}
	}
	$.cc.toInt = function(str) {
		if (str) {
			return parseInt(str);
		} else {
			return 0;
		}
	}
	$.cc.listToObject = function(dataList) {
		var params = {};
		if (dataList) {
			if (typeof dataList == 'string') {
				dataList = $.cc.toObject(dataList);
			}
			for (var i = 0; i < dataList.length; i++) {
				params[dataList[i].id] = dataList[i];
			}
		}
		return params;
	}
	$.cc.renderValue = function(value, render, item) {
		if (render == 'datetime') {
			value = $.cc.dateTimeToString(value);
		} else if (render == 'date') {
			value = $.cc.dateToString(value);
		} else if (render == 'bool') {
			if (value == 1) {
				value = '<font color=green>是</font>'
			} else {
				value = '<font color=red>否</font>'
			}
		} else if (render) {
			if (typeof render == "string") {
				value = eval(render + "(value,item)");
			} else {
				value = render(value, item);
			}
		}
		if (value != 0) {
			value = value || '';
		}
		return value;
	}
	$.cc.cmpchar = function(value, length, cr) {
		var l = length - ((value + "").length);
		var chr = '';
		for (var i = 0; i < l; i++) {
			chr += cr;
		}
		return chr + value;
	}
	$.cc.dateToString = function(date) {
		if (date) {
			date = new Date(date);
			return date.getFullYear() + '-'
					+ $.cc.cmpchar((date.getMonth() + 1), 2, '0') + '-'
					+ $.cc.cmpchar(date.getDate(), 2, '0');
		} else {
			return '';
		}
	}
	$.cc.dateTimeToString = function(date) {
		if (date) {
			date = new Date(date);
			return date.getFullYear() + '-'
					+ $.cc.cmpchar((date.getMonth() + 1), 2, '0') + '-'
					+ $.cc.cmpchar(date.getDate(), 2, '0') + ' '
					+ $.cc.cmpchar(date.getHours(), 2, '0') + ':'
					+ $.cc.cmpchar(date.getMinutes(), 2, '0') + ':'
					+ $.cc.cmpchar(date.getSeconds(), 2, '0');
		} else {
			return '';
		}
	}
	$.cc.millisecondTOHHMMSS = function(millisecond) {
		if (!millisecond) {
			return "0天00时00分00秒";
		}
		var hour = parseInt(millisecond / (60 * 60 * 1000));
		var day = parseInt(hour / 24);
		var minute = parseInt((millisecond - hour * 60 * 60 * 1000) / (60 * 1000));
		var second = parseInt((millisecond - hour * 60 * 60 * 1000 - minute * 60 * 1000) / 1000);
		if (second >= 60) {
			second = second % 60;
			minute += parseInt(second / 60);
		}
		if (minute >= 60) {
			minute = minute % 60;
			hour += parseInt(minute / 60);
		}
		if (hour >= 24) {
			hour = hour % 24;
			day += parseInt(hour / 24);
		}
		var sh = "";
		var sm = "";
		var ss = "";
		if (hour < 10) {
			sh = "0" + hour;
		} else {
			sh = hour;
		}
		if (minute < 10) {
			sm = "0" + minute;
		} else {
			sm = minute;
		}
		if (second < 10) {
			ss = "0" + second;
		} else {
			ss = second;
		}
		var returnStr = '';
		if (day != 0) {
			returnStr += day + "天";
		}
		if (sh != '00') {
			returnStr += sh + "时";
		}
		if (sm != '00') {
			returnStr += sm + "分";
		}
		if (ss != '00') {
			returnStr += ss + "秒";
		}
		return returnStr;
	}
	$.cc.stringToDate = function(str) {
		return new Date(str.replace(/-/g, "/"));
	}
	$.cc.toString = function(o) {// 核心函数
		return JSON.stringify(o);
		if (o == undefined) {
			return null;
		}
		var r = [];
		if (typeof o == "string") {
			if (!isNaN(o)) {
				return o;
			} else {
				return "\'"
						+ o.replace(/([\'\\])/g, "\\$1").replace(/(\n)/g, "\\n")
								.replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t")
						+ "\'";
			}
		}
		if (typeof o == "object") {
			if (!o.sort) {
				for ( var i in o) {
					var objTostr2Value = $.cc.toString(o[i]);
					r.push("\'" + i + "\':"
							+ (objTostr2Value == '' ? "\'\'" : objTostr2Value));
				}
				if (!!document.all
						&& !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/
								.test(o.toString)) {
					r.push("toString:" + o.toString.toString());
				}
				r = "{" + r.join() + "}"
			} else {
				for (var i = 0; i < o.length; i++)
					r.push($.cc.toString(o[i]))
				r = "[" + r.join() + "]";
			}
			return r;
		}
		return o.toString().replace(/\"\:/g, '":""');
	}
	$.cc.iframeLoad = function(iframe, callback) {
		if (iframe.attachEvent) {
			iframe.attachEvent("onload", callback);
		} else {
			iframe.onload = callback;
		}
	}
	$.cc.isE = function(value) {
		return new RegExp(/^[a-zA-Z\ \']+$/).test(value);
	}
	$.cc.isDate = function(value) {
		return new RegExp(
				/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/)
				.test(value)
				|| new RegExp(
						/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
						.test(value);
	}
	$.cc.watermark = function(input, watermark) {
		var c = 'watermark';
		input.attr('placeholder', watermark);
		// if(input.attr('type')=='password'){
		// input.data('password','1');
		// }
		input.data('color', input.css('color'))
		var e = function() {
			if ($(this).data('watermark_focus') != '1'
					|| !$(this).data('watermark_focus')) {
				var input2 = $(this);
				var placeholder = input2.attr('placeholder');
				if (input2.val() && input2.val() != placeholder) {
					// if(input2.data('password')=='1'){
					// input2.attr('type','password');
					// }
					$(this).data('watermark_value', '0');
					input2.css('color', input2.data('color'))
				} else {
					// if(input2.data('password')=='1'){
					// input2.attr('type','text');
					// }
					$(this).data('watermark_value', '1');
					input2.val(placeholder);
					input2.css('color', '#999')
				}
			}
		}
		input.focus(function() {
			$(this).data('watermark_focus', '1');
			var t = $(this).attr('placeholder');
			if ($(this).val() == t) {
				$(this).val('');
			}
		});
		input.blur(function() {
			$(this).data('watermark_focus', '0');
		}).keyup(function() {
			$(this).data('watermark_focus', '0');
		});

		input.change(e).blur(e).focus(e);
		input.change().blur();
	}

	$.cc.formatText = function(value, format) {
		if (format == '#,##0.00') {
			return Lawyee.outputmoney(value, 2);
		} else if (format == '#,##0') {
			return Lawyee.outputmoney(value, 0);
		} else if (format == '0.00') {
			if (isNaN(value) || value == "") {
				return "";
			}
			return (Math.round(value * 100) / 100).toFixed(2);
		} else if (format == '#0.0#') {
			if (isNaN(value) || value == "") {
				return "";
			}
			return (Math.round(value * 10) / 10).toFixed(1);
		} else if (format == '#0%') {
			value = value.replace(/\%/g, "");
			if (isNaN(value) || value == "") {
				return "";
			}
			return (Math.round(value * 1) / 1) + '%';
		} else if (format == '#0.0%') {
			value = value.replace(/\%/g, "");
			if (isNaN(value) || value == "") {
				return "";
			}
			return (Math.round(value * 10) / 10).toFixed(1) + '%';
		} else if (format == '#0.00%') {
			value = value.replace(/\%/g, "");
			if (isNaN(value) || value == "") {
				return "";
			}
			return (Math.round(value * 100) / 100).toFixed(2) + '%';
		} else if (format == '¤#0') {
			value = value.replace(/\￥/g, "");
			if (isNaN(value) || value == "") {
				return "";
			}
			return '￥' + (Math.round(value * 1) / 1);
		} else if (format == '¤#0.00') {
			value = value.replace(/\￥/g, "");
			if (isNaN(value) || value == "") {
				return "";
			}
			return '￥' + (Math.round(value * 100) / 100).toFixed(2);
		} else if (format == '¤#,##0') {
			value = value.replace(/\￥/g, "");
			value = Lawyee.outputmoney(value, 0)
			return '￥' + value;
		} else {
			return value;
		}
	}
	$.cc.fn = {
			setAttr : function(span, widget, config) {
				if (config.class_) {
					widget.addClass(config.class_);
				}
				if (config.xtype == 'password' || config.xtype == 'text') {
					widget.addClass('hh_input');
				} else if (config.xtype == 'textarea' || config.xtype == 'ckeditor') {
					widget.addClass('hh_textarea');
					widget.val(config.defaultValue);
				}
				if (config.id) {
					widget.attr('id', config.id);
				}
				if (config.name) {
					widget.attr('name', config.name);
				}
				if (config.style) {
					widget.attr('style', config.style);
				}
				if (config.width) {
					widget.css('width', config.width);
				}
				if (config.disabled) {
					widget.css('disabled', config.disabled);
				}
				var validate = $.cc.validation.getValidate(config);
				if (validate) {
					widget.addClass(validate);
				}
				if (config.readonly) {
					widget.attr('readonly', config.readonly);
					widget.css('border', 0);
					widget.css('border-bottom', '1px solid #B5B8C8');
				}
			},
			renderSelect : function(span, config, paramMap) {
				span.empty();
				var id = $.cc.getUUID();
				if (config.id) {
					id = config.id;
				}
				var hiddenid = id + "_hidden";
				var textid = id + "_text";
				var hidden = $('<input id="' + hiddenid + '" type="hidden" name="'
						+ config.name + '" />');
				delete config.name;
				var text = $('<input id="' + textid
						+ '" type="text" class="hh_input" readonly=true />');

				if (config.textarea) {
					text = $('<textarea  id="' + textid
							+ '"  readonly=true style="height:70px;"></textarea>');
				}

				text.attr('params', $.cc.toString(config.params));

				var width = config.width || '100%';
				delete config.width;
				$.cc.fn.setAttr(span, text, config);

				var params = {
					config : config
				};
				params.span = span;
				params.hiddenField = hidden;
				params.textField = text;
				params.url = config.url;
				params.onChange = function(selectData, change) {
					if (config.onChange) {
						config.onChange(selectData, change);
					}
				}
				params.openurl = paramMap.openurl;
				params.width = paramMap.width;
				params.height = paramMap.height;
				params.params = config.params || {};

				// params = $.cc.toString(params);
				var a = $('<button>选择</button>');
				a.button({
					icons : {
						primary : "ui-icon-plus"
					},
					text : false
				})
				a.click(function() {
					$.cc.fn.showSelectTree(params);
					return false;
				});

				var a1 = $('<button>清空</button>');
				a1.button({
					icons : {
						primary : "ui-icon-minus"
					},
					text : false
				})

				var selectType = config.selectType || 'radio';
				a1.click(function() {
					var baseValue = hidden.val();
					hidden.val('');
					text.val('');
					params.onChange(selectType == 'radio' ? null : [],
							baseValue != null && baseValue != '');
					return false;
				});
				var $table = $('<table style="font-size: 12" width='
						+ width
						+ ' cellspacing="0" cellpadding="0" ><tr><td ></td><td width="73px" style="text-align:right;"></td><tr></table>');
				$table.find("td").eq(0).append(hidden).append(text);
				$table.find("td").eq(1).append(a1).append(a);
				span.append($table);
			},
			showSelectTree : function(params) {
				Dialog.open({
					title : params.title,
					width : params.width || 280,
					height : params.height || 450,
					params : {
						config : params.config,
						url : params.url,
						params : params.params,
						span : params.span,
						hiddenField : params.hiddenField,
						textField : params.textField,
						onChange : params.onChange
					},
					url : params.openurl
				});
			},
			getIdTextValue : function(span, config) {
				var value = span.find('input:hidden').val();
				return value;
			},
			setIdTextValue : function(span, config, value) {
				if (typeof value == "object" && value) {
					span.find('input:text').val(value.text);
					span.find('textarea').val(value.text);
					span.find('input:hidden').val(value.id);
				} else {
					span.find('input:text').val('');
					span.find('textarea').val('');
					var tableName = config.tableName;
					var findTextAction = config.findTextAction
							|| 'system-GlobalComboBoxTree-findTextById';
					if (value && value != 'root'
							&& (tableName || config.findTextAction)) {
						Request.request(findTextAction, {
							data : {
								id : value,
								table_name : tableName
							},
							defaultMsg : true,
							callback : function(result) {
								value = result.id;
								span.find('input:hidden').val(value);
								span.find('input:text').val(result.text);
								span.find('textarea').val(result.text);
								span.setConfig({
									text : result.text
								});
								if (span.getConfig('toView')) {
									span.html(result.text);
								}
							}
						});
					}
					span.find('input:hidden').val(value);
				}
			}
		};

	$.cc.validation = {
			validation : function(form) {
				form.validationEngine();
			},
			check : function(formId, callback) {
				if ($("#" + formId).validationEngine('validate')) {
					return callback($("#" + formId).getValue());
				} else {
					Dialog.errormsg("验证失败！！");
				}
			},
			getValidate : function(config) {
				var validate = '';
				if (config.required) {
					validate += 'required,';
				}
				if (config.maxSize) {
					validate += 'maxSize[' + config.maxSize + '],';
				}
				if (config.minSize) {
					validate += 'minSize[' + config.minSize + '],';
				}
				if (config.min || config.min == 0) {
					validate += 'min[' + config.min + '],';
				}
				if (config.max) {
					validate += 'max[' + config.max + '],';
				}
				if (config.email) {
					validate += 'custom[email],';
				}
				if (config.integer) {
					validate += 'custom[integer],';
				}
				if (config.number) {
					validate += 'custom[number],';
				}
				if (config.yw) {
					validate += 'custom[onlyLetterSp],';
				}
				if (config.image) {
					validate += 'custom[image],';
				}

				if (validate) {
					validate = validate.substr(0, validate.length - 1);
					return 'validate[' + validate + ']';
				}
				return '';
			}
		};
	$.cc.value = {
			getAreaValue : function(form) {
				var spanList = [];
				form.find($.cc.widgetFind).each(function() {
					if ($(this).parents('[xtype=tableitem]').length == 0) {
						spanList.push($(this));
					}
				});
				var values = {};
				for (var i = 0; i < spanList.length; i++) {
					var span = spanList[i];
					var config = $.cc.getConfig(span);
					var value = $.cc.value.getValueBySpan(span, config);
					values[config.name] = value;
				}
				return values;
			},
			getValueBySpan : function(span, config) {
				if (config == null) {
					config = $.cc.getConfig(span);
				}
				var xtype = config.xtype;
				var value = '';
				if (span.getConfig('toView')) {
					return span.getConfig('value');
				}
				if ($.cc[xtype] && $.cc[xtype].getValue) {
					value = $.cc[xtype].getValue(span, config);
				}
				return value;
			},
			setAreaValue : function(form, values, formConfig) {
				form.find($.cc.widgetFind).each(
						function() {
							if ($(this).parents('[xtype=tableitem]').length == 0) {
								var config = $.cc.getConfig($(this));
								$.cc.value.setValueBySpan($(this), values[config.name],
										config);
								if (formConfig.view == true) {
									$(this).toView(config);
								}
							}
						});
			},
			setValueBySpan : function(span, value, config) {
				if (typeof value == "object") {
					if ($.isEmptyObject(value)) {
						value = null;
					}
				}
				if (config == null) {
					config = $.cc.getConfig(span);
				}
				var xtype = config.xtype;
				span.setConfig({
					value : value,
					text : value
				});
				if ($.cc[xtype] && $.cc[xtype].setValue) {
					$.cc[xtype].setValue(span, config, value);
				}
			},
			setViewValueBySpan : function(span, config) {
				var xtype = span.attr('xtype');
				if (config == null) {
					config = $.cc.getConfig(span);
				}
				span.setConfig({
					'toView' : true
				});
				if ($.cc[xtype] && $.cc[xtype].toView) {
					$.cc[xtype].toView(span, config);
				} else {
					span.children().hide();
					span.append('<span type="text_span">' + (span.data('text') || '')
							+ '</span>');
				}
			}
		};
	$.cc.nheight = function(dom, height, mheight) {
		if (height && height > 0) {
			var funObj = {
				fun : function(bodyHeight) {
					var hheight = bodyHeight - height;
					if (mheight >= hheight) {
						hheight = mheight;
					}
					var obj = {
						'height' : hheight
					}
					if (!this.dom.hasClass('cke_contents')) {
						obj['overflow'] = 'auto';
					}
					this.dom.css(obj);
				},
				'dom' : dom,
				'zuixiao' : mheight
			};
			$.cc.setHeightMap[$.cc.getUUID()] = funObj;
			funObj.fun($.cc.browser.getHeight());
		}
	};
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
		var  src='';
		if (this.url != null) {
			// var form = $(this.formHtml);
			var doinghtml = '<div id="' + id + '_div" style="height:55px;">'
					+ Doing.doingdivhtml3 + '</div>';
			html += doinghtml + "<iframe id='" + id + "iframe' name='" + id
					+ "iframe' frameborder=0  width=100% height=100% src='"
					+ '' + "' />";
			if (dialog.params) {
				$.cc.setFrameParams(id + 'iframe', dialog.params);
			}
			src=Request.getHref(this.url, this.urlParams);
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
		$("#" + id+ 'iframe').attr('src',src);
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
					close : function(event, ui) {
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
//									if (width > $.cc.browser.getWidth()) {
//										width = $.cc.browser.getWidth();
//									}
									param.width = width;
								}
								if (height) {
//									if (height > $.cc.browser.getHeight()) {
//										height = $.cc.browser.getHeight();
//									}
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
	};
	if(!this.window.DialogClass && !window.parent.DialogClass){
		this.window.DialogClass=DialogClass;
	}else if(window.parent.DialogClass){
		this.window.DialogClass=window.parent.DialogClass;
	}
	
	//
	var parentTheme = $.cc.getRootFrame().$('#jqueryuicss').attr('href');
	var theme = $('#jqueryuicss').attr('href');
	if (parentTheme && theme && theme.indexOf(parentTheme) == -1
			&& parentTheme.indexOf(theme) == -1) {
		$('#jqueryuicss').attr('href', parentTheme);
	}
	$.fn.render = function(configParams) {
		var config = $.cc.getConfig($(this));

		if (($(this).attr('id') == null || $(this).attr('id') == '')
				&& (config.name || config.id)) {
			if (config.id) {
				$(this).attr('id', 'span_' + config.id);
			} else {
				$(this).attr('id', 'span_' + config.name);
			}
		}

		config.widget = $(this);
		if (configParams && configParams != 'initRender') {
			$.extend(config, configParams);
		}
		$(this).data(config);
		if ((config.render == false || config.render == 'false')
				&& configParams == 'initRender') {
			return;
		}
		var xtype = config.xtype;

		if ($.cc[xtype] && $.cc[xtype].render) {
			$.cc[xtype].render($(this), config);
		}

		if (config.hidden == true) {
			$(this).hide();
		}
	}
	$.fn.renderAll = function() {
		$(this).find("[xtype]").each(function() {
			$(this).render();
		});
		$(this).render();
	}

	$.fn.setConfig = function(config) {
		for ( var p in config) {
			$(this).data(p, config[p]);
		}
	}

	$.fn.getConfig = function(key) {
		var config = null;
		if (key) {
			config = $(this).data(key);
		} else {
			config = $(this).data();
			if ($.isEmptyObject(config)) {
				config = $.cc.getConfig($(this));
			}
		}
		return config;
	}

	$.fn.getWidget = function() {
		var xtype = this.attr('xtype');
		var config = $.cc.getConfig($(this));
		var span = $(this);
		if ($.cc[xtype] && $.cc[xtype].getWidget) {
			return $.cc[xtype].getWidget($(this), config);
		}
		var object = {
			widget : span
		};
		return object;
	};

	$.fn.getValue = function() {
		var xtype = this.attr('xtype');
		if ($.cc.widgetList.inArray(xtype)) {
			return $.cc.value.getValueBySpan(this);
		} else {
			return $.cc.value.getAreaValue(this);
		}
	};
	$.fn.setValue = function(value, params) {
		var xtype = this.attr('xtype');
		var config = $.cc.getConfig($(this));
		if (params) {
			$.extend(config, params);
		}
		if ($.cc.widgetList.inArray(xtype)) {
			$.cc.value.setValueBySpan(this, value, config);
			if (config.view == true) {
				this.toView(config);
			}
		} else {
			$.cc.value.setAreaValue(this, value || {}, config);
		}
	};

	$.fn.getValueData = function() {
		var xtype = this.attr('xtype');
		return $.cc[xtype].getValueData($(this), $.cc.getConfig($(this)))
	}

	$.fn.toView = function(paramConfig) {
		var config = paramConfig;
		if (config == null) {
			config = $.cc.getConfig($(this));
		}
		$.cc.value.setViewValueBySpan($(this), config);
	};

	$.fn.setValueName = function(values) {
		for ( var p in values) {
			var field = $(this).find('[domName=' + p + ']');
			var value = values[p];
			var render = field.attr('render');
			value = $.cc.renderValue(value, render);
			try {
				field.html(value);
			} catch (e) {
				field.text(value);
			}
		}
	};

	$.fn.disabled = function(value) {
		var xtype = this.attr('xtype');

		if ($.cc[xtype] && $.cc[xtype].disabled) {
			return $.cc[xtype].disabled($(this));
		} else {
			if ($(this).find('[widgettype=mask]').length == 0) {
				value = value || '';
				$(this)
						.append(
								$('<div widgettype="mask" style="position: absolute;	top: 0;	left: 0;	z-index: 10;	width: 100%;	height: 100%;	background-color: #fff;	filter: alpha(opacity =       40);	-moz-opacity: 0.4;	opacity: 0.4;	z-index: 700;"><h1 style="text-align:center;padding-top: 100px;">'
										+ value + '</h1></div>'));
			}
		}
	};
	$.fn.undisabled = function() {
		var xtype = this.attr('xtype');
		if ($.cc[xtype] && $.cc[xtype].undisabled) {
			return $.cc[xtype].undisabled($(this));
		} else {
			$(this).find('[widgettype=mask]').remove();
		}
	};

	$.fn.loadData = function(params) {
		if (params) {
			$(this).setConfig(params);
		}
		var config = $.cc.getConfig($(this));
		var xtype = config.xtype;
		if (xtype == 'tree') {
			$.cc.tree.refresh($(this).find('ul').attr('id'));
		} else if (xtype == 'pagelist') {
			$.cc.pagelist.loadData(config);
		}
	};

	/*
	 * $("[title]").each(function() {
	 * if(!$(this).hasClass('ui-layout-resizer')){ $(this).tooltip(); } });
	 */
//	//HeightSet.triggerCustomHeightSet();
//	if (HeightSet.cResizeTimer) {
//		clearTimeout(HeightSet.cResizeTimer)
//	}
//	HeightSet.cResizeTimer = setTimeout("HeightSet.triggerCustomHeightSet()",
//			500);
//	window.onresize = function() {
//		if (HeightSet.cResizeTimer) {
//			clearTimeout(HeightSet.cResizeTimer)
//		}
//		HeightSet.cResizeTimer = setTimeout(
//				"HeightSet.triggerCustomHeightSet()", 100)
//	};
	$("div[xtype=hh_content]").eq(0).addClass('hh_content');
	try {
		if (!$.isEmptyObject(operPower)) {
			$('[xtype=button]').each(function() {
				if (operPower[$(this).find('span').html()] == true) {
					$(this).disabled();
				}
			});
		}
	} catch (e) {
	}
	init();
	var hh_onload = window.onload;

		if($.cc.property){
			for ( var p in $.cc.property.execLoad) {
				$.cc.property.execLoad[p]();
			}
		}
		if (hh_onload) {
			hh_onload();
		}
	
	return $;
});
