Array.prototype.inArray = function(eeee) {
	for (aaa = 0; aaa < this.length; aaa++) {
		if (this[aaa] == eeee) {
			return true;
		}
	}
	return false;
}

$.cc = $.cc || {};

$.cc.params = {};
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
		var params = $.cc.getRootFrame().$.cc.params[window.frameElement.id];
		// delete
		// $.cc.getRootFrame().$.cc.params[window.frameElement.id];
		return params || {};
	} else {
		return {};
	}
};
// 全局的ajax访问，处理ajax清求时sesion超时
$.ajaxSetup({
	contentType : "application/x-www-form-urlencoded;charset=utf-8",
	complete : function(XMLHttpRequest, textStatus) {
		/*if (XMLHttpRequest.getResponseHeader) {
			var sessionstatus = XMLHttpRequest
					.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus，
			if (sessionstatus == "timeout") {
				$.cc.timeout();
				return false;
			}
		}*/
	}
});

var Request = {
	request : function(url, config, callb) {
		if (config == null) {
			config = {};
		}
		if (config.callback == null) {
			config.callback = callb;
		}
		if (config.doing != false) {
			Doing.show();
		}
		$
				.ajax({
					type : "POST",
					url : url,
					async : config.async != false,
					data : config.data,
					error : function(resulttext) {
						try {
							var result = $.cc.toObject(resulttext.responseText);
							Doing.hide();
							Dialog.error(result.msg);
						} catch (ex) {
							if (config.callback) {
								config.callback({
									success : false
								});
							}
							Dialog.error('服务器异常！重新登录系统，或联系管理员.....');
						}
					},
					success : function(resulttext) {
						var result = $.cc.toObject(resulttext);
						if(result && result.sessionstatus == 'no_authority'){
							Doing.hide();
							Dialog.alert(result.sessionstatusMsg);
							result.success=false;
							return;
						}else if(result && result.sessionstatus == 'timeout'){
							Doing.hide();
							$.cc.timeout();
							result.success=false;
							return;
						}
						Doing.hide();
						if ((resulttext != null && resulttext != '' && resulttext != 'null')
								&& result == null) {
							Dialog.error(resulttext);
							return;
						}
						result = result || {
							success : true
						};
						if (config.defaultMsg != false
								&& result.success == true) {
							if (result && result.returnModel) {
								result.success = false;
								var returnModel = result.returnModel;
								if (returnModel.href == null
										|| returnModel.href == "") {
									switch (returnModel.type) {
									case "ok":
										Dialog.infomsg(returnModel.msg);
										break;
									default:
										Dialog.errormsg(returnModel.msg);
										break;
									}
								} else {
									Doing.show();
									Request.href(returnModel.href);
								}
							} else {
								Dialog.okmsg('操作成功！！');
							}
						}
						try {
							if (config.callback) {
								config.callback(result);
							}
						} catch (e) {
							$.cc.log(e);
						}
					}

				});
	},
	href : function(url) {
		window.location.href = url;
	},
	submit : function(action, params) {
		var form = document.getElementById('system_open_page_form');
		if (form == null) {
			var bodys = document.getElementsByTagName('body');
			form = document.createElement('form');
			form.setAttribute('id', 'system_open_page_form');
			form.setAttribute('method', 'post');
			form.setAttribute('target', '_blank');
			var input = document.createElement('input');
			input.setAttribute('type', 'hidden');
			input.setAttribute('name', 'params');
			input.setAttribute('id', 'system_open_page_form_params');
			form.appendChild(input);
			bodys[0].appendChild(form);
		}
		form.target = '_blank';
		form.action = action;
		document.getElementById('system_open_page_form_params').value = $.cc
				.toString(params);
		form.submit();
	},
	openwin : function(pageURL, config) {
		config = config || {};
		var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1"; // 定义弹出窗口的参数
		if (window.screen) {
			var ah = screen.availHeight - 65;
			var aw = screen.availWidth - 10;
			fulls += ",height=" + ah;
			fulls += ",innerHeight=" + ah;
			fulls += ",width=" + aw;
			fulls += ",innerWidth=" + aw;
			fulls += ",resizable"
		} else {
			fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。 manually
		}
		var name = (config.id || new Date().getTime())+'';
		name = ('name' + name).replace(/-/g, '').replace(/_/g, '');
		var subwin = window.open(pageURL, name, fulls);
		subwin.focus();
		return subwin;
	},
	getHref : function(url, params) {
		if (params) {
			if (url.indexOf('?') > -1) {
				return url + '&' + $.param(params);
			} else {
				return url + '?' + $.param(params);
			}
		} else {
			return url;
		}
	},
	download : function(id) {
		var form = document.getElementById('system_open_page_file_form');
		if (form == null) {
			var bodys = document.getElementsByTagName('body');
			form = document.createElement('form');
			form.setAttribute('id', 'system_open_page_file_form');
			form.setAttribute('method', 'post');
			form.setAttribute('target', '_blank');
			var input = document.createElement('input');
			input.setAttribute('type', 'hidden');
			input.setAttribute('name', 'params');
			input.setAttribute('id', 'system_open_page_file_form_params');
			form.appendChild(input);
			bodys[0].appendChild(form);
		}
		form.target = '_blank';
		form.action = 'system-File-download';
		document.getElementById('system_open_page_file_form_params').value = "{id:'"
				+ id + "'}";
		form.submit();
	},
	downloadFile : function(url, param) {
		var form = document.getElementById('system_open_page_file_form');
		if (form == null) {
			var bodys = document.getElementsByTagName('body');
			form = document.createElement('form');
			form.setAttribute('id', 'system_open_page_file_form');
			form.setAttribute('method', 'post');
			form.setAttribute('target', '_blank');
			var input = document.createElement('input');
			input.setAttribute('type', 'hidden');
			input.setAttribute('name', 'params');
			input.setAttribute('id', 'system_open_page_file_form_params');
			form.appendChild(input);
			bodys[0].appendChild(form);
		}
		form.target = '_blank';
		form.action = url;
		document.getElementById('system_open_page_file_form_params').value = $.cc
				.toString(param);
		form.submit();
	}
}

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
}

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
}

var HeightSet = {
	cResizeTimer : null,
	triggerCustomHeightSet : function() {
		var a = $.cc.browser.getHeight();
		try {
			set_height(a);
		} catch (e) {
		}
	}
}
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
var hh_onload = window.onload;
window.onload = function() {
	if($.cc.property){
		for ( var p in $.cc.property.execLoad) {
			$.cc.property.execLoad[p]();
		}
	}
	if (hh_onload) {
		hh_onload();
	}
};
// 用这个鼠标移开控件就会触发事件
$(document).ready(function() {
	$("[xtype=form]").each(function() {
		var config = $.cc.getConfig($(this));
		if ($(this).is('form')) {
			$.cc.validation.validation($(this), config);
		}
	});
});