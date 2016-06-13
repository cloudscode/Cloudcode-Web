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
      //  return this;
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
