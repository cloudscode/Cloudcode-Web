var myDesktopApp = null;

var Request = {
	request : function(url, params, callback, config) {
		if (config == null) {
			config = {};
		}
		 $.ajax({
		        url: url,
		        type: 'post',
		        dataType: 'json',
		        data:params,
		        success: function(data) {
		       		 $('body').wHumanMsg('theme', 'black').wHumanMsg('msg', '数据保存成功！', {fadeIn: 300, fadeOut: 300});
		        }
	    });
		//Doing.hidden(false);
		/*Ext.Ajax.request({
			url : url,
			params : params,
			failure : function(response) {
				Doing.hidden(true);
				try {
					ExtFrame.error(Ext.decode(response.responseText).msg);
				} catch (ex) {
					ExtFrame.error('服务器异常！重新登录系统，或联系管理员.....');
				}
			},
			success : function(response) {
				Doing.hidden(true);
				var resultObject = null;
				if (response.responseText != null
						&& '' != response.responseText) {
					resultObject = Ext.decode(response.responseText);
				}
				if (config.isDefaultMsg == true) {
					var isSuccess = Request.success(resultObject) == 0 ? true
							: false;
					if (resultObject == null) {
						resultObject = {};
					}
					resultObject.isSuccess = isSuccess;
				}
				if (callback) {
					callback(resultObject);
				}
			}
		});*/
	},
	success : function(returnModel) {
		if ((returnModel == null || returnModel.success == true)) {
			if (returnModel == null || returnModel.returnModel == null) {
				Ext.example.msg('提示', '操作成功！！');
				return 0;
			} else {
				returnModel = returnModel.returnModel;
			}
		}
		if (returnModel.href == null || returnModel.href == "") {
			switch (returnModel.type) {
			case "ok":
				Ext.MessageBox.show({
					title : returnModel.titleMsg,
					msg : returnModel.msg,
					buttons : Ext.MessageBox.OK,
					icon : returnModel.icon
				});
				break;
			case "ok_cancel":
				Ext.MessageBox.show({
					title : returnModel.titleMsg,
					msg : returnModel.msg,
					buttons : Ext.MessageBox.OKCANCEL,
					icon : "x-message-box-question"
				});
				break;
			case "yes_no_cancel":
				Ext.MessageBox.show({
					title : returnModel.titleMsg,
					msg : returnModel.msg,
					buttons : Ext.MessageBox.YESNOCANCEL,
					icon : "x-message-box-question"
				});
				break;
			default:
				Ext.MessageBox.show({
					title : returnModel.titleMsg,
					msg : returnModel.msg,
					buttons : Ext.MessageBox.OK,
					icon : "x-message-box-error"
				});
				break;
			}
			return 1;
		} else {
			Doing.hidden(false);
			if ('webapp-desktop-desktop' == returnModel.href) {
				window.onbeforeunload = null;
			}
			Request.href(returnModel.href);
		}
	},
	error : function(returnModel) {
		if (returnModel == null ? false : returnModel.msg == null
				|| returnModel.msg == "" ? false : true) {
			Ext.MessageBox.show({
				title : returnModel.titleMsg,
				msg : returnModel.msg,
				buttons : Ext.MessageBox.OK,
				icon : "x-message-box-error"
			});
		}
	},
	href : function(url) {
		window.location.href = url;
	},
	createXMLHTTP : function() {
		if (static_var.xmlHttp != null) {
			return static_var.xmlHttp;
		}
		var xmlHttp = null;
		if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		} else {
			var xmlHttps = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.5.0",
					"MSXML2.XMLHttp4.0", "MSXML2.XMLHttp3.0", "MSXML2.XMLHttp",
					"Microsoft.XMLHTTP" ];
			for ( var i = 0; i < xmlHttps.length; i++) {
				try {
					xmlHttp = new ActiveXObject(xmlHttps[i]);
				} catch (error) {
				}
				if (xmlHttp)
					break;
			}
		}
		static_var.xmlHttp = xmlHttp;
		return xmlHttp;
	},
	synRequest : function(uri, params, callback, config) {
		Doing.hidden(false);
		if (config == null) {
			config = {};
		}
		var xmlhttp = Request.createXMLHTTP();
		var url = uri + "?date=" + new Date();
		xmlhttp.open('POST', url, false);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
				} else {
					Doing.hidden(true);
					try {
						ExtFrame.error(Ext.decode(xmlhttp.responseText).msg);
					} catch (ex) {
						ExtFrame.error('服务器异常！重新登录系统，或联系管理员.....');
					}
				}
			} else {
			}
		};
		xmlhttp.setRequestHeader('Content-Type',
				'application/x-www-form-urlencoded');
		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.send(params);
		Doing.hidden(true);
		if (config.returnType == 'string') {
			return xmlhttp.responseText;
		}
		var resultObject = eval("(" + xmlhttp.responseText + ")");
		if (resultObject == null) {
			return null;
		}
		if (resultObject.sessionstatus == 'timeout') {
			Login.show({
				jump : false
			});
			return {};
		} else if (resultObject.sessionstatus == "no_authority") {
			Ext.example.msg('提示', resultObject.sessionstatusMsg, 3000);
			return {};
		}
		if (!callback) {
			if (resultObject.success == false || resultObject.success == true) {
				Request.success(resultObject);
			}
		} else {
			callback(resultObject);
		}
		return resultObject;
	},
	synRequestObject : function(uri, params, callback, config) {
		var strParam = '';
		for ( var p in params) {
			strParam = strParam + '&' + p + '='
					+ (params[p] == null ? '' : params[p]);
		}
		return Request.synRequest(uri, strParam, callback, config);
	},
	loadJS : function(uri) {
		var xmlhttp = Request.createXMLHTTP();
		xmlhttp.open('POST', uri, false);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
				} else {
					try {
						ExtFrame.error(Ext.decode(xmlhttp.responseText).msg);
					} catch (ex) {
						ExtFrame.error('服务器异常！重新登录系统，或联系管理员.....');
					}
				}
			} else {
			}
		};
		xmlhttp.setRequestHeader('Content-Type',
				'application/x-www-form-urlencoded');
		xmlhttp.send();
		return eval("(" + xmlhttp.responseText + ")");
	}
}

var ExtFrame = {
	error : function(msg) {
		Ext.MessageBox.show({
			title : '错误',
			msg : msg,
			buttons : Ext.MessageBox.OK,
			icon : "x-message-box-error"
		});
	},
	info : function(msg) {
		Ext.MessageBox.show({
			title : '提示',
			msg : msg,
			buttons : Ext.MessageBox.OK,
			icon : "x-message-box-info"
		});
	},
	warning : function(msg) {
		Ext.MessageBox.show({
			title : '警告',
			msg : msg,
			buttons : Ext.MessageBox.OK,
			icon : "x-message-box-warning"
		});
	},
	msg : function(msg, time) {
		Ext.example.msg('提示', msg, time);
	}
}
var ExtUtil = {
	create : function(className, params) {
		if (params == null) {
			params = {};
		}
		$import(className);
		var windows = null;
		if (Util.isNull(params.id) || !(Ext.getCmp(params.id))) {
			windows = Ext.create(className, params);
		} else {
			windows = Ext.getCmp(params.id);
		}
		return windows;
	},
	open : function(className, params, winparams) {
		if (params.title == null || params.title == '') {
			params.icon = null;
			params.iconCls = null;
		}
		var panel = ExtUtil.create(className, params);
		return ExtUtil.openPanel(panel, winparams);
	},
	openPanel : function(panel, winparams) {
		var params = {
			title : panel.title,
			width : panel.width,
			height : panel.height,
			icon : panel.icon,
			modal : panel.modal,
			iconCls : panel.iconCls,
			panel : panel
		};
		if (winparams == null) {
			winparams = params;
		} else {
			Ext.apply(params, winparams);
		}
		var win = Ext.create('com.hh.base.BaseWindow', params);
		panel.setTitle("");
		panel.setIcon("");
		panel.setIconCls("");
		win.show();
		win.add(panel);
		return win;
	}
}
var Menu = {
	getTreeChildrens : function(menuid) {
		var hhXtCdList = static_var.loginuser.hhXtCdList;
		// var fatherMenu = null;
		var resultTreeChildrens = [];
		for ( var i = 0; i < hhXtCdList.length; i++) {
			var hhXtCd = hhXtCdList[i];
			if (hhXtCd.node == menuid) {
				var treeNode = {};
				Ext.apply(treeNode, hhXtCd);
				treeNode.id = hhXtCd.id;
				treeNode.text = hhXtCd.text;
				treeNode.leaf = hhXtCd.leaf;
				treeNode.action = hhXtCd.vsj;
				treeNode.vsj = hhXtCd.vsj;
				treeNode.icon = hhXtCd.icon;
				treeNode.params = hhXtCd.params;
				treeNode.vdtp = hhXtCd.vdtp;
				Menu.addTreeChildrens(treeNode, hhXtCdList);
				resultTreeChildrens.push(treeNode);
			}
		}
		return resultTreeChildrens;
	},
	addTreeChildrens : function(parentTreeNode, hhXtCdList) {
		parentTreeNode.children = [];
		for ( var i = 0; i < hhXtCdList.length; i++) {
			var hhXtCd = hhXtCdList[i];
			if (hhXtCd.node == parentTreeNode.id) {
				var treeNode = {};
				treeNode.id = hhXtCd.id;
				treeNode.text = hhXtCd.text;
				treeNode.leaf = hhXtCd.leaf;
				treeNode.action = hhXtCd.vsj;
				treeNode.vsj = hhXtCd.vsj;
				treeNode.icon = hhXtCd.icon;
				treeNode.params = hhXtCd.params;
				treeNode.vdtp = hhXtCd.vdtp;
				Menu.addTreeChildrens(treeNode, hhXtCdList);
				parentTreeNode.children.push(treeNode);
			}
		}
	},
	addMenuChildren : function(hhXtCdList, fatherMenu) {
		for ( var i = 0; i < hhXtCdList.length; i++) {
			var hhXtCd = hhXtCdList[i];
			if (hhXtCd.node == fatherMenu.id) {
				var startMenu = {
					text : hhXtCd.text,
					icon : hhXtCd.icon,
					id : hhXtCd.id,
					params : hhXtCd.params,
					handler : Menu.newWindow,
					vsj : hhXtCd.vsj
				};
				Ext.apply(startMenu, hhXtCd);
				this.addMenuChildren(hhXtCdList, startMenu);
				if (fatherMenu.menu == null) {
					fatherMenu.menu = {};
					fatherMenu.menu.items = [];
				}
				fatherMenu.menu.items.push(startMenu);
			}
		}
	},
	newWindow : function(data) {
		var parmas = {};
		parmas.id = data.id;
		parmas.title = data.text;
		parmas.icon = data.icon;
		parmas.params = data.params;
		parmas.vsj = data.vsj;
		if (data.vsj.substr(0, 3) != 'com') {
			return Desktop.openWindow('com.hh.global.BaseIframeWindow', parmas);
		} else {
			return Desktop.openWindow(data.vsj, parmas);
		}
	},
	classPathToUrl : function(classPath) {
		if (classPath != null && classPath != '') {
			return "src/" + classPath.replace(/\./g, '/') + ".js";
		} else {
			ExtFrame.error('功能未注册！');
		}
	}
}
var Json = {
	toObject : function(string) {
		try {
			var j = "(" + string + ")";
			return eval(j);
		} catch (e) {
			return null;
		}
	},
	objTostr : function(o) {// 核心函数
		if (o == undefined) {
			return null;
		}
		var r = [];
		if (typeof o == "string")
			return "\""
					+ o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n")
							.replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t")
					+ "\"";
		if (typeof o == "object") {
			if (!o.sort) {
				for ( var i in o) {
					var objTostr2Value = Json.objTostr(o[i]);
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
				for ( var i = 0; i < o.length; i++)
					r.push(Json.objTostr(o[i]))
				r = "[" + r.join() + "]";
			}
			return r;
		}
		return o.toString().replace(/\"\:/g, '":""');
	},
	objTostr2 : function(o) {// 核心函数
		if (o == undefined) {
			return null;
		}
		var r = [];
		if (typeof o == "string") {
			if (!isNaN(o)) {
				// return parseFloat(o);
				return o;
			} else {
				return "\'"
						+ o.replace(/([\'\\])/g, "\\$1")
								.replace(/(\n)/g, "\\n")
								.replace(/(\r)/g, "\\r")
								.replace(/(\t)/g, "\\t") + "\'";
			}

		}
		if (typeof o == "object") {
			if (!o.sort) {
				for ( var i in o) {
					var objTostr2Value = Json.objTostr2(o[i]);
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
				for ( var i = 0; i < o.length; i++)
					r.push(Json.objTostr2(o[i]))
				r = "[" + r.join() + "]";
			}
			return r;
		}
		return o.toString().replace(/\'\:/g, '":""');
	}
}
var static_var = {
	loginuser : {},
	pageSize : 15,
	xmlHttp : null,
	loadClasss : {
		'com.hh.base.BaseServicePanel' : "com.hh.base.BaseServicePanel"
	}
}
var Browser = {
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
		Browser.type = "IE6";
	} else if (g == "7.0") {
		Browser.type = "IE7";
	} else if (g == "8.0") {
		Browser.type = "IE8";
	} else if (g == "9.0") {
		Browser.type = "IE9";
	} else if (g == "10.") {
		Browser.type = "IE10";
	}else{
		Browser.type = "Other";
	}
} else {
	if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
		Browser.type = "Firefox";
	} else if (window.navigator.userAgent.indexOf("Opera") >= 0) {
		Browser.type = "Opera";
	}else if (window.navigator.userAgent.indexOf("Chrome") >= 0) {
		Browser.type = "Chrome";
	}  else if (window.navigator.userAgent.indexOf("Safari") >= 1) {
		Browser.type = "Safari";
	} else {
		Browser.type = "Other";
	}
}
var Class = {
	loadJS : function(js, callback) {
		if (js == null || js == '') {
			return;
		}
		var id = js;
		var scriptId = document.getElementById(id);
		if (scriptId) {
			callback();
		} else {
			var script = document.createElement("script");
			script.id = id;
			script.type = "text/javascript";
			if (callback) {
				script.onload = script.onreadystatechange = function() {
					if (script.readyState && script.readyState != 'loaded'
							&& script.readyState != 'complete') {
						return;
					}
					script.onreadystatechange = script.onload = null;
					callback();
				};
			}
			script.src = js;
			var head = document.getElementsByTagName('head').item(0);
			head.appendChild(script);
		}
	}
}
var Util = {
	getHtml : function(title, heads, names, data) {
		var headHtml = '<table width="100%" border=1 cellspacing="0">	<caption><h1>'
				+ title + '</h1><br /></caption>';
		headHtml += '<tr>';
		for ( var i = 0; i < heads.length; i++) {
			headHtml += '<td><b>' + heads[i] + '</b></td>';
		}
		headHtml += '</tr>';

		var tempStr = "<tr>";
		for ( var i = 0; i < names.length; i++) {
			tempStr += '<td>{' + names[i] + '}</td>';
		}
		tempStr += "</tr>";
		var tpl = Ext.create('Ext.XTemplate', '<tpl for=".">', tempStr,
				'</tpl>');
		headHtml += tpl.apply(data) + "</table>";
		return headHtml;
	},
	isNull : function(str) {
		if (str == null || str == '') {
			return true;
		} else {
			if (str.length == 0) {
				return true;
			} else {
				return false;
			}
		}
	},
	recordsToStrByKey : function(arrayChecked, id) {
		var strChecked = "";
		for ( var i = 0; i < arrayChecked.length; i++) {
			strChecked = strChecked + arrayChecked[i].get(id) + ',';
		}
		return strChecked.substring(0, strChecked.length - 1);
	},
	arrayToStr : function(array) {
		if (array == null) {
			return '';
		}
		var str = "";
		for ( var i = 0; i < array.length; i++) {
			str = array[i] + ',';
		}
		if (str == '') {
			return '';
		}
		return str.substring(0, str.length - 1);
	},
	objectListToStr : function(objectList, key) {
		if (objectList == null) {
			return "";
		}
		var resultStr = "";
		for ( var i = 0; i < objectList.length; i++) {
			var object = objectList[i];
			resultStr += object[key] + ",";
		}
		if (resultStr != "") {
			return resultStr.substring(0, resultStr.length - 1);
		}
		return resultStr;
	},
	openBrowser : function(params) {
		var form = document.getElementById('system_open_page_form');
		form.target = '_blank';
		form.action = 'webapp-desktop-page';
		if (params.vsj.substr(0, 3) != 'com') {
			form.action = params.vsj;
		}
		if (params.params) {
			params.params = Ext.decode(params.params);
		}
		document.getElementById('params').value = Ext.encode(params);
		form.submit();
	},
	getDate : function() {
		return new Date();
	},
	getDateStr : function(format) {
		if (format == null) {
			return Ext.util.Format.date(new Date(), 'Y年m月d日 H时i分s秒');
		} else {
			return Ext.util.Format.date(new Date(), format);
		}
	}
}

Array.prototype.inArray = function(e) {
	for ( var i = 0; i < this.length; i++) {
		if (this[i] == e)
			return true;
	}
	return false;
}
Array.prototype.toObject = function(key) {
	if (this) {
		var object = {};
		for ( var i = 0; i < this.length; i++) {
			object[this[i][key]] = this[i];
		}
		return object;
	} else {
		return {};
	}
}

var Doing = {
	timeout : null,
	myHidden : function() {
		document.getElementById('doing').style.visibility = "hidden";
		document.getElementById('loading').style.visibility = "hidden";
	},
	myHiddenFalse : function() {
		document.getElementById('doing').style.visibility = "visible";
		document.getElementById('loading').style.visibility = "visible";
	},
	hidden : function(as) {
		if (as) {
			if (Browser.type == "Firefox") {
				Doing.myHidden();
			} else {
				if (Doing.timeout) {
					clearTimeout(Doing.timeout);
				}
				Ext.defer(Doing.myHidden, 5);
			}
		} else {
			Doing.myHiddenFalse();
		}
	}
}

$importScript = function(url, loaded, error, charset) {
	var script = document.createElement("script");
	if (typeof charset == "string")
		script.charset = charset;
	script.onreadystatechange = function() {
		switch (this.readyState) {
		case "complete":
		case "loaded":
			if (typeof loaded == "function")
				loaded();
			if (script.parentNode)
				script.parentNode.removeChild(script);
			break;
		}
	}
	script.onload = function() {
		if (typeof loaded == "function")
			loaded();
		if (script.parentNode)
			script.parentNode.removeChild(script);
	}
	script.onerror = function() {
		if (typeof error == "function")
			error();
		if (script.parentNode)
			script.parentNode.removeChild(script);
	}

	script.type = "text/javascript";
	script.defer = "true";
	script.src = url;
	var parent = document.getElementsByTagName("HEAD")[0]
			|| document.documentElement;
	parent.insertBefore(script, parent.firstChild);
}

$import = function(classJsPathList, config) {
	if (config == null) {
		config = {};
	}
	try {
		var classJsPathStr = "";
		if (typeof classJsPathList == "string") {
			classJsPathStr = classJsPathList;
			if (static_var.loadClasss[classJsPathStr]) {
				return;
			} else {
				static_var.loadClasss[classJsPathStr] = true;
			}
		} else {
			for ( var i = 0; i < classJsPathList.length; i++) {
				if (!static_var.loadClasss[classJsPathStr]) {
					static_var.loadClasss[classJsPathList[i]] = true;
					classJsPathStr += classJsPathList[i] + ',';
				}
			}
			if (classJsPathStr == "") {
				return;
			}
			classJsPathStr = classJsPathStr
					.substr(0, classJsPathStr.length - 1);
		}
		var xmlhttp = Request.createXMLHTTP();

		if (config.type) {
			xmlhttp.open("GET", "system-class-" + type + "?" + "path="
					+ classJsPathStr, false);
		} else {
			xmlhttp.open("GET", "system-class-js?" + "path=" + classJsPathStr,
					false);
		}
		var isGlobalEval = true;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
				} else {
					isGlobalEval = false;
					Doing.hidden(true);
					try {
						ExtFrame.error(Ext.decode(xmlhttp.responseText).msg);
					} catch (ex) {
						ExtFrame.error('服务器异常！重新登录系统，或联系管理员.....');
					}
				}
			} else {
			}
		};

		xmlhttp.send(null);
		if (isGlobalEval) {
			Ext.globalEval(xmlhttp.responseText);
		}
	} catch (ex) {
		ExtFrame.error('js加载失败：' + ex.message);
	}
}
var Href = {
	download : function(name, path) {
		var form = document.getElementById('system_open_page_form');
		form.target = '';
		form.action = 'system-File-download';
		document.getElementById('params').value = "{name:'" + name
				+ "',filePath:'" + path + "'}";
		form.submit();
	}
}

var Cookie = {
	// cookie:function (name){
	// var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对
	// var cookie=new Object();
	// for (var i=0;i<cookieArray.length;i++){
	// var arr=cookieArray[i].split("="); //将名和值分开
	// if(arr[0]==name)return unescape(arr[1]); //如果是指定的cookie，则返回它的值
	// }
	// return "";
	// } ,
	del : function(name)// 删除cookie
	{
		document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
	},
	get : function(objName) {// 获取指定名称的cookie的值
		var arrStr = document.cookie.split("; ");
		for ( var i = 0; i < arrStr.length; i++) {
			var temp = arrStr[i].split("=");
			if (temp[0] == objName)
				return unescape(temp[1]);
		}
	},
	// addCookie: function (objName,objValue,objHours){ //添加cookie
	// var str = objName + "=" + escape(objValue);
	// if(objHours > 0){ //为时不设定过期时间，浏览器关闭时cookie自动消失
	// var date = new Date();
	// var ms = objHours*3600*1000;
	// date.setTime(date.getTime() + ms);
	// str += "; expires=" + date.toGMTString();
	// }
	// document.cookie = str;
	// },
	set : function(name, value)// 两个参数，一个是cookie的名子，一个是值
	{
		var Days = 30; // 此 cookie 将被保存 30 天
		var exp = new Date(); // new Date("December 31, 9998");
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires="
				+ exp.toGMTString();
	}
// ,
//
// getCookie: function (name)//取cookies函数
// {
// var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
// if(arr != null) return unescape(arr[2]); return null;
// },
// delCookie:function (name)//删除cookie
// {
// var exp = new Date();
// exp.setTime(exp.getTime() - 1);
// var cval=getCookie(name);
// if(cval!=null) document.cookie= name +
// "="+cval+";expires="+exp.toGMTString();
// }

}
