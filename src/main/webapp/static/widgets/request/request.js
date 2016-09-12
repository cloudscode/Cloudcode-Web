define(["jquery","Dialog","Doing"], function($,Dialog,Doing) {
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
		};
	return Request;
	
});