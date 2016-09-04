define(["jquery"], function($) {
	Array.prototype.inArray = function(eeee) {
		for (aaa = 0; aaa < this.length; aaa++) {
			if (this[aaa] == eeee) {
				return true;
			}
		}
		return false;
	};
	
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
			var params = $.cc.getRootFrame().$.cc.params[window.frameElement.id];
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
	
});
