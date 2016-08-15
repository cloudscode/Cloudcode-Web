var ajaxframework = function (){};
$.ajaxframework = $.ajaxframework || {};
$.ajaxframework.widgetArray = ['button', 'text', 'date', 'textarea'];
$.ajaxframework.widgetVar = '';
for (var i in  $.ajaxframework.widgetArray) {
    if (i != "0") {
        $.ajaxframework.widgetVar += ',';
    }
    $.ajaxframework.widgetVar += '[ftype=' + $.ajaxframework.widgetArray[i] + ']';
}

Array.prototype.inArray = function(e) {
    for (var i in this) {
        if (this[i] == e) {
            return true;
        }
    }
    return false;
}
/**
 * 创建一个对话框
 * @param title
 * @param text
 * @param options
 * @returns
 */
ajaxframework.createDialog = function(title, text, options) {
    return $("<div class='dialog' title='" + title + "'><p>" + text + "</p></div>")
    .dialog(options);
};
ajaxframework.toString=function(o) {
	if (o == undefined) {
		return null;
	}
	var r = [];
	if (typeof o == "string") {
		if (!isNaN(o)) {
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
			for (var i in o) {
				var objTostr2Value = ajaxframework.toString(o[i]);
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
				r.push(ajaxframework.toString(o[i]));
			r = "[" + r.join() + "]";
		}
		return r;
	}
	return o.toString().replace(/\"\:/g, '":""');
};
ajaxframework.getHref = function(url, params) {
	if (params) {
		if (url.indexOf('?') > -1) {
			return url + '&' + $.param(params);
		} else {
			return url + '?' + $.param(params);
		}
	} else {
		return url;
	}
};

//JQuery扩展
/**
 * 序列化成对象
 */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
(function ($) {
    $.fn.iframeDialog = function (options) {
       // this.each(function () {
           // $(this).unbind('click').click(function (e) {
               // e.preventDefault();
                var $div = $("<div/>");
                var $iframe = $('<iframe class="iframeDialog" name="iframeDialog{rnd}" frameborder="0" width="100%" height="100%" marginwidth="0" hspace="0" vspace="0" scrolling="no" allowtransparency="true" />');
                if (!options.title) {
                    options.title = $(this).attr('title');
                }
                if (!options.url) {
                    url = $(this).attr('href');
                } else {
                    url = options.url;
                }
                if (!options.close) {
                    options.close = function () {
                        $(this).remove();
                    };
                }
                if (options.id) {
                    $div.attr("id", options.id);
                }
                if (options.scrolling) {
                    $iframe.attr("scrolling", options.scrolling);
                }
                $iframe.attr("src", url);
                $div.append($iframe).dialog(options);
            //});
       // });
                $(this).unbind('close').bind('close',function (e) {
                	//$(this).remove();
                	 $('.ui-dialog-titlebar-close',$($div).parent()).trigger('click');
                });
                
        return this;
    };
})(jQuery);
ajaxframework.postForm = function(url, params, newWindow){
	var form = $('<form>');
    form.attr('action', url);
    form.attr('method', 'POST');
    if(newWindow != null && newWindow != ""){form.attr('target', newWindow);
    }else{ 
    	form.attr('target', '_blank');
    }
    var addParam = function(paramName, paramValue){
        var input = $('<input type="hidden">');
        input.attr({ 'id':     paramName,
                     'name':   paramName,
                     'value':  paramValue });
        form.append(input);
    };
    // Params is an Array.
    if(params instanceof Array){
        for(var i=0; i<params.length; i++){
            addParam(i, params[i]);
        }
    }
    // Params is an Associative array or Object.
    if(params instanceof Object){
        for(var key in params){
            addParam(key, params[key]);
        }
    }
    // Submit the form, then remove it from the page
    form.appendTo(document.body);
    form.submit();
    form.remove();
};

$.ajaxframework.getTime = function() {
    if ($.ajaxframework.time) {
        $.ajaxframework.time++;
    } else {
        $.ajaxframework.time = new Date().getTime();
    }
    return $.ajaxframework.time;
}
$.ajaxframework.validation = {
    validation : function(form) {
        form.validationEngine({
                    scroll : false
                });
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
        if (config.min) {
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

        if (config.validateClass) {
            validate += config.validateClass + ','
        }

        if (validate) {
            validate = validate.substr(0, validate.length - 1);
            return 'validate[' + validate + ']';
        }
        return '';
    }
}
$.ajaxframework.getConfig = function(input) {
    var config = input.attr('config');
    if (config) {
        config = $.ajaxframework.toObject('{' + config + '}');
    } else {
        var configVar = input.attr('configVar');
        if (configVar) {
            var configVarObj = eval(configVar);
            var obj = {};
            for (var p in configVarObj) {
                obj[p] = configVarObj[p];
            }
            config = obj;
        }
    }
    if (config == null || config == '') {
        config = {};
    }
    config.ftype = input.attr("ftype");
    config = $.extend(config, input.data());
    return config;
}
$.ajaxframework.toObject = function(string) {
    try {
        var j = "(" + string + ")";
        return eval(j);
    } catch (e) {
        try {
            console.log(e);
        } catch (e) {
        }
    }
};
$.ajaxframework.value = {
    getAreaValue : function(form) {
        var spanList = [];
        form.find($.ajaxframework.widgetVar).each(function() {
                    spanList.push($(this));
                });
        var values = {};
        for (var i = 0; i < spanList.length; i++) {
            var span = spanList[i];
            var config = $.ajaxframework.getConfig(span);
            var value = $.ajaxframework.value.getValueBySpan(span, config);
            values[config.name] = value;
        }
        return values;
    },
    getValueBySpan : function(span, config) {
        if (config == null) {
            config = $.ajaxframework.getConfig(span);
        }
        var ftype = config.ftype;
        var value = '';
        if (span.getConfig('toView')) {
            return span.getConfig('value');
        }
        if ($.ajaxframework[ftype] && $.ajaxframework[ftype].getValue) {
            value = $.ajaxframework[ftype].getValue(span, config);
        }
        return value;
    },
    setAreaValue : function(form, values, formConfig) {
        form.find($.ajaxframework.widgetVar).each(function() {
            var config = $.ajaxframework.getConfig($(this));
            $.ajaxframework.value.setValueBySpan($(this), values[config.name], config);
            if (formConfig.view == true) {
                $(this).toView(config);
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
            config = $.ajaxframework.getConfig(span);
        }
        var ftype = config.ftype;
        span.setConfig({
                    value : value
                });
        if ($.ajaxframework[ftype] && $.ajaxframework[ftype].setValue) {
            $.ajaxframework[ftype].setValue(span, config, value);
        }
    }
}
$.ajaxframework.text = {
    render : function(span, config) {
        span.empty();
        var div = $('<div class="ui-field-contain"></div>');
        var id = $.ajaxframework.getTime();
        if (config.text) {
            var requiredHtml = '';
            if (config.required) {
                requiredHtml = '<font color=red>*</font>';
            }
            div.append('<label for="' + id + '" >' + config.text + requiredHtml
                    + '</label>');
        }
        var $input = null;
        if (config.password) {
            $input = $('<input  data-clear-btn="true" type="password" id="'
                    + id + '" />');
        } else {
            $input = $('<input type="text" class="form-control" id="' + id
                    + '" />');
        }
        if (config.placeholder) {
            $input.attr('placeholder', config.placeholder);
        }
        if (config.name) {
            $input.attr('name', config.name);
        }
        $input.data('span', span);
        if (config.onClick) {
            $input.click(function() {
                        config.onClick($(this).data('span'));
                    });
        }
        if (config.onBlur) {
            $input.blur(function() {
                        config.onBlur($(this).data('span'));
                    });
        }
        if (config.onFocus) {
            $input.focus(function() {
                        config.onFocus($(this).data('span'));
                    });
        }
        if (config.onDblClick) {
            $input.dblclick(function() {
                        config.onDblClick($(this).data('span'));
                    });
        }

        div.append($input);
        span.append(div);
        var validate = $.ajaxframework.validation.getValidate(config);
        $input.addClass(validate);

       // $input.textinput();
        if (config.suffix) {
            div
                    .find('input')
                    .next()
                    .after('<span class="ui-input-clear ui-btn ui-mini ui-corner-all" style="margin-right:20px">'
                            + config.suffix + '</span>');
        }
        span.setValue(config.value || '');
    },
    getValue : function(span, config) {
        var value = span.find('input').val();
        if (config.integer) {
            if ($.isNumeric(value)) {
                value = parseInt(value);
            } else {
                value = 0;
            }
        }
        return value;
    },
    setValue : function(span, config, value) {
        span.find('input').val(value);
    },
    disabled : function(span) {
        span.find('input').textinput('disable');
    }
}
$(function() {
            $.fn.render = function(configParams) {
                var config = $.ajaxframework.getConfig($(this));//{id:'id',name:'name',ftype:'text'};//
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
                var ftype = config.ftype;

                if ($.ajaxframework[ftype] && $.ajaxframework[ftype].render) {
                    $.ajaxframework[ftype].render($(this), config);
                }

                if (config.hidden == true) {
                    $(this).hide();
                }
                if (config.disabled) {
                    $(this).disabled();
                }
            }
            $.fn.renderAll = function() {
                $(this).find("[ftype]").each(function() {
                            if ($(this).attr('ftype') != 'asyncFile') {
                                $(this).render();
                            }
                        });
                $(this).find("[ftype=asyncFile]").each(function() {
                            $(this).render();
                        });
                $(this).render();
            }

            $.fn.setConfig = function(config) {
                for (var p in config) {
                    $(this).data(p, config[p]);
                }
            }

            $.fn.getConfig = function(key) {
                var config = null;
                if (key) {
                    config = $(this).data(key);
                } else {
                    config = $(this).data();
                }
                return config;
            }

            $.fn.getWidget = function() {
                var ftype = this.attr('ftype');
                var config = $.ajaxframework.getConfig($(this));
                var span = $(this);
                if ($.ajaxframework[ftype] && $.ajaxframework[ftype].getWidget) {
                    return $.ajaxframework[ftype].getWidget($(this), config);
                }
                var object = {
                    widget : span
                };
                return object;
            };

            $.fn.getValue = function() {
                var ftype = this.attr('ftype');
                if ($.ajaxframework.widgetArray.inArray(ftype)) {
                    return $.ajaxframework.value.getValueBySpan(this);
                } else {
                    return $.ajaxframework.value.getAreaValue(this);
                }
            };
            $.fn.setValue = function(value, params) {
                var ftype = this.attr('ftype');
                var config = $.ajaxframework.getConfig($(this));
                if (params) {
                    $.extend(config, params);
                }
                if ($.ajaxframework.widgetArray.inArray(ftype)) {
                    $.ajaxframework.value.setValueBySpan(this, value, config);
                    if (config.view == true) {
                        this.toView(config);
                    }
                } else {
                    $.ajaxframework.value.setAreaValue(this, value || {}, config);
                }
            };

            $.fn.disabled = function() {
                var ftype = this.attr('ftype');
                var config = $.ajaxframework.getConfig($(this));
                if (ftype && $.ajaxframework[ftype].disabled) {
                    $.ajaxframework[ftype].disabled($(this), config);
                }
            }

            $.fn.undisabled = function() {
                var ftype = this.attr('ftype');
                if (ftype && $.ajaxframework[ftype].undisabled) {
                    $.ajaxframework[ftype].undisabled($(this), $.ajaxframework
                                    .getConfig($(this)));
                }
            };

            $.fn.getValueData = function() {
                var ftype = this.attr('ftype');
                return $.ajaxframework[ftype].getValueData($(this), $.ajaxframework
                                .getConfig($(this)))
            }

            $("[ftype]").each(function() {
                        if ($(this).attr('ftype') != 'asyncFile') {
                            $(this).render('initRender');
                        }
                    });
            $("[ftype=asyncFile]").each(function() {
                        $(this).render('initRender');
                    });
            init();
        });
function init() {
}
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
								var result = $.ajaxframework.toObject(resulttext.responseText);
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
							var result = $.ajaxframework.toObject(resulttext);
							if(result && result.sessionstatus == 'no_authority'){
								Doing.hide();
								Dialog.alert(result.sessionstatusMsg);
								result.success=false;
								return;
							}else if(result && result.sessionstatus == 'timeout'){
								Doing.hide();
								$.ajaxframework.timeout();
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
								$.ajaxframework.log(e);
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
			document.getElementById('system_open_page_form_params').value = $.ajaxframework
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
			document.getElementById('system_open_page_file_form_params').value = $.ajaxframework
					.toString(param);
			form.submit();
		}
	}
$.ajaxframework = $.ajaxframework || {};
$.ajaxframework.params = {};
$.ajaxframework.browser = {
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
$.ajaxframework.getRootFrame = function() {
	if (window.parent && window.parent.set_height != null) {
		return $.ajaxframework.getRootFrame2(window.parent);
	} else {
		return window;
	}
};
$.ajaxframework.getRootFrame2 = function(param) {
	if (param != param.parent && param.parent.set_height != null) {
		return $.ajaxframework.getRootFrame2(param.parent);
	} else {
		return param;
	}
};
$.ajaxframework.getUUID = function(length) {
	if (length) {
		var uuid = 'UUID' + UUID.prototype.createUUID();
		return uuid.substr(uuid.length - length);
	} else {
		return 'UUID' + UUID.prototype.createUUID();
	}
}
$.ajaxframework.setFrameParams = function(iframeId, params) {
	$.ajaxframework.getRootFrame().$.ajaxframework.params[iframeId] = params;
}
$.ajaxframework.getIframeParams = function() {
	if (window.frameElement) {
		var params = $.ajaxframework.getRootFrame().$.ajaxframework.params[window.frameElement.id];
		// delete
		// $.ajaxframework.getRootFrame().$.ajaxframework.params[window.frameElement.id];
		return params || {};
	} else {
		return {};
	}
};
$.ajaxframework.iframeLoad = function(iframe, callback) {
	if (iframe.attachEvent) {
		iframe.attachEvent("onload", callback);
	} else {
		iframe.onload = callback;
	}
}
var Doing = {
		doingdivhtml : '<div id="doing" class="hh_overlay"></div>',
		doingdivhtml2 : '<div id="loading" class="hh_loading">'
				+ '<div class="loading-indicator">'
				+ '<img src="../resources/img/loading/loadingred.gif"'
				+ ' 	style="margin-right: 8px;margin-top: 3px;  float: left; vertical-align: top;" />&nbsp;&nbsp;'
				+ '<a href="javascript:Doing.hide();">关闭</a>' + '</div>' + '</div>',
		doingdivhtml3 : '<img src="../resources/img/loading/loadingred.gif" '
				+ ' 	style="margin-left: 18px;margin-top: 15px; float: left; vertical-align: top;" />',
		doingdiv : null,
		hide : function() {
			// var parneframe = $.ajaxframework.getRootFrame();
			var parneframe = window;
			parneframe.$("#doing").fadeOut(100);
			parneframe.$("#loading").fadeOut(100);
		},
		show : function() {
			// var parneframe = $.ajaxframework.getRootFrame();
			var parneframe = window;
			if (parneframe.Doing.doingdiv == null) {
				parneframe.Doing.doingdiv = $(Doing.doingdivhtml
						+ Doing.doingdivhtml2);
				parneframe.$("body").append(parneframe.Doing.doingdiv);
			}
			parneframe.$("#doing").fadeIn(200);
			parneframe.$("#loading").fadeIn(200);
		}
	}

	var Dialog = {
		msgdiv : null,
		msgdivtimeout : null,
		msgHide : function() {
			Dialog.msgdiv.fadeOut(500);
		},
		getMsgDiv : function(config) {
			return '<div bgdiv=true  class="hh_'
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
			var parneframe = $.ajaxframework.getRootFrame();
			if (parneframe.Dialog.msgdiv == null) {
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
					'$.ajaxframework.getRootFrame().Dialog.msgHide()', time);
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
			$.ajaxframework.getRootFrame().Dialog.open({
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
			$.ajaxframework.getRootFrame().Dialog.open({
				title : '错误',
				message : Dialog.getMsgDiv({
					type : 'red',
					msg : message
				})
			});
		},
		open : function(params) {
			var parneframe = $.ajaxframework.getRootFrame();
			params.params = params.params || {};
			params.params.parentPage = window;
			var dialog = new parneframe.DialogClass(params);
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
			var parneframe = $.ajaxframework.getRootFrame();
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
			var parneframe = $.ajaxframework.getRootFrame();
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

	var DialogClass = function(params) {
		this.width = 300;
		this.height = 160;
		this.id = $.ajaxframework.getUUID();
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
				$.ajaxframework.setFrameParams(id + 'iframe', dialog.params);
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

		if (this.width > $.ajaxframework.browser.getWidth()) {
			this.width = $.ajaxframework.browser.getWidth();
		}
		if (this.height > $.ajaxframework.browser.getHeight()) {
			this.height = $.ajaxframework.browser.getHeight();
		}

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
									width : $.ajaxframework.browser.getWidth() - 30,
									height : $.ajaxframework.browser.getHeight() - 30,
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
									if (width > $.ajaxframework.browser.getWidth()) {
										width = $.ajaxframework.browser.getWidth();
									}
									param.width = width;
								}
								if (height) {
									if (height > $.ajaxframework.browser.getHeight()) {
										height = $.ajaxframework.browser.getHeight();
									}
									param.height = height;
								}
								openthis.data('height', height);
								openthis.data('width', width);
								openthis.dialog(param);
							}
							$.ajaxframework.iframeLoad(iframe, iframeLoad);
						}
					}
				});
	}
	
	$.ajaxframework.setHeightMap = {

	}
	
	var HeightSet = {
			cResizeTimer : null,
			triggerCustomHeightSet : function() {
				var a = $.ajaxframework.browser.getHeight();
				try {
					set_height(a);
				} catch (e) {
				}
			}
		}
		function set_height(height) {
			$('[xtype=pagelist]').each(function(){
				var columnList = $.ajaxframework.pagelist.getRenderWidth($(this));
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
			for ( var p in $.ajaxframework.setHeightMap) {
				try {
					if ($.ajaxframework.setHeightMap[p]) {
						$.ajaxframework.setHeightMap[p].fun(height);
					}
				} catch (e) {
				}
			}
			setHeight(height);
		}
		function setHeight() {
		}