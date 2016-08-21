$.cc = $.cc || {};

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
}

try {
	$.cc.property.classObject.themeContent = $.cc.property.classObject[theme].content;
	$.cc.property.classObject.themeHead = $.cc.property.classObject[theme].head;
} catch (e) {
	try {
		$.cc.property.classObject.themeContent = $.cc.property.classObject[$.cc
				.getRootFrame().theme].content;
		$.cc.property.classObject.themeHead = $.cc.property.classObject[$.cc
				.getRootFrame().theme].head;
	} catch (e) {
		try {
			$.cc.property.classObject.themeContent = $.cc.property.classObject['base'].content;
			$.cc.property.classObject.themeHead = $.cc.property.classObject['base'].head;
		} catch (e) {
		}
	}
}

$.cc.setHeightMap = {

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
}

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
}

$.cc.password = {
	render : function(span, config) {
		span.empty();
		var $input = $('<input type="password"  />');
		$.cc.fn.setAttr(span, $input, config);
		span.append($input);
		if (!config.value && config.defaultValue) {
			span.setValue(config.defaultValue);
		} else {
			span.setValue(config.value || '');
		}
		if (config.watermark) {
			$.cc.watermark($input, config.watermark);
		}
	},
	getValue : function(span, config) {
		if (span.find('input').data('watermark_value') == '1') {
			return '';
		}
		var value = span.find('input').val();
		return value;
	},
	setValue : function(span, config, value) {
		span.find('input').data('watermark_value', '0');
		span.find('input').val(value);
	},
	toView : function(span, config) {
		span.children().hide();
		span.append('<span type="text_span">' + ('******') + '</span>');
	}
}
$.cc.file = {
	render : function(span, config) {
		span.empty();
		var table = $('<table xtype="form">'
				+ '<tr type="view_remove">	<td xtype="label" style="text-align: left;" colspan="3"><span	xtype="button" config="text:\'添加\'"></span></td></tr>'
				+ '<tr>	<td style="text-align: center;background: '
				+ $.cc.property.classObject.themeContent
				+ ';" class="hh_tableForm_td"">名称</td>'
				+ '<td style="text-align: center;width:35px;background: '
				+ $.cc.property.classObject.themeContent
				+ '; " type="view_remove">操作</td></tr>' + '</table>');

		table.renderAll();
		table
				.find("tr")
				.eq(0)
				.find("button")
				.eq(0)
				.button({
					text : '添加'
				})
				.click(
						function() {
							Dialog
									.open({
										url : 'jsp-system-tools-file',
										width : 450,
										height : 170,
										params : {
											type : config.type || 'sys',
											callback : function(data) {
												var tr = $('<tr><td><a href="javascript:Request.download(\''
														+ data.id
														+ '\')">'
														+ data.text
														+ '</a></td><td type="view_remove"><a href="javascript:void(0)" >删除</a></td></tr>');
												var a = tr.find('a:last');
												a.click(function() {
													$(this).parent('td')
															.parent('tr')
															.remove();
												});
												delete data.success;

												var data1 = {
													id : data.id,
													text : data.text
												}

												tr.data('data', data1);
												table.append(tr);
												table.render();
											}
										}
									});
							return false;
						});
		span.append(table);
	},
	getValue : function(span, config) {
		var value = [];
		span.find('table').children().each(function() {
			$(this).children().each(function(index) {
				var tr = $(this);
				if (tr.find('a').length > 0) {
					value.push(tr.data('data'));
				}
			});
		});
		value = $.cc.toString(value);
		return value;
	},
	setValue : function(span, config, value) {
		if (value) {
			if (typeof value == "string") {
				value = $.cc.toObject(value);
			}
		}
		if (value && value.length > 0) {
			var table = span.find('table');
			for (var i = 0; i < value.length; i++) {
				var data = value[i];
				var tr = $('<tr><td><a href="javascript:Request.download(\''
						+ data.id
						+ '\')">'
						+ data.text
						+ '</a></td><td type="view_remove"><a href="javascript:void(0)">删除</a></td></tr>');
				tr.data('data', data);
				var a = tr.find('a:last');
				a.click(function() {
					$(this).parent('td').parent('tr').remove();
				});
				table.append(tr);
			}
			table.render();
		}
	},
	toView : function(span, config) {
		span.find('[type=view_remove]').remove();
	}
}

$.cc.ckeditor = {
	render : function(span, config) {
		span.empty();
		var $input = $('<textarea   />');
		$.cc.fn.setAttr(span, $input, config);
		if (config.name && config.hidden != true) {
			$.cc.property.execLoad[config.name] = function() {
				if ($('[name=' + config.name + ']').length > 0
						&& span.find('[type=text_span]').length == 0) {
					CKEDITOR.replace(config.name, {
						// toolbar : 'Basic',
						height : config.height || 500,
						toolbar : [ {
							name : 'document',
							items : config.toolbar
									|| [ 'Source', 'NewPage', 'Maximize',
											'Format', 'Font', 'FontSize',
											'Styles', 'Cut', 'Copy', 'Paste',
											'PasteText', 'PasteFromWord', '-',
											'Undo', 'Redo', 'TextColor',
											'BGColor', 'Find', 'Replace', '-',
											'SelectAll', '-', 'SpellChecker',
											'Scayt', 'Bold', 'Italic',
											'Underline', 'Strike', 'Subscript',
											'Superscript', '-', 'RemoveFormat',
											'NumberedList', 'BulletedList',
											'-', 'Outdent', 'Indent', '-',
											'Blockquote', 'CreateDiv', '-',
											'JustifyLeft', 'JustifyCenter',
											'JustifyRight', 'JustifyBlock',
											'-', 'Link', 'Unlink', 'Table',
											'HorizontalRule', 'Smiley',
											'SpecialChar' ]
						} ]
					// customConfig :
					// '/custom/ckeditor_config.js'
					});
					if (config.nheight) {
						CKEDITOR.instances[config.name].on("instanceReady",
								function() {
									$.cc
											.nheight(
													span.find('.cke_contents'),
													config.nheight,
													config.mheight || 0);
								});
					}
					if (config.bottom == 'hidden') {
						CKEDITOR.instances[config.name].on("instanceReady",
								function() {
									span.find('.cke_bottom').hide();
								});
					}
				}
			};
		}
		span.append($input);
	},
	getValue : function(span, config) {
		var value = '';
		if (CKEDITOR.instances[config.name]) {
			value = CKEDITOR.instances[config.name].getData();
		} else {
			value = span.find('textarea').val();
		}
		return value;
	},
	setValue : function(span, config, value) {
		if (CKEDITOR.instances[config.name]) {
			span.find('textarea').val(value);
			CKEDITOR.instances[config.name].setData(value);
		} else {
			span.find('textarea').val(value);
		}
	},
	toView : function(span, config) {
		if (CKEDITOR.instances[config.name]) {
			CKEDITOR.instances[config.name].on("instanceReady", function() {
				span.children().hide();
				span.append('<span type="text_span">'
						+ (span.data('text') || '') + '</span>');
			});
		} else {
			span.children().hide();
			span.append('<span type="text_span">' + (span.data('text') || '')
					+ '</span>');
		}
	}
}

$.cc.button = {
	render : function(field, config) {
		field.empty();
		var $input = $("<button>"
				+ (config.text == null ? '&nbsp;' : config.text) + "</button>");
		$.cc.fn.setAttr(field, $input, config);
		field.append($input);

		var menuId = config.menuId;
		if (menuId) {
			$('#' + menuId).hide();
			$('#' + menuId).css(
					{
						'border' : '1px solid '
								+ $.cc.property.classObject.themeContent,
						'position' : 'absolute'
					});
		}

		$input.button(
				{
					disabled : config.disabled,
					text : (!(config.textHidden == true))
							&& (config.text != null && config.text != ''),
					icons : {
						primary : config.icon
					}
				}).click(function() {
			if (config.onClick) {
				config.onClick(config.params);
			}
			if (menuId) {
				$(document).one("click", function() {
					$('#' + menuId).hide();
				});
				$('#' + menuId).show().position({
					my : "right top",
					at : "right bottom",
					of : this
				});
			}
			return false;
		});
		if (config.itype == 'delete') {
			// $input.addClass('hh_red_btn');
			$input.button({
				icons : {
					primary : "hh_img_delete"
				}
			});
		} else if (config.itype == 'add') {
			// $input.addClass('hh_blue_btn');
			$input.button({
				icons : {
					primary : "hh_img_add"
				}
			});
		} else if (config.itype == 'edit') {
			// $input.addClass('hh_yellow_btn');
			$input.button({
				icons : {
					primary : "hh_img_edit"
				}
			});
		} else if (config.itype == 'refresh') {
			// $input.addClass('hh_green_btn');
			$input.button({
				icons : {
					primary : "hh_img_refresh"
				}
			});
		} else if (config.itype == 'query') {
			$input.button({
				icons : {
					primary : "hh_img_query"
				}
			});
		} else if (config.itype == 'view') {
			$input.button({
				icons : {
					primary : "hh_img_view"
				}
			});
		} else if (config.itype == 'manager') {
			$input.button({
				icons : {
					primary : "hh_img_setting"
				}
			});
		} else if (config.itype == 'save') {
			$input.button({
				icons : {
					primary : "hh_img_save"
				}
			});
		} else if (config.itype == 'close') {
			$input.button({
				icons : {
					primary : "hh_img_delete"
				}
			});
		} else if (config.itype == 'submit') {
			$input.button({
				icons : {
					primary : "hh_img_green"
				}
			});
		}

	},
	disabled : function(span) {
		span.find('button').button({
			disabled : true
		});
	},
	undisabled : function(span) {
		span.find('button').button({
			disabled : false
		});
	}
}

$.cc.text = {
	render : function(span, config) {
		span.empty();
		var $input = $('<input type="text"  />');
		if (config.data && config.data.length > 0) {
			$input.autocomplete({
				autoFocus : true,
				source : config.data,
				minLength : 0
			});
			$input.bind("click", function() {
				var widget = $(this).autocomplete("widget");
				if (!widget.html()) {
					$(this).autocomplete("search", "");
					widget.css({
						'max-height' : '135px',
						'overflow-y' : 'auto',
						'overflow-x' : 'hidden'
					});
				}
				widget.show();
			});
		}
		if (config.blur) {
			$input.blur(function() {
				if ($.isFunction(config.blur)) {
					config.blur();
				} else {
					eval(config.blur + '()');
				}
			});
		}
		if (config.enter) {
			$input.keydown(function(e) {
				if (e.keyCode == 13) {
					if ($.isFunction(config.enter)) {
						config.enter();
					} else {
						eval(config.enter + '()');
					}
				}
			});
		}
		$.cc.fn.setAttr(span, $input, config);
		span.append($input);
		if (!config.value && config.defaultValue) {
			span.setValue(config.defaultValue);
		} else {
			span.setValue(config.value || '');
		}
		if (config.watermark) {
			$.cc.watermark($input, config.watermark);
		}

	},
	getValue : function(span, config) {
		if (span.find('input').data('watermark_value') == '1') {
			return '';
		}
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
		span.find('input').data('watermark_value', '0');
		span.find('input').val(value);
	}
}
$.cc.textarea = {
	render : function(span, config) {
		span.empty();
		var $input = $('<textarea   />');
		$.cc.fn.setAttr(span, $input, config);
		if (config.height) {
			$input.css('height', config.height);
		}
		if (config.blur) {
			$input.blur(function() {
				if ($.isFunction(config.blur)) {
					config.blur();
				} else {
					eval(config.blur + '()');
				}
			});
		}

		span.append($input);
	},
	getValue : function(span, config) {
		var value = span.find('textarea').val();
		return value;
	},
	setValue : function(span, config, value) {
		span.find('textarea').val(value);
	}
}

$.cc.radio = {
	render : function(span, config) {
		span.css('display', 'inline-block');
		span.empty();
		var name = config.name || $.cc.getUUID();
		var validate = $.cc.validation.getValidate(config);
		if (config.data) {
			var dataList = config.data;
			for (var i = 0; i < dataList.length; i++) {
				var data = dataList[i];

				var checked = config.defaultValue == data.id ? 'checked' : '';

				var input = $('<input ' + checked + ' type="radio" id="' + name
						+ '_' + i + '" name="' + name + '" value="' + data.id
						+ '" />');
				var label = $('<label for="' + name + '_' + i + '">'
						+ data.text + '</label>');
				input.click(function(result) {
					if (config.onChange) {
						config.onChange(result.currentTarget.value);
					}
				});
				if (validate) {
					input.addClass(validate + ' radio');
				}
				span.append(input).append(label).append('<span>&nbsp;</span>');
			}
		}
	},
	getValue : function(span, config) {
		var value = span.find('input:radio:checked').val();
		return value;
	},
	setValue : function(span, config, value) {
		if (config.onChange) {
			config.onChange(value);
		}
		span.find("input[type=radio]").prop("checked", false);
		var input = span.find("input[type=radio][value=" + value + "]");
		input.prop("checked", true);
		span.setConfig({
			text : input.next('label').html()
		});
	},
	disabled : function(span) {
		span.find('input').attr('disabled', true);
	},
	undisabled : function(span) {
		span.find('input').removeAttr('disabled');
	}
}

$.cc.checkbox = {
	render : function(span, config) {
		span.css('display', 'inline-block');
		span.empty();
		var name = config.name || $.cc.getUUID();
		var validate = $.cc.validation.getValidate(config);
		if (config.data) {
			var dataList = config.data;
			for (var i = 0; i < dataList.length; i++) {
				var data = dataList[i];
				var checked = '';
				if (config.defaultValue) {
					checked = config.defaultValue.split(',').inArray(data.id) ? 'checked'
							: '';
				}
				var input = $('<input ' + checked + ' type="checkbox" id="'
						+ name + '_' + i + '" name="' + name + '" value="'
						+ data.id + '" />');
				var label = $('<label for="' + name + '_' + i + '">'
						+ data.text + '</label>');
				if (validate) {
					input.addClass(validate + ' check');
				}
				span.append(input).append(label).append('<span>&nbsp;</span>');
			}
		}
	},
	getValue : function(span, config) {
		var value = '';
		span.find("input:checkbox:checked").each(function() {
			value += $(this).val() + ","
		})
		if (value != '') {
			value = value.substr(0, value.length - 1);
		}
		return value;
	},
	setValue : function(span, config, value) {
		span.find("input[type=checkbox]").prop("checked", false);
		if (value) {
			value += '';
			var values = value.split(',');
			var text = '';
			for (var i = 0; i < values.length; i++) {
				var input = span.find("input[type=checkbox][value=" + values[i]
						+ "]");
				input.prop("checked", true);
				text += input.next('label').html() + ',';
			}
			if (text != '') {
				text = text.substr(0, text.length - 1);
				span.setConfig({
					text : text
				});
			}
		}
	}
}

$.cc.check = {
	render : function(span, config) {
		span.css('display', 'inline-block');
		span.empty();
		var name = config.name;
		var id = $.cc.getUUID();
		var checked = config.defaultValue ? 'checked' : '';
		var input = $('<input ' + checked + ' id="' + id
				+ '" type="checkbox"  name="' + name + '" />' + '<label for="'
				+ id + '">' + (config.checktext || '') + '</label>');
		span.append(input);
	},
	getValue : function(span, config) {
		if (config.num) {
			return span.find("input:checkbox").prop('checked') ? 1 : 0;
		} else {
			return span.find("input:checkbox").prop('checked') ? true : false;
		}
	},
	setValue : function(span, config, value) {
		span.find("input[type=checkbox]").prop("checked", value ? true : false);
	},
	toView : function(span, config) {
		span.children().hide();
		span.append('<span type="text_span">' + (span.getValue() ? '是' : '否')
				+ '</span>');
	}
}

$.cc.date = {
	render : function(span, config) {
		span.empty();
		var $input = $('<input style="background:url(/cccommon/opensource/My97DatePicker/skin/datePicker.gif) no-repeat right;" type="text" >');
		var type = null;
		if (config.type == 'datetime') {
			type = 'yyyy-MM-dd HH:mm:ss';
		} else if (config.type == 'date') {
			type = 'yyyy-MM-dd';
		} else if (config.type) {
			type = config.type;
		} else {
			type = 'yyyy-MM-dd';
		}
		if (config.readonly != true) {
			$input.click(function() {
				var cfg = {
					dateFmt : type
				};
				WdatePicker(cfg);
			});
		}
		$.cc.fn.setAttr(span, $input, config);
		$input.addClass('hh_input');
		if (config.defaultValue) {
			$input.val(config.defaultValue);
		}
		span.append($input);
	},
	getValue : function(span, config) {
		var value = span.find('input').val();
		return value;
	},
	setValue : function(span, config, value) {
		if (value) {
			if (!$.cc.isDate(value)) {
				value = new Date(value);
				if (config.type == 'datetime') {
					value = $.cc.dateTimeToString(value);
				} else {
					value = $.cc.dateToString(value);
				}
			}
		}
		span.setConfig({
			value : value,
			text : value
		});
		span.find('input').val(value);
	},
	toView : function(span, config) {
		span.children().hide();
		span.append('<span type="text_span">' + (span.getValue() || '')
				+ '</span>');
	}
}

$.cc.tableitem = {
	render : function(span, config) {
		var render = function() {
			span.empty();
			var table = $('<table xtype="form"></table>');

			var required = config.required == true ? 'required :true' : '';

			var trrender = function(params) {
				params.tr.find('[xtype]').each(function() {
					var name = $(this).getConfig().name;
					var valuekey = $(this).attr('valuekey');
					if (name && (valuekey == null || valuekey == '')) {
						$(this).attr('valuekey', name)
					}
				});
			}

			// span.data('trrender',trrender);

			config.trhtml = config.trhtml
					|| '<table style="width:100%"><tr><td xtype="label">键：</td><td><span xtype="text" valuekey="id" config=" '
					+ required
					+ '"></span></td>'
					+ '<td xtype="label">值：</td><td><span xtype="text" valuekey="text" config=" '
					+ required + '"></span></td></tr></table>';
			var valueTable = $(config.trhtml);

			var td = $('<td width=25 style="padding:2px;"></td>');

			var a = $('<button itemtable="itemtableadd">添加</button>');
			a.button({
				icons : {
					primary : "ui-icon-plus"
				},
				text : false
			});

			a.click(function() {
				var valueTable = $(config.trhtml);
				var tr = $('<tr valueTr=true></tr>');
				tr.attr('itemtable', 'itemtabletr');
				table.append(tr);
				var td = $('<td width=25 style="padding:2px;"></td>');
				var a = $('<button>删除</button>');
				a.button({
					icons : {
						primary : "ui-icon-minus"
					},
					text : false
				})

				a.click(function() {
					tr.remove();
					if (config.onChange) {
						config.onChange();
					}
					return false;
				});
				td.append(a);
				var td1 = $('<td></td>');
				td1.append(valueTable);
				tr.append(td1);
				tr.append(td);

				tr.renderAll();
				trrender({
					tr : tr
				});
				table.render();
				// if (table.parents('[xtype=form]').validationEngine) {
				// table.parents('[xtype=form]').validationEngine();
				// }
				if (config.onChange) {
					config.onChange();
				}
				return false;
			});

			td.append(a);
			var td1 = $('<td></td>');
			td1.append(valueTable);
			var tr = $('<tr valueTr=true></tr>');
			tr.attr('itemtable', 'fristtr');
			tr.append(td1);
			tr.append(td);
			table.append(tr);
			table.renderAll();
			trrender({
				tr : tr
			});
			span.append(table);
		}
		if (config.formId && (config.trhtml == null || config.trhtml == '')) {
			Request.request('form-SysFormTree-findObjectById', {
				data : {
					id : config.formId
				}
			}, function(result) {
				config.trhtml = result.html;
				span.setConfig({
					trhtml : config.trhtml
				});
				render();
			});
		} else {
			render();
		}
	},
	getValue : function(span, config) {
		var value = [];
		span.find('[valueTr=true]').each(function() {
			var trValue = {};
			var as = false;
			$(this).find('[valuekey]').each(function(index) {
				var spanvalue = $(this).getValue();
				if (spanvalue) {
					as = true;
				}
				trValue[$(this).attr('valuekey')] = spanvalue;
			});
			if (as) {
				value.push(trValue);
			}
		});
		if (config.valueType != 'object') {
			value = $.cc.toString(value);
		}
		return value;
	},
	setValue : function(span, config, value) {
		if (value) {
			if (typeof value == "string") {
				value = $.cc.toObject(value);
			}
		}
		if (value && value.length > 0) {
			var tr = span.find('[itemtable=fristtr]');
			var valueitem = value[0];
			for ( var p in valueitem) {
				tr.find('[valuekey=' + p + ']').setValue(valueitem[p]);
			}
			for (var i = 1; i < value.length; i++) {
				tr.find('[itemtable=itemtableadd]').click();
				var lasttr = span.find('[itemtable=itemtabletr]:last');
				var valueitem = value[i];
				for ( var p in valueitem) {
					lasttr.find('[valuekey=' + p + ']').setValue(valueitem[p]);
				}
			}
		}

		if (config.onSetValue) {
			config.onSetValue();
		}
	},
	toView : function(span, config) {
		span.find('[type=view_remove]').remove();
	}
}

$.cc.selectTree = {
	render : function(span, config) {
		$.cc.fn.renderSelect(span, config, {
			openurl : '../systools/treeselect'
		});
		span.setValue(config.value || '');
	},
	getValue : function(span, config) {
		return $.cc.fn.getIdTextValue(span, config);
	},
	setValue : function(span, config, value) {
		$.cc.fn.setIdTextValue(span, config, value);
	}
}

$.cc.selectUser = {
	render : function(span, config) {
		var baseParams = {
			findTextAction : $.cc.property.findUserTextByIds
					|| 'usersystem-user-findUserTextByIds'
		};
		span.setConfig(baseParams);
		$.extend(config, baseParams);
		$.cc.fn.renderSelect(span, config, {
			openurl : 'jsp-usersystem-user-userselect',
			width : 700,
			height : 450
		});
	},
	getValue : function(span, config) {
		return $.cc.fn.getIdTextValue(span, config);
	},
	setValue : function(span, config, value) {
		$.cc.fn.setIdTextValue(span, config, value);
	},
	getValueData : function(span, config) {
		var value = span.find('input:hidden').val();
		var text = span.find('input:text').val();
		if (config.textarea) {
			text = span.find('textarea').val();
		}
		if (config.radio) {
			if (value) {
				return {
					id : value,
					text : text
				};
			} else {
				return null;
			}
		} else {
			if (value) {
				var returnList = [];
				var values = value.split(',');
				var texts = text.split(',');
				for (var i = 0; i < values.length; i++) {
					returnList.push({
						id : values[i],
						text : texts[i]
					});
				}
				return returnList;
			} else {
				return [];
			}
		}
	}
}

$.cc.selectOrg = {
	render : function(span, config) {

		var params = config.params || {};
		params.selectType = config.selectType;
		var baseParams = {
			tableName : 'US_ORGANIZATION',
			findTextAction : $.cc.property.findOrgTextByIds
					|| 'usersystem-Org-findOrgTextByIds',
			url : $.cc.property.godjQuery || 'usersystem-Org-queryOrgListByPid',
			params : params
		};
		span.setConfig(baseParams);
		$.extend(config, baseParams);
		$.cc.fn.renderSelect(span, config, {
			openurl : 'jsp-system-tools-treeselect'
		});
	},
	getValue : function(span, config) {
		return $.cc.fn.getIdTextValue(span, config);
	},
	setValue : function(span, config, value) {
		$.cc.fn.setIdTextValue(span, config, value);
	}
}

$.cc.selectPageList = {
	render : function(span, config) {
		if (!config.pageconfig) {
			config.pageconfig = {
				toolbarType : 'min',
				radio : config.radio,
				url : config.url,
				params : {},
				column : [ {
					name : 'text',
					text : '名称'
				} ]
			};
		}
		$.cc.fn.renderSelect(span, config, {
			openurl : 'jsp-system-tools-pagelistselect',
			width : config.openWidth || 600,
			height : 550
		});
	},
	getValue : function(span, config) {
		return $.cc.fn.getIdTextValue(span, config);
	},
	setValue : function(span, config, value) {
		$.cc.fn.setIdTextValue(span, config, value);
	}
}

$.cc.selectPic = {
	render : function(span, config) {
		var text = $('<input type="text" class="hh_input" readonly=true />');
		$.cc.fn.setAttr(span, text, config);
		var a = $('<button>选择</button>');
		a.button({
			icons : {
				primary : "ui-icon-plus"
			},
			text : false
		});
		var $table = $('<table style="font-size: 12;" width=100% cellspacing="0" cellpadding="0" ><tr><td></td><td width="23px"></td><td width="67px"></td></tr></table>');
		var params = {};
		params.span = span;
		params.textField = text;

		params.url = config.url;

		params.onChange = function() {
			$table.find("td").eq(1).html(
					'<img  style="margin-left:7px;width:20px;height:20px" src="'
							+ text.val() + '" />');
			if (config.onChange) {
				config.onChange();
			}
		}
		params.openurl = config.selectType == null || config.selectType == '' ? 'jsp-system-tools-picselect'
				: 'jsp-system-tools-bigpicselect';
		params.params = config.params || {};
		if (params.params.path == null || params.params.path == '') {
			params.params.path = '/cccommon/images';
		}
		params.config = config;
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
		a1.click(function() {
			text.val('');
			span.find("td").eq(1).html('');
			return false;
		});
		$table.find("td").eq(0).append(text);
		$table.find("td").eq(2).append(a1).append(a);
		span.append($table);
	},
	getValue : function(span, config) {
		var value = span.find('input').val();
		return value;
	},
	setValue : function(span, config, value) {
		span.find('input').val(value);
		if (value) {
			span.find("td").eq(1).html(
					'<img style="margin-left:7px;width:20px;height:20px" src="'
							+ value + '" />');
		} else {
			span.find("td").eq(1).html('');
		}
	},
	toView : function(span, config) {
		span.children().hide();
		span.append('<span type="text_span">'
				+ ('<img style="margin-left:7px;width:20px;height:20px" src="'
						+ span.getValue() + '" />') + '</span>');
	}
}

$.cc.selectInput = {
	render : function(span, config) {
		var text = $('<input type="text" class="hh_input" readonly=true />');
		$.cc.fn.setAttr(span, text, config);
		var a = $('<button>选择</button>');
		a.button({
			icons : {
				primary : "ui-icon-plus"
			},
			text : false
		})
		var $table = $('<table style="font-size: 12;padding:" width=100% cellspacing="0" cellpadding="0" ><tr><td></td><td  width="73px" style="text-align:right;"></td><tr></table>');
		var params = {};
		params.textField = text;
		params.span = span;
		params.url = config.url;
		params.height = config.win_height;
		params.width = config.win_width;
		params.onChange = function() {
			if (config.onChange) {
				config.onChange();
			}
		}
		params.openurl = config.openurl || '';
		params.params = config.params || {};
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
		a1.click(function() {
			text.val('');
			return false;
		});
		$table.find("td").eq(0).append(text);
		$table.find("td").eq(1).append(a1).append(a);
		span.append($table);
	},
	getValue : function(span, config) {
		var value = span.find('input').val();
		return value;
	},
	setValue : function(span, config, value) {
		span.find('input').val(value);
	}
}

$.cc.selectColor = {
	render : function(span, config) {
		var baseParams = {
			openurl : 'jsp-system-tools-colorselect',
			win_height : 580,
			win_width : 700
		};
		span.setConfig(baseParams);
		$.extend(config, baseParams);
		$.cc.selectInput.render(span, config);
	},
	getValue : function(span, config) {
		var value = span.find('input').val();
		return value;
	},
	setValue : function(span, config, value) {
		span.find('input').val(value);
		span.find('input').css({
			background : value
		});
	},
	toView : function(span, config) {
		span.children().hide();
		span.append('<span type="text_span" style="background:'
				+ span.data('text') + '">' + (span.data('text') || '')
				+ '</span>');
	}
}

$.cc.fileUpload = {
	render : function(span, config) {
		span.empty();
		var buttonid = $.cc.getUUID();
		var divid = $.cc.getUUID();
		var button = $('<button id="' + buttonid + '">上传</button>');
		var div = $('<div type=list id="' + divid + '"></div>');
		var serviceId = config.serviceId;

		span.append(div);
		span.append(button);

		$.cc.property.execLoad[config.name] = function() {
			var uploadify = button
					.uploadify({
						fileObjName : 'attachment',
						queueID : divid,
						removeCompleted : false,
						buttonText : '<div>上&nbsp;&nbsp;传</div>',
						buttonClass : 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only',
						'swf' : '/cccommon/opensource/jquery/uploadify/uploadify.swf',
						'uploader' : 'system-File-save',
						onFallback : function() {
							// 在初始化时检测不到浏览器有兼容性的flash版本时实触发
							alert('在初始化时检测不到浏览器有兼容性的flash版本');
						},
						// 每个文件即将上传前触发
						onUploadSuccess : function(file, data, b, c, d) {
							data = $.cc.toObject(data);
							var filediv = div.find('#' + file.id);

							filediv.data('data', {
								'id' : data.id,
								'text' : data.text,
								'fileSize' : data.fileSize
							});

							var fileSpan = filediv.find('.fileName');
							var text = fileSpan.text();
							text = '<a href="javascript:Request.download(\''
									+ data.id + '\')">' + text + '</a>';
							fileSpan.html(text);
							if (config.request) {
								filediv
										.find('.cancel')
										.find('a')
										.click(
												function() {
													Request
															.request(
																	'system-SystemFile-deleteByIds',
																	{
																		data : {
																			ids : data.id
																		}
																	});
												});
							}
						},
						onUploadError : function(file, errorCode, erorMsg,
								errorString) {
							var div2 = div.find('#' + file.id);
							var resutlText = div2.find('.data').text();
							div2.find('.data').text(' - 上传失败');
						},
						onUploadComplete : function(file) {
							var div2 = div.find('#' + file.id);
							var resutlText = div2.find('.data').text();
							if (resutlText == ' - Complete') {
								div2.find('.data').text(' - 完成');
							}
						},
						onSWFReady : function() {
							var config2 = span.getConfig();
							span.find('.uploadify').uploadify('settings',
									'formData',
									$.cc.fileUpload.getFormData1(config2));
							if (config2.toView) {
								span.find('.uploadify').hide();
							}
						}
					});
		}
	},
	getFormData1 : function(config) {
		config = config || {};
		return {
			type : config.type || 'sys',
			serviceId : config.serviceId || 'sys',
			parentServiceId : config.parentServiceId || 'sys'
		};
	},
	getValue : function(span, config) {
		if (config.request) {
			return config.serviceId;
		} else {
			var value = [];
			span.find('.uploadify-queue-item').each(function() {
				if ($(this).data('data')) {
					value.push($(this).data('data'));
				}
			});
			value = $.cc.toString(value);
			return value;
		}
	},
	setValueRequest : function(span, config, value) {
		var div = span.find('[type=list]');
		config.serviceId = value;
		span.data('serviceId', value);
		if (config.serviceId) {
			try {
				span.find('.uploadify').uploadify('settings', 'formData',
						this.getFormData1(config));
			} catch (e) {
			}
			Request.request('system-SystemFile-queryList', {
				data : {
					'serviceId' : config.serviceId,
					type : config.type || 'sys'
				},
				doing : false,
				callback : function(dataList) {
					$.cc.fileUpload.renderData(span, config, dataList);
				}
			});
		}
	},
	setValueService : function(span, config, value) {
		if (value) {
			if (typeof value == "string") {
				value = $.cc.toObject(value);
			}
		}
		value = value || [];
		this.renderData(span, config, value);
	},
	setValue : function(span, config, value) {
		if (config.request) {
			this.setValueRequest(span, config, value);
		} else {
			this.setValueService(span, config, value);
		}
	},
	renderData : function(span, config, dataList) {
		var div = span.find('[type=list]');
		for (var i = 0; i < dataList.length; i++) {
			var data = dataList[i];
			var text = data.text || '';
			var fileId = data.id || '';
			var fileSize = data.fileSize || '';

			fileSize = Math.round(fileSize / 1024);
			var suffix = 'KB';
			if (fileSize > 1000) {
				fileSize = Math.round(fileSize / 1000);
				suffix = 'MB';
			}
			var fileSizeParts = fileSize.toString().split('.');
			fileSize = fileSizeParts[0];
			if (fileSizeParts.length > 1) {
				fileSize += '.' + fileSizeParts[1].substr(0, 2);
			}
			fileSize += suffix;
			text = '<a href="javascript:Request.download(\'' + fileId + '\')">'
					+ text + '</a>';
			var itemdiv = $('<div id="'
					+ data.id
					+ '" class="uploadify-queue-item"><div class="cancel"><a fileId="'
					+ fileId
					+ '" href="javascript:void(0);">X</a></div>	<span class="fileName">'
					+ text + ' (' + fileSize
					+ ')</span><span class="data"> </span></div>');
			itemdiv.data('data', data);

			itemdiv.find('a').eq(0).click(function() {
				var fileA = $(this);
				var fileId = $(this).attr('fileId');
				if (config.request) {
					Request.request('system-SystemFile-deleteByIds', {
						data : {
							ids : fileId
						},
						callback : function(result) {
							fileA.parent().parent().remove();
						}
					});
				} else {
					fileA.parent().parent().remove();
				}
			});

			// <div class="uploadify-progress"> <div
			// class="uploadify-progress-bar" style="width:
			// 100%;"></div> </div>
			// .uploadify('cancel', 'SWFUpload_0_2')
			div.append(itemdiv);
		}
	},
	toView : function(span, config) {
		span.find('.uploadify').hide();
	}
}

$.cc.uploadpic = {
	render : function(span, config) {
		span.empty();
		var height = config.height || 150;
		var width = config.width || 130;
		var style = 'style="height:' + height + 'px;width:' + width + 'px;"';

		var table_style = 'style="height:' + (height + 10) + 'px;width:'
				+ width + 'px;"';

		var scuuid = $.cc.getUUID();
		var xzuuid = $.cc.getUUID();
		var qkuuid = $.cc.getUUID();

		var tableHtml = '<table xtype="form">'
				+ '<tr>	<td  style="height:'
				+ height
				+ 'px;align:text-center;" align=center><table xtype="list" '
				+ table_style
				+ ' ><tr><td type="imgpic"  style="text-align:center;padding:0px;" >空</td></tr></table></td></tr>'
				+ '<tr  type="view_remove">	<td style="text-align:center">'
				+ '<span id="' + scuuid
				+ '"	xtype="button" config="text:\'上传\'"></span>';
		if (config.path) {
			tableHtml += '<span id="' + xzuuid
					+ '"	 xtype="button" config="text:\'选择\'"></span>';
		}
		tableHtml += '<span id="' + qkuuid
				+ '"	 xtype="button" config="text:\'清空\'"></span>';
		tableHtml += '</td></tr>' + '</table>';
		var table = $(tableHtml);
		if (config.defaultValue) {
			span.attr('value', config.defaultValue);
			span.find('[type=imgpic]').empty();
			var path = value;
			if (value.indexOf(config.path) == -1) {
				path = 'system-File-download?params={id:\''
						+ value + '\'}';
			}
			span.find('[type=imgpic]').append(
					'<img  ' + style + ' src="' + path + '" />');
		}
		table.renderAll();
		table
				.find("#" + scuuid)
				.find("button")
				.button({
					text : '上传'
				})
				.click(
						function() {
							Dialog
									.open({
										url : 'jsp-system-tools-file?type=pic',
										width : 450,
										height : 170,
										params : {
											type : config.type || 'sysimg',
											callback : function(data) {
												span.attr('value', data.id);
												span.find('[type=imgpic]')
														.empty();
												span
														.find('[type=imgpic]')
														.append(
																'<img  '
																		+ style
																		+ ' src="system-File-download?params={id:\''
																		+ data.id
																		+ '\'}" />');
											}
										}
									});
							return false;
						});

		var params = {};
		params.span = span;
		params.onChange = function(data) {
			span.attr('value', data.id);
			span.find('[type=imgpic]').empty();
			span.find('[type=imgpic]').append(
					'<img  ' + style + ' src="' + data.id + '" />');
			if (config.onChange) {
				config.onChange();
			}
		}
		params.openurl = 'jsp-system-tools-bigpicselect';
		params.config = config;
		params.params = config.params || {};
		params.params.path = config.path;
		table.find("#" + xzuuid).find("button").button({
			text : '选择'
		}).click(function() {
			$.cc.fn.showSelectTree(params);
			return false;
		});
		table.find("#" + qkuuid).find("button").button({
			text : '清空'
		}).click(function() {
			span.removeAttr('value');
			span.find('[type=imgpic]').empty();
			span.find('[type=imgpic]').html('空');
			return false;
		});

		span.append(table);
	},
	getValue : function(span, config) {
		var value = span.attr('value');
		return value;
	},
	setValue : function(span, config, value) {
		if (value) {
			span.attr('value', value);
			var height = config.height || 150;
			var width = config.width || 130;
			var style = 'style="height:' + height + 'px;width:' + width
					+ 'px;"';
			span.find('[type=imgpic]').empty();
			var path = value;
			if (value.indexOf('.') == -1) {
				path = 'system-File-download?params={id:\''
						+ value + '\'}';
			}
			span.find('[type=imgpic]').append(
					'<img  ' + style + ' src="' + path + '" />');
		}
	},
	toView : function(span, config) {
		span.find('[type=view_remove]').remove();
	}
}

$.cc.combobox = {
	render : function(span, config) {
		span.empty();
		var name = config.name;
		var select = $('<select></select>');
		$.cc.fn.setAttr(span, select, config);
		select.addClass('hh_select');
		select.append('<option value ="">请选择</option>');
		var div = $('<div class="hh_select_div"></div>');
		div.append(select);
		span.append(div);
		if (config.data) {
			var dataList = config.data;
			for (var i = 0; i < dataList.length; i++) {
				var data = dataList[i];
				select.append('<option value ="' + (data.id) + '">' + data.text
						+ '</option>');
			}
		} else if (config.url) {
			Request.request(config.url, {
				data : config.params,
				defaultMsg : true,
				doing : false,
				callback : function(dataList) {
					for (var i = 0; i < dataList.length; i++) {
						var data = dataList[i];
						select.append('<option value ="' + (data.id) + '">'
								+ data.text + '</option>');
					}
					span.setValue(span.data('value'));
					if (span.data('toView')) {
						span.toView();
					}
				}
			});
		}
		select.change(function() {
			var id = $(this).children('option:selected').val();
			// var text = $(this).children('option:selected').text();
			if (config.onChange) {
				if ($.isFunction(config.onChange)) {
					config.onChange(id);
				} else {
					eval(config.onChange + '(id)');
				}
			}
		});
	},
	getValue : function(span, config) {
		var value = span.find('option:selected').val();
		return value;
	},
	setValue : function(span, config, value) {
		var comboboxfield = span.find("option[value=" + value + "]");
		comboboxfield.attr("selected", true);
		span.setConfig({
			text : comboboxfield.text() || ''
		});
		if (config.onSetValue && value && comboboxfield.length > 0) {
			if ($.isFunction(config.onSetValue)) {
				config.onSetValue(value);
			} else {
				eval(config.onSetValue + '(value)');
			}
		}
	}
}

$.cc.itemselect = {
	render : function(span, config) {
		span.empty();

		var $table = $('<table xtype="form"  width=100%  >'
				+ '<tr ><td  width=50% style="background: '
				+ $.cc.property.classObject.themeContent
				+ ';"  align=center>可选</td><td width=50   style="background: '
				+ $.cc.property.classObject.themeContent
				+ ';"  align=center>操作</td><td  width=50%   style="background: '
				+ $.cc.property.classObject.themeContent
				+ ';"  align=center>已选</td><td width=50   style="background: '
				+ $.cc.property.classObject.themeContent
				+ ';"  align=center>排序</td></tr>'
				+ '<tr><td  fromtd = true  style="padding:2px;"></td><td   btntd=true ></td><td  totd = true style="padding:2px;"></td><td   pxbtntd=true ></td></tr></table>');

		var name = config.name;
		var fromselect = $('<select multiple="multiple" style="height:200px;" ></select>');
		fromselect.addClass('hh_select');
		fromselect.css('width', '100%');
		if (config.data) {
			var dataList = config.data;
			for (var i = 0; i < dataList.length; i++) {
				var data = dataList[i];
				fromselect.append('<option value ="'
						+ (data.id == null ? data.text : data.id) + '">'
						+ data.text + '</option>');
			}
		}

		var tobutton = $('<div style="padding:2px 5px;"  xtype="button"	config="icon:\'ui-icon-arrowthick-1-e\'  ,text : \'选中\' , textHidden : true "></div>');
		tobutton.render();
		$table.find('[btntd=true]').append(tobutton);

		var frombutton = $('<div style="padding:2px 5px;" xtype="button"	config="icon:\'ui-icon-arrowthick-1-w\'  ,text : \'取消\' , textHidden : true "></div>');
		frombutton.render();
		$table.find('[btntd=true]').append(frombutton);

		var alltobutton = $('<div style="padding:2px 5px;" xtype="button"	config="icon:\'ui-icon-arrowthickstop-1-e\'  ,text : \'全选\' , textHidden : true "></div>');
		alltobutton.render();
		$table.find('[btntd=true]').append(alltobutton);

		var allfrombutton = $('<div style="padding:2px 5px;" xtype="button"	config="icon:\'ui-icon-arrowthickstop-1-w\'  ,text : \'全部取消\' , textHidden : true "></div>');
		allfrombutton.render();
		$table.find('[btntd=true]').append(allfrombutton);

		var aupbutton = $('<div style="padding:2px 5px;" xtype="button"	config="icon:\'ui-icon-arrowthickstop-1-n\'  ,text : \'置顶\' , textHidden : true "></div>');
		aupbutton.render();
		$table.find('[pxbtntd=true]').append(aupbutton);

		var upbutton = $('<div style="padding:2px 5px;" xtype="button"	config="icon:\'ui-icon-arrowthick-1-n\'  ,text : \'上移\' , textHidden : true "></div>');
		upbutton.render();
		$table.find('[pxbtntd=true]').append(upbutton);

		var downbutton = $('<div style="padding:2px 5px;" xtype="button"	config="icon:\'ui-icon-arrowthick-1-s\'  ,text : \'下移\' , textHidden : true "></div>');
		downbutton.render();
		$table.find('[pxbtntd=true]').append(downbutton);

		var adownbutton = $('<div style="padding:2px 5px;" xtype="button"	config="icon:\'ui-icon-arrowthickstop-1-s\'  ,text : \'置底\' , textHidden : true "></div>');
		adownbutton.render();
		$table.find('[pxbtntd=true]').append(adownbutton);

		aupbutton.find('button').click(
				function() {
					if (toselect.val() && toselect.val().length == 1) {
						var option = toselect.find('[value='
								+ toselect.val()[0] + ']');
						var val = option.val();
						var newoption = "<option value='" + val + "'>"
								+ option.text() + "</option>";
						// if (dir == "first") {
						toselect.prepend(newoption);
						// } else {
						// obj.append(option);
						// }
						option.remove();
					} else {
						Dialog.infomsg('请选中一条数据');
					}
				});
		adownbutton.find('button').click(
				function() {
					if (toselect.val() && toselect.val().length == 1) {
						var option = toselect.find('[value='
								+ toselect.val()[0] + ']');
						var val = option.val();
						var newoption = "<option value='" + val + "'>"
								+ option.text() + "</option>";
						toselect.append(newoption);
						option.remove();
					} else {
						Dialog.infomsg('请选中一条数据');
					}
				});

		upbutton.find('button').click(
				function() {
					if (toselect.val() && toselect.val().length == 1) {
						var option = toselect.find('[value='
								+ toselect.val()[0] + ']');
						var target = option.prev();
						if (target && target.length > 0) {
							var val1 = option.val();
							var text1 = option.text();
							var val2 = target.val();
							var text2 = target.text();
							option.val(val2).text(text2);
							target.val(val1).text(text1);
							toselect.val(val1);
						} else {
							Dialog.infomsg('已经是第一条了！');
						}
					} else {
						Dialog.infomsg('请选中一条数据');
					}
				});

		downbutton.find('button').click(
				function() {
					if (toselect.val() && toselect.val().length == 1) {
						var option = toselect.find('[value='
								+ toselect.val()[0] + ']');
						var target = option.next();
						if (target && target.length > 0) {
							var val1 = option.val();
							var text1 = option.text();
							var val2 = target.val();
							var text2 = target.text();
							option.val(val2).text(text2);
							target.val(val1).text(text1);
							toselect.val(val1);
						} else {
							Dialog.infomsg('已经是最后一条了！');
						}
					} else {
						Dialog.infomsg('请选中一条数据');
					}
				});

		alltobutton.find('button').click(function() {
			var options = fromselect.find('option');
			fromselect.empty();
			toselect.append(options);
		});

		allfrombutton.find('button').click(function() {
			var options = toselect.find('option');
			toselect.empty();
			fromselect.append(options);
		});

		tobutton.find('button').click(
				function() {
					if (fromselect.val()) {
						$.each(fromselect.val(), function(i, n) {
							var text = fromselect.find('[value=' + n + ']')
									.html();
							var html = "<option value='" + n + "'>" + text
									+ "</option>";
							toselect.append(html);
						});
						fromselect.find("option:selected").remove();
					}
				});

		frombutton.find('button').click(
				function() {
					if (toselect.val()) {
						$.each(toselect.val(), function(i, n) {
							var text = toselect.find('[value=' + n + ']')
									.html();
							var html = "<option value='" + n + "'>" + text
									+ "</option>";
							fromselect.append(html);
						});
						toselect.find("option:selected").remove();
					}
				});

		var toselect = $('<select multiple="multiple" style="height:200px;" ></select>');
		toselect.addClass('hh_select');
		toselect.css('width', '100%');

		fromselect.dblclick(function() {
			var option = fromselect.find('option:selected');
			var val = option.val();
			var html = "<option value='" + val + "'>" + option.text()
					+ "</option>";
			toselect.append(html);
			option.remove();
		});

		toselect.dblclick(function() {
			var option = toselect.find('option:selected');
			var val = option.val();
			var html = "<option value='" + val + "'>" + option.text()
					+ "</option>";
			fromselect.append(html);
			option.remove();
		});

		$table.find('[fromtd=true]').append(fromselect);

		$table.find('[totd=true]').append(toselect);

		$table.render();
		span.append($table);
	},
	getValue : function(span, config) {
		var value = '';
		span.find('[totd=true]').find('option').each(function() {
			value += $(this).val() + ',';
		});
		if (value != '') {
			value = value.substr(0, value.length - 1);
		}
		return value;
	},
	setValue : function(span, config, value) {
		if (value) {
			var fromselect = span.find('[fromtd=true]').find('select');
			var toselect = span.find('[totd=true]').find('select');
			var values = value.split(',');
			var text = '';
			$.each(values, function(i, data) {
				var option = fromselect.find("option[value=" + data + "]");
				text += option.text() + ',';
				var html = "<option value='" + option.val() + "'>"
						+ option.text() + "</option>";
				toselect.append(html);
				option.remove();
			});
			if (text) {
				span.setConfig({
					text : text.substr(0, text.length - 1)
				});
			}
		}
	}
}

$.cc.openbutton = {
	render : function(span, config) {
		var items = config.items;
		var maindiv = $('<span>	<button>更多</button>	</span>');
		var mainul = $('<ul></ul>');
		$.each(items, function(i, item) {
			mainul.append('<li><a href="javascript:void(0)">' + item.text
					+ '</a></li>');
		});
		span.append(maindiv);
		span.append(mainul);
		maindiv.find('button').button({
			icons : {
				primary : "ui-icon-triangle-1-s"
			}
		}).click(function() {
			var menu = $(this).parent().next().show().position({
				my : "left top",
				at : "left bottom",
				of : this
			});
			$(document).one("click", function() {
				menu.hide();
			});
			return false;
		}).parent().buttonset().next().hide().menu();
	},
	getValue : function(span, config) {

		return value;
	},
	setValue : function(span, config, value) {

	}
}

$.cc.toolbar = {
	render : function(toolbar, config) {
		if (config.type == 'head') {
			toolbar.addClass('ui-widget-header ui-corner-all');
			toolbar.css('padding', '2px');
			toolbar.css('border', '0px');
			// toolbar.css('border', 0);
			// toolbar.css('padding-top', '2px');
			// toolbar.css('display', 'inline-block');
			// toolbar.css('width', '100%');
			// toolbar.removeClass('ui-corner-all');
			// toolbar.css('border-right', 0);
		} else if (config.type == 'page') {
			toolbar.addClass('hh_toolbar_page');
		} else {
			toolbar.addClass('hh_toolbar');
		}
	},
	getValue : function(span, config) {

		return value;
	},
	setValue : function(span, config, value) {

	}
}

$.cc.list = {
	render : function(table, config) {
		var config = $.cc.getConfig(table);
		table.addClass("hh_tableForm");
		table.children().each(function() {
			$(this).children().each(function(index) {
				$(this).addClass('hh_tableForm_tr');
				$(this).children().each(function(index) {
					$(this).addClass('hh_tableForm_td');
				});
				var tr_config = $.cc.getConfig($(this));
				if (tr_config.title) {
					$(this).addClass('ui-widget-header');
					$(this).addClass('hh_tableForm_title');
				}
			});
		});

		table.css('width', table.attr('width'));
		table.css('height', table.attr('height'));

		if (config.xtype == 'list') {
			// 鼠标移入该行和鼠标移除该行的事件
			table
					.children()
					.each(
							function() {
								if ($(this).is('tbody')) {
									$(this)
											.children()
											.mouseover(
													function() {
														if (!$(this)
																.hasClass(
																		'ui-widget-header')) {
															$(this)
																	.addClass(
																			"hh_highlight");
														}
													})
											.mouseout(
													function() {
														if (!$(this)
																.hasClass(
																		'ui-widget-header')) {
															$(this)
																	.removeClass(
																			"hh_highlight");
														}
													})
											.bind(
													"click",
													function(tr) {
														if (!$(this)
																.hasClass(
																		'ui-widget-header')) {
															var target = $(tr.target);
															if (target.is('td')) {
																target = target
																		.find('input');
															}
															if ($(this)
																	.find(
																			'[tablewidget=checkbox]')
																	.attr(
																			'type') == 'checkbox'
																	&& target
																			.attr('tablewidget') == "checkbox") {
																if ($(this)
																		.hasClass(
																				'hh_selected')) {
																	$(this)
																			.find(
																					'[tablewidget=checkbox]')
																			.prop(
																					"checked",
																					false);
																	$(this)
																			.removeClass(
																					'hh_selected')
																} else {
																	$(this)
																			.find(
																					'[tablewidget=checkbox]')
																			.prop(
																					"checked",
																					true);
																	$(this)
																			.addClass(
																					"hh_selected");
																}
															} else {
																if ($(this)
																		.hasClass(
																				'hh_selected')) {
																	$(this)
																			.find(
																					'[tablewidget=checkbox]')
																			.prop(
																					"checked",
																					false);
																	$(this)
																			.removeClass(
																					'hh_selected')
																} else {
																	table
																			.find(
																					"tr")
																			.removeClass(
																					"hh_selected");
																	table
																			.find(
																					'[tablewidget=checkbox]')
																			.prop(
																					"checked",
																					false);
																	$(this)
																			.find(
																					'[tablewidget=checkbox]')
																			.prop(
																					"checked",
																					true);
																	$(this)
																			.addClass(
																					"hh_selected");
																}
															}
														}
													})
											.each(
													function(index) {
														if (index % 2 == 1
																&& $.cc
																		.getConfig($(this)).title != true) {
															$(this).addClass(
																	'hh_hui');
														}
													});
								}
							});
		} else if (config.xtype == 'form') {
			table.find('[xtype=label]').css({
				'background' : $.cc.property.classObject.themeContent,
				'text-align' : 'right',
				'width' : '90px'
			});
			table.find('[xtype=label]').each(
					function() {
						var label_td = $(this);
						var config = $.cc.getConfig(label_td);
						var width = config.width;
						if (width) {
							table.find('tr').each(
									function() {
										$(this).find('td').eq(label_td.index())
												.css('width', width);
									});
						}
					});
		}
	},
	getValue : function(span, config) {

		return value;
	},
	setValue : function(span, config, value) {

	}
}

$.cc.form = {
	render : function(span, config) {
		if (span.is('table')) {
			$.cc.list.render(span, config);
		}
	}
}

$.cc.tree = {
	render : function(tree, config) {
		tree.empty();

		var $input = $('<ul  class="ztree"></ul>');
		var div = $('<div></div>');
		var ztree = null;
		// $.cc.fn.setAttr(tree, $input, config);

		$input.attr('id', config.id || $.cc.getUUID());
		div.append($input);
		tree.append(div);

		$.cc.nheight(tree.children('div'), config.nheight);

		var otherParam = {
			node : 'root'
		};
		if (config.params) {
			$.extend(otherParam, config.params);
		}
		var data = config.data;

		var menuul = null;
		if (config.itemRightMenu && config.itemRightMenu.length > 0) {
			if (tree.data('itemRightMenudom')) {
				menuul = tree.data('itemRightMenudom');
			} else {
				menuul = $.cc.menu.renderMenu(config, config.itemRightMenu);
				tree.data('itemRightMenudom', menuul)
			}
			$('body').append(menuul);
			if (menuul) {
				menuul.hide();
				menuul.css({
					'border' : '1px solid '
							+ $.cc.property.classObject.themeContent,
					'position' : 'absolute',
					'z-index' : 9999999999
				});
			}
		}
		var menuul2 = null;
		if (config.rightMenu && config.rightMenu.length > 0) {
			if (tree.data('rightMenudom')) {
				menuul2 = tree.data('rightMenudom');
			} else {
				menuul2 = $.cc.menu.renderMenu(config, config.rightMenu);
				tree.data('rightMenudom', menuul2)
			}
			$('body').append(menuul2);
			if (menuul2) {
				menuul2.hide();
				menuul2.css({
					'border' : '1px solid '
							+ $.cc.property.classObject.themeContent,
					'position' : 'absolute',
					'z-index' : 9999999999
				});
			}

			div.contextmenu(function() {
				$(document).one("click", function() {
					menuul2.hide();
				});
				menuul2.show().css({
					left : event.clientX + 'px',
					top : event.clientY + 'px'
				});
				return false;
			});

		}

		var treeConfig = {
			view : {
				selectedMulti : false
			},
			edit : {
				enable : true,
				editNameSelectAll : true,
				showRemoveBtn : config.remove != null,
				showRenameBtn : config.edit != null
			},
			check : config.check,
			async : {
				enable : config.url == null ? false : true,
				url : config.url,
				otherParam : otherParam,
				autoParam : [ "id=node" ]
			},
			callback : {
				onAsyncSuccess : function(event, treeId, treeNode, msg) {
					var dataList = $.cc.toObject(msg);
					if (config.dataLoad) {
						config.dataLoad(treeNode);
					}
					// if(dataList==null || dataList.length==0){
					// treeNode.isParent=false;
					// $.cc.tree.updateNode(treeId, treeNode);
					// }
					$.cc.tree.expandNode(ztree, dataList);
				},
				beforeRemove : function(treeId, treeNode) {
					if (config.remove) {
						config.remove(treeNode);
					}
					return false;
				},
				beforeEditName : function(treeId, treeNode) {
					if (config.edit) {
						config.edit(treeNode);
					}
					return false;
				},
				onDblClick : function(event, treeId, treeNode) {
					if (config.onDblClick) {
						config.onDblClick(treeNode);
					}
				},
				onClick : function(event, treeId, treeNode) {
					if (config.onClick) {
						config.onClick(treeNode);
					}
				},
				onCheck : function(event, treeId, treeNode) {
					if (config.onCheck) {
						config.onCheck(treeNode);
					}
				},
				onRightClick : function(event, treeId, treeNode) {
					if (config.onRightClick
							|| (config.rightMenu && config.rightMenu.length > 0)) {
						if (!treeNode
								&& event.target.tagName.toLowerCase() != "button"
								&& $(event.target).parents("a").length == 0) {
							ztree.cancelSelectedNode();
							if (menuul2) {
								menuul2.data('data', treeNode);
								$(document).one("click", function() {
									menuul2.hide();
								});
								menuul2.show().css({
									left : event.clientX + 'px',
									top : event.clientY + 'px'
								});
							}
						} else if (treeNode && !treeNode.noR) {
							ztree.selectNode(treeNode);
							if (config.onRightClick) {
								config.onRightClick(treeNode);
							}
							if (menuul) {
								menuul.data('data', treeNode);
								$(document).one("click", function() {
									menuul.hide();
								});
								menuul.show().css({
									left : event.clientX + 'px',
									top : event.clientY + 'px'
								});
							}
						}
					}
				}
			}
		};

		ztree = $.fn.zTree.init($input, treeConfig, data);
	},
	doUp : function(params) {
		var treeid = params.treeid;
		var ztree = $.cc.tree.getTree(treeid);
		var selectNode = $.cc.tree.getSelectNode(treeid);
		if (!selectNode) {
			Dialog.infomsg('请选择一条数据！');
			return;
		}
		var pnode = selectNode.getPreNode();
		if (pnode != null) {
			Request.request(params.action, {
				data : {
					id1 : selectNode.id,
					id2 : pnode.id,
					order1 : selectNode.order,
					order2 : pnode.order
				}
			}, function(result) {
				if (result.success != false) {
					var tid = pnode.order;
					pnode.order = selectNode.order;
					selectNode.order = tid;
					$.cc.tree.updateNode(treeid, selectNode);
					$.cc.tree.updateNode(treeid, pnode);
					$.cc.tree.getTree(treeid).refresh();
					ztree.moveNode(pnode, selectNode, 'prev');
					ztree.selectNode(selectNode);
				}
			});
		} else {
			Dialog.infomsg('已经是第一条了');
		}
	},
	doDown : function(params) {
		var treeid = params.treeid;
		var ztree = $.cc.tree.getTree(treeid);
		var selectNode = $.cc.tree.getSelectNode(treeid);
		if (!selectNode) {
			Dialog.infomsg('请选择一条数据！');
			return;
		}
		var nnode = selectNode.getNextNode();
		if (nnode != null) {
			Request.request(params.action, {
				data : {
					id1 : selectNode.id,
					id2 : nnode.id,
					order1 : selectNode.order,
					order2 : nnode.order
				}
			}, function(result) {
				if (result.success != false) {
					var tid = nnode.order;
					nnode.order = selectNode.order;
					selectNode.order = tid;
					$.cc.tree.updateNode(treeid, selectNode);
					$.cc.tree.updateNode(treeid, nnode);
					$.cc.tree.getTree(treeid).refresh();
					ztree.moveNode(nnode, selectNode, 'next');
					ztree.selectNode(selectNode);
				}
			});
		} else {
			Dialog.infomsg('已经是最后一条了');
		}
	},
	updateNode : function(treeId, node) {
		$.cc.tree.getTree(treeId).updateNode(node);
	},
	getTree : function(treeId) {
		return $.fn.zTree.getZTreeObj(treeId);
	},
	getCheckedNodes : function(treeId) {
		return $.fn.zTree.getZTreeObj(treeId).getCheckedNodes();
	},
	refresh : function(treeId) {
		var zTree = $.fn.zTree.getZTreeObj(treeId);
		zTree.reAsyncChildNodes(null, "refresh");
	},
	loadData : function(treeId, config) {
		var params = config.params;
		var zTree = $.fn.zTree.getZTreeObj(treeId);
		$.extend(zTree.setting.async.otherParam, config.params);
		zTree.reAsyncChildNodes(null, "refresh");
	},
	getSelectNode : function(treeId) {
		var treeObj = $.fn.zTree.getZTreeObj(treeId);
		var nodes = treeObj.getSelectedNodes();
		if (nodes.length > 0) {
			return nodes[0];
		} else {
			return null;
		}
	},
	getSelectNodes : function(treeId) {
		var treeObj = $.fn.zTree.getZTreeObj(treeId);
		return treeObj.getSelectedNodes();
	},
	expandNode : function(ztree, dataList) {
		for (var i = 0; i < dataList.length; i++) {
			var data = dataList[i];
			if (data.expanded == 1) {
				ztree.expandNode(ztree.getNodeByParam("id", data.id, null));
				if (data.children) {
					$.cc.tree.expandNode(ztree, data.children);
				}
			}
		}
	},
	deleteData : function(params) {
		var pageid = params.pageid;
		var action = params.action;
		var id = params.id;
		var callback = params.callback;
		Dialog.confirm({
			message : '您确认要删除数据吗？',
			yes : function(result) {
				Request.request(action, {
					data : {
						ids : id
					},
					callback : function(result) {
						if (result.success != false) {
							$.cc.tree.refresh(pageid);
							if (callback) {
								callback(result);
							}
						}
					}
				});
			}
		});
	},
	getWidget : function(span) {
		var object = {
			widget : span
		};
		object.getSelectNode = function() {
			return $.cc.tree.getSelectNode(span.find('ul').attr('id'));
		};
		object.getSelectNodes = function() {
			return $.cc.tree.getSelectNodes(span.find('ul').attr('id'));
		};
		object.refresh = function() {
			return $.cc.tree.refresh(span.find('ul').attr('id'));
		};
		return object;
	}
}

$.cc.border_layout = {
	render : function(borderLayout, config) {
		borderLayout.height("100%");

		var west = {
			size : 200,
			spacing_closed : 22,
			togglerLength_closed : 140,
			togglerAlign_closed : "top",
			togglerContent_closed : "展<BR>开",
			togglerTip_closed : "展开",
			sliderTip : "展开",
			slideTrigger_open : "click",
			ondrag_start : function() {
				$('iframe').hide();
			},
			ondrag_end : function() {
				$('iframe').show();
			},
			togglerContent_open : "<"
		};

		var east = {
			size : 200,
			spacing_closed : 22,
			togglerLength_closed : 140,
			togglerAlign_closed : "top",
			togglerContent_closed : "展<BR>开",
			togglerTip_closed : "展开",
			sliderTip : "展开",
			slideTrigger_open : "click",
			ondrag_start : function() {
				$('iframe').hide();
			},
			ondrag_end : function() {
				$('iframe').show();
			},
			togglerContent_open : ">"
		};

		var north = {
			spacing_closed : 18,
			togglerLength_closed : 140,
			togglerContent_closed : "展开",
			togglerTip_closed : "展开",
			sliderTip : "展开",
			slideTrigger_open : "click",
			ondrag_start : function() {
				$('iframe').hide();
			},
			ondrag_end : function() {
				$('iframe').show();
			},
			togglerContent_open : "^"
		};
		var south = {
			spacing_closed : 18,
			togglerLength_closed : 140,
			togglerContent_closed : "展开",
			togglerTip_closed : "展开",
			sliderTip : "展开",
			slideTrigger_open : "click",
			ondrag_start : function() {
				$('iframe').hide();
			},
			ondrag_end : function() {
				$('iframe').show();
			},
			togglerContent_open : "v"
		};
		var center = {
			onresize : function(a, b) {
				var centerHeight = b[0].style.height.replace('px', '');
				if ($.cc.property.newpanel) {
					$.cc.property.newpanel.find('iframe').attr('height',
							centerHeight - 38);
				}
			}
		};

		var borderConfig = {};
		borderLayout
				.children()
				.each(
						function() {
							var layout_div = $(this);
							if (layout_div.is('div')) {
								var config = $.cc.getConfig(layout_div);
								if (layout_div.css('overflow') == null
										|| layout_div.css('overflow') == '') {
									layout_div.css({
										overflow : 'hidden'
									});
								}
								if (config.render == 'west') {
									layout_div.addClass("ui-layout-west");
									layout_div.css({
										padding : '0px'
									});
									west.size = config.width;
									if (layout_div.find('[xtype=accordion]').length > 0) {
										west.onresize = $.layout.callbacks.resizePaneAccordions;
									}
									if (config.open != null) {
										west.spacing_open = config.open;
									}
									if (config.resizable != null) {
										west.resizable = config.resizable;
									}
									if (config.spacing_open != null) {
										west.spacing_open = config.spacing_open;
									}
								} else if (config.render == 'south') {
									south.size = config.width;
									if (config.open != null) {
										south.spacing_open = config.open;
									}
									layout_div.addClass("ui-layout-south");
									if (config.resizable != null) {
										south.resizable = config.resizable;
									}
									if (config.spacing_open != null) {
										south.spacing_open = config.spacing_open;
									}
								} else if (config.render == 'north') {
									north.size = config.width;
									if (config.open != null) {
										north.spacing_open = config.open;
									}
									layout_div.addClass("ui-layout-north");
									if (config.resizable != null) {
										north.resizable = config.resizable;
									}
									if (config.spacing_open != null) {
										north.spacing_open = config.spacing_open;
									}

								} else if (config.render == 'east') {
									if (config.open != null) {
										east.spacing_open = config.open;
									}
									layout_div.addClass("ui-layout-east");
									east.size = config.width;
									if (config.resizable != null) {
										east.resizable = config.resizable;
									}
								} else if (config.render == 'center') {
									layout_div.addClass("ui-layout-center");
								} else {
									layout_div.addClass("ui-layout-center");
								}
								layout_div.css('padding', '0px');
							}
						});
		borderConfig.west = west;
		borderConfig.east = east;
		borderConfig.north = north;
		borderConfig.south = south;
		borderConfig.center = center;
		var myLayout = borderLayout.layout(borderConfig);
		borderLayout.find('[title=Close]').each(
				function() {
					$(this).css('background-color',
							$.cc.property.classObject.themeContent);
					$(this).parent('div').css('background-color',
							$.cc.property.classObject.themeHead);
				});
		// setTimeout(myLayout.resizeAll, 1000);
	},
	getValue : function(span, config) {

		return value;
	},
	setValue : function(span, config, value) {

	}
}

$.cc.accordion = {
	render : function(div, config) {
		div.find('div').css({
			padding : '0px'
		});
		div.accordion({
			activate : function(event, ui) {
				if (config.activate) {
					config.activate(ui, event);
				}
			},
			heightStyle : "fill"
		});
	},
	getValue : function(span, config) {

		return value;
	},
	setValue : function(span, config, value) {

	}
}

$.cc.tab = {
	render : function(div, config) {
		div.tabs({
			activate : function(event, ui) {
				$.cc.property.newpanel = $(ui.newPanel);
				$.cc.property.newpanel.find('iframe').attr('height',
						$.cc.property.newpanel.height() - 3);
				if (config.activate) {
					config.activate(ui, event);
				}
			},
			heightStyle : "fill"
		});
		div.delegate("span.ui-icon-close", "click", function() {
			var panelId = $(this).closest("li").remove().attr("aria-controls");
			$("#" + panelId).remove();
			div.tabs("refresh");
		});
		// div.css('padding', '1px');
		div.css('padding', '0px');
		div.css('border', '0px');
		div.children('div').css({
			'padding' : '0px'
		})
		$.cc.nheight(div, 2);
		div.children('div').each(function() {
			$.cc.nheight($(this), 42);
		});
	},
	getValue : function(span, config) {

		return value;
	},
	setValue : function(span, config, value) {

	}
}

$.cc.pagelist = {
	render : function(div, config, start, limit, page) {
		var table = $('<table xtype="list"   ></table>');
		var columnList = config.column;
		var head_tr_html = "<tr config='title:true'>";
		if (config.radio != true) {
			head_tr_html += "<th   width=30 style='padding:3px;text-align: center;'><input tablewidgethead='true'  tablewidget='checkbox' type='checkbox'  /></th>";
		} else {
			head_tr_html += "<th   width=30 style='padding:3px;text-align: center;'>&nbsp;</th>";
		}

		for (var i = 0; i < columnList.length; i++) {
			var column = columnList[i];
			var widthhtml = '';
			if (column.width) {
				widthhtml = "width=" + column.width + "px";
			}
			head_tr_html += '<th  style="text-align: center;" pagelisttd="' + column.name + '" '
					+ widthhtml + '>' + column.text + '</th>';
		}
		head_tr_html += "</tr>";
		var head_tr = $(head_tr_html);

		config.column = this.getRenderWidth(div);

		head_tr.find('[tablewidget=checkbox]').change(
				function(result) {
					var trs = head_tr.parent().parent().find("tr:gt(0)");
					var checked = $(result.currentTarget).prop('checked');
					if (checked) {
						head_tr.parent().parent()
								.find('[tablewidget=checkbox]').prop("checked",
										true);
						trs.addClass("hh_selected");
					} else {
						head_tr.parent().parent()
								.find('[tablewidget=checkbox]').prop("checked",
										false);
						trs.removeClass("hh_selected");
					}

					if (config.itemchange) {
						trs
								.each(function() {
									var itemclickparams = {
										checked : checked,
										rowdata : $.cc.pagelist
												.getRowDataByTr($(this)),
										clickDom : 'checkbox'
									};
									config.itemchange(itemclickparams);
								});
					}
				});
		if (config.title != false) {
			table.append(head_tr);
			table.render();
		}
		var resultData = {};
		start = start || 0;
		limit = limit || 10;
		page = page || 1;
		if (config.paging != false) {
			var toolbar_ms_span = $('<span tablewidget="ms">共 <font></font> 条  ,  显示：<font></font> 条  ;  每页显示：</span>');
			var toolbar_html = $('<div xtype="toolbar" config="type:\'head\'" style="text-align:right"></div>');
			var toolbar_sy_btn = $('<span tablewidget ="sy" xtype="button" config="icon:\'ui-icon-seek-start\'  ,text : \'首页\' , textHidden : true,disabled:true "></span>');
			var toolbar_syy_btn = $('<span tablewidget ="syy" xtype="button" config="icon:\'ui-icon-seek-prev\'  ,text : \'上一页\' , textHidden : true,disabled:true "></span>');
			var toolbar_page_input = $('<span  tablewidget ="page" xtype="text" 	config=" name:\'page\',defaultValue : 1 ,width: 50 ,style:\'vertical-align: middle;\',readonly:true "></span>');
			var toolbar_xyy_btn = $('<span  tablewidget ="xyy" xtype="button" config="icon:\'ui-icon-seek-next\'  ,text : \'下一页\' , textHidden : true "></span>');
			var toolbar_wy_btn = $('<span  tablewidget ="wy" xtype="button" config="icon:\'ui-icon-seek-end\'  ,text : \'尾页\' , textHidden : true "></span>');
			var toolbar_limit_input = $('<span tablewidget ="limit"  xtype="text"	config=" name:\'limit\',defaultValue : 10 , width: 50 ,style:\'vertical-align: middle;\'  "></span>');
			var toolbar_sx_btn = $('<span tablewidget ="sx" xtype="button"	config="icon:\'ui-icon-refresh\'  ,text : \'刷新\' , textHidden : true "></span>');
			var toolbar = $(toolbar_html);
			toolbar.append(toolbar_sy_btn);
			toolbar.append(toolbar_syy_btn);
			toolbar.append($('<span>&nbsp;</span>'));
			toolbar.append(toolbar_page_input);
			toolbar.append($('<span>&nbsp;</span>'));
			toolbar.append(toolbar_xyy_btn);
			toolbar.append(toolbar_wy_btn);
			toolbar.append($('<span>&nbsp;</span>'));
			toolbar.append(toolbar_ms_span);
			toolbar.append(toolbar_limit_input);
			toolbar.append($('<span>&nbsp;</span>'));
			toolbar.append(toolbar_sx_btn);
			toolbar.append($('<span>&nbsp;</span>'));

			var toolbarList = config.toolbarList || [];
			for (var i = 0; i < toolbarList.length; i++) {
				var dom = $(toolbarList[i]);
				toolbar.append(dom);
			}
			toolbar.renderAll();
			toolbar_sy_btn.find('button').eq(0).removeAttr('title');
			toolbar_syy_btn.find('button').eq(0).removeAttr('title');
			toolbar_xyy_btn.find('button').eq(0).removeAttr('title');
			toolbar_wy_btn.find('button').eq(0).removeAttr('title');
			toolbar_sx_btn.find('button').eq(0).removeAttr('title');

			var toolbar_ms_span_2 = $('<span tablewidget="ms">共 <font></font> 条  ,  显示：<font></font> 条  ;  每页显示：</span>');
			var toolbar_html_2 = $('<div xtype="toolbar" config="type:\'head\'" style="text-align:right"></div>');
			var toolbar_sy_btn_2 = $('<span tablewidget ="sy" xtype="button" config="icon:\'ui-icon-seek-start\'  ,text : \'首页\' , textHidden : true,disabled:true "></span>');
			var toolbar_syy_btn_2 = $('<span tablewidget ="syy" xtype="button" config="icon:\'ui-icon-seek-prev\'  ,text : \'上一页\' , textHidden : true,disabled:true "></span>');
			var toolbar_page_input_2 = $('<span  tablewidget ="page" xtype="text" 	config=" name:\'page\',defaultValue : 1 ,width: 50 ,style:\'vertical-align: middle;\',readonly:true "></span>');
			var toolbar_xyy_btn_2 = $('<span  tablewidget ="xyy" xtype="button" config="icon:\'ui-icon-seek-next\'  ,text : \'下一页\' , textHidden : true "></span>');
			var toolbar_wy_btn_2 = $('<span  tablewidget ="wy" xtype="button" config="icon:\'ui-icon-seek-end\'  ,text : \'尾页\' , textHidden : true "></span>');
			var toolbar_limit_input_2 = $('<span tablewidget ="limit"  xtype="text"	config=" name:\'limit\',defaultValue : 10 , width: 50 ,style:\'vertical-align: middle;\'  "></span>');
			var toolbar_sx_btn_2 = $('<span tablewidget ="sx" xtype="button"	config="icon:\'ui-icon-refresh\'  ,text : \'刷新\' , textHidden : true "></span>');
			var toolbar_2 = $(toolbar_html_2);
			toolbar_2.append(toolbar_sy_btn_2);
			toolbar_2.append(toolbar_syy_btn_2);
			toolbar_2.append($('<span>&nbsp;</span>'));
			toolbar_2.append(toolbar_page_input_2);
			toolbar_2.append($('<span>&nbsp;</span>'));
			toolbar_2.append(toolbar_xyy_btn_2);
			toolbar_2.append(toolbar_wy_btn_2);
			toolbar_2.append($('<span>&nbsp;</span>'));
			toolbar_2.append(toolbar_ms_span_2);
			toolbar_2.append(toolbar_limit_input_2);
			toolbar_2.append($('<span>&nbsp;</span>'));
			toolbar_2.append(toolbar_sx_btn_2);
			toolbar_2.append($('<span>&nbsp;</span>'));

			var toolbarList = config.toolbarList || [];
			for (var i = 0; i < toolbarList.length; i++) {
				var dom = $(toolbarList[i]);
				toolbar_2.append(dom);
			}
			toolbar_2.renderAll();
			toolbar_sy_btn_2.find('button').eq(0).removeAttr('title');
			toolbar_syy_btn_2.find('button').eq(0).removeAttr('title');
			toolbar_xyy_btn_2.find('button').eq(0).removeAttr('title');
			toolbar_wy_btn_2.find('button').eq(0).removeAttr('title');
			toolbar_sx_btn_2.find('button').eq(0).removeAttr('title');

			if (config.toolbarType == 'min') {
				toolbar_ms_span.hide();
				toolbar_limit_input.hide();

				toolbar_ms_span_2.hide();
				toolbar_limit_input_2.hide();
			}

			var syclick = function() {
				toolbar_page_input.setValue(1);
				toolbar_page_input_2.setValue(1);
				$.cc.pagelist.loadData($.extend(div.getConfig(), {
					start : toolbar_limit_input.getValue()
							* toolbar_page_input.getValue()
							- toolbar_limit_input.getValue(),
					limit : toolbar_limit_input.getValue(),
					page : toolbar_page_input.getValue()
				}));
			};

			var syyclick = function() {
				var value = parseInt(toolbar_page_input.getValue()) - 1;
				toolbar_page_input.setValue(value);
				toolbar_page_input_2.setValue(value);

				$.cc.pagelist.loadData($.extend(div.getConfig(), {
					start : toolbar_limit_input.getValue()
							* toolbar_page_input.getValue()
							- toolbar_limit_input.getValue(),
					limit : toolbar_limit_input.getValue(),
					page : toolbar_page_input.getValue()
				}));
			};

			var xyyclick = function() {
				var value = parseInt(toolbar_page_input.getValue()) + 1;
				toolbar_page_input.setValue(value);
				toolbar_page_input_2.setValue(value);
				$.cc.pagelist.loadData($.extend(div.getConfig(), {
					start : toolbar_limit_input.getValue()
							* toolbar_page_input.getValue()
							- toolbar_limit_input.getValue(),
					limit : toolbar_limit_input.getValue(),
					page : toolbar_page_input.getValue()
				}));
			};

			var wyclick = function() {
				var allcount = parseInt(toolbar_ms_span.find('font').eq(0)
						.html());
				var limit = toolbar_limit_input.getValue();
				var value = allcount % limit == 0 ? allcount / limit
						: parseInt(allcount / limit) + 1;
				toolbar_page_input.setValue(value);
				toolbar_page_input_2.setValue(value);
				$.cc.pagelist.loadData($.extend(div.getConfig(), {
					start : toolbar_limit_input.getValue()
							* toolbar_page_input.getValue()
							- toolbar_limit_input.getValue(),
					limit : toolbar_limit_input.getValue(),
					page : toolbar_page_input.getValue()
				}));
			};

			var sxclick = function() {
				$.cc.pagelist.loadData($.extend(div.getConfig(), {
					start : toolbar_limit_input.getValue()
							* toolbar_page_input.getValue()
							- toolbar_limit_input.getValue(),
					limit : toolbar_limit_input.getValue(),
					page : toolbar_page_input.getValue()
				}));
			};

			toolbar_limit_input_2.find('input').blur(function() {
				toolbar_limit_input.setValue(toolbar_limit_input_2.getValue());
			});

			toolbar_limit_input.find('input').blur(function() {
				toolbar_limit_input_2.setValue(toolbar_limit_input.getValue());
			});

			toolbar_sy_btn.find('button').eq(0).click(syclick);
			toolbar_syy_btn.find('button').eq(0).click(syyclick);
			toolbar_xyy_btn.find('button').eq(0).click(xyyclick);
			toolbar_wy_btn.find('button').eq(0).click(wyclick);
			toolbar_sx_btn.find('button').eq(0).click(sxclick);

			toolbar_sy_btn_2.find('button').eq(0).click(syclick);
			toolbar_syy_btn_2.find('button').eq(0).click(syyclick);
			toolbar_xyy_btn_2.find('button').eq(0).click(xyyclick);
			toolbar_wy_btn_2.find('button').eq(0).click(wyclick);
			toolbar_sx_btn_2.find('button').eq(0).click(sxclick);
		}
		div.append(toolbar);
		var tableDiv = $('<div pagelistmaindiv=true style="overflow:auto;"></div>');
		tableDiv.append(table);
		div.append(tableDiv);
		div.append(toolbar_2);
		$.cc.pagelist.loadData($.extend(config, {
			start : start,
			limit : limit,
			page : page
		}));
	},
	getRenderWidth : function(div) {
		var config = div.getConfig();
		var renderBaseWidth = config.renderBaseWidth;
		var basetableDiv = div.find('[pagelistmaindiv=true]');
		var basetableDivWidth = 0;
		if (basetableDiv.length == 0) {
			basetableDivWidth = $.cc.browser.getWidth();
		} else {
			basetableDivWidth = basetableDiv.width();
		}
		var columnList = config.column;
		var zznumberwidth = {};
		var nameWidth = {};
		var nameWidth2 = {};
		var baseWidth = 0;
		var nameWidth2Size = 0;
		for (var i = 0; i < columnList.length; i++) {
			var column = columnList[i];
			var width = null;
			if (renderBaseWidth == 1) {
				width = column.baseWidth;
			} else {
				width = column.width;
			}
			column.baseWidth = width;
			zznumberwidth[column.name] = width;
			var widthhtml = '';
			if (width) {
				if ((width + '').indexOf('%') > -1) {
					nameWidth[column.name] = width.replace('%', '') / 100;
				} else {
					widthhtml = "width=" + width + "px";
					baseWidth += width;
				}
			} else {
				nameWidth2[column.name] = null;
				nameWidth2Size++;
			}
		}
		var sywidth = basetableDivWidth - baseWidth - 30 - 100;
		var ddd = 0;
		for ( var p in nameWidth) {
			ddd += nameWidth[p];
			zznumberwidth[p] = sywidth * nameWidth[p];
		}
		var sybfb = 1 - ddd;
		var widthnull = sybfb / nameWidth2Size;
		for ( var p in nameWidth2) {
			zznumberwidth[p] = sywidth * widthnull;
		}
		for (var i = 0; i < columnList.length; i++) {
			var column = columnList[i];
			if (zznumberwidth[column.name]) {
				column.width = zznumberwidth[column.name];
			}
		}
		config.column = columnList;
		div.data('column', columnList);
		div.data('renderBaseWidth', 1);
		return columnList;
	},
	getPreRow : function(row) {
		if (row && row.tr) {
			var pretr = row.tr.prev('tr');
			if (pretr) {
				return $.cc.pagelist.getRowByTr(pretr);
			}
		}
	},
	getNextRow : function(row) {
		if (row && row.tr) {
			var pretr = row.tr.next('tr');
			if (pretr) {
				return $.cc.pagelist.getRowByTr(pretr);
			}
		}
	},
	up : function(row) {
		var pretr = row.tr.prev('tr');
		if (pretr) {
			var prow = $.cc.pagelist.getRowByTr(pretr);
			var prowtabletr = prow.tr;
			var rowtabletr = row.tr;

			prow = prow.data;
			row = row.data;

			var pid = prow.order;
			prow.order = row.order;
			row.order = pid;
			rowtabletr.data('data', row);
			prowtabletr.data('data', prow);
			rowtabletr.insertBefore(pretr);
		}
	},
	down : function(row) {
		var pretr = row.tr.next('tr');
		if (pretr) {
			var prow = $.cc.pagelist.getRowByTr(pretr);
			var prowtabletr = prow.tr;
			var rowtabletr = row.tr;
			prow = prow.data;
			row = row.data;
			;
			var pid = prow.order;
			prow.order = row.order;
			row.order = pid;
			rowtabletr.data('data', row);
			prowtabletr.data('data', prow);
			rowtabletr.insertAfter(pretr);
		}
	},
	doUp : function(params) {
		var selectNode = $.cc.pagelist.getSelectRow(params.pageid);
		var pnode = $.cc.pagelist.getPreRow(selectNode);
		if (pnode && pnode.data) {
			pnode = pnode.data;
			var data = selectNode.data;
			Request.request(params.action, {
				data : {
					id1 : data.id,
					id2 : pnode.id,
					order1 : data.order,
					order2 : pnode.order
				}
			}, function(result) {
				if (result.success != false) {
					$.cc.pagelist.up(selectNode);
				}
			});
		} else {
			Dialog.infomsg('已经是第一条了');
		}
	},
	doDown : function(params) {
		var selectNode = $.cc.pagelist.getSelectRow(params.pageid);
		var nnode = $.cc.pagelist.getNextRow(selectNode);

		if (nnode && nnode.data) {
			nnode = nnode.data;
			var data = selectNode.data;
			Request.request(params.action, {
				data : {
					id1 : data.id,
					id2 : nnode.id,
					order1 : data.order,
					order2 : nnode.order
				}
			}, function(result) {
				if (result.success != false) {
					$.cc.pagelist.down(selectNode);
				}
			});
		} else {
			Dialog.infomsg('已经是最后一条了');
		}
	},
	selectRow : function(tr, key, value) {
		if ($.cc.pagelist.getRowDataByTr(tr)[key] == value) {
			tr.find('[tablewidget=checkbox]').prop("checked", true);
			tr.addClass("hh_selected");
		}
	},
	getDataList : function(span) {
		// var rowsData = [];
		// span.find('[rowdata]').each(function() {
		// rowsData.push($.cc.pagelist.getRowDataByTr($(this)));
		// });
		// return rowsData;
		return span.data('data');
	},
	deleteData : function(params) {
		var pageid = params.pageid;
		var action = params.action;
		var data = params.data || {};
		$.cc.pagelist.callRows(pageid, function(rows) {
			Dialog.confirm({
				message : '您确认要删除数据吗？',
				yes : function(result) {
					var ids = $.cc.objsToStr(rows);
					data.ids = ids;
					Request.request(action, {
						data : data
					}, function(result) {
						if (result.success != false) {
							$("#" + pageid).loadData();
						}
					});
				}
			});
		});
	},
	callRow : function(pageId, callback) {
		var row = $.cc.pagelist.getSelectData(pageId);
		if (row == null) {
			Dialog.infomsg("请选择一条数据！");
			return;
		}
		if (callback) {
			callback(row);
		}
	},
	callRows : function(pageId, callback) {
		var rows = $.cc.pagelist.getSelectDataList(pageId);
		if (rows.length == 0) {
			Dialog.infomsg("请选择一条数据！");
			return;
		}
		if (callback) {
			callback(rows);
		}
	},
	getSelectData : function(pageId) {
		var row = $.cc.pagelist.getSelectRow(pageId);
		if (row) {
			return row.data;
		}
	},
	getSelectDataList : function(pageId) {
		var rowsData = [];
		var rows = $.cc.pagelist.getSelectRows(pageId);
		for (var i = 0; i < rows.length; i++) {
			rowsData.push(rows[i].data);
		}
		return rowsData;
	},
	getSelectRow : function(pageId) {
		var rows = $.cc.pagelist.getSelectRows(pageId);
		if (rows != null && rows.length > 0) {
			return rows[0];
		}
	},
	getSelectRows : function(pageId) {
		var rowsData = [];
		$('#' + pageId).find('input[tablewidget=checkbox]:checked').each(
				function() {
					if ($(this).attr('tablewidgethead') == null) {
						var tr = $(this).parent().parent();
						rowsData.push($.cc.pagelist.getRowByTr(tr));
					}
				});
		return rowsData;
	},
	getRowByTr : function(tr) {
		var data = tr.data('data');
		if ($.isEmptyObject(data)) {
			data = null;
		}
		return {
			data : data,
			tr : tr
		};
	},
	getRowDataByTr : function(tr) {
		var data = tr.data('data');
		if ($.isEmptyObject(data)) {
			data = null;
		}
		return data;
	},
	loadData : function(config) {
		// var id = param.id;
		// var div = param.div || $('#' + id);
		// div.setConfig(param);
		// var config = $.cc.getConfig(div);
		var div = config.widget;
		var table = div.find('table');

		var toolbar_sy_btn = div.find("[tablewidget=sy]");
		var toolbar_syy_btn = div.find("[tablewidget=syy]");
		var toolbar_page_input = div.find("[tablewidget=page]");
		var toolbar_xyy_btn = div.find("[tablewidget=xyy]");
		var toolbar_wy_btn = div.find("[tablewidget=wy]");
		var toolbar_limit_input = div.find("[tablewidget=limit]");
		var toolbar_sx_btn = div.find("[tablewidget=sx]");
		// var toolbar_start_input = div.find("[tablewidget=start]");
		var toolbar_ms_span = div.find("[tablewidget=ms]");

		var limit = config.limit || toolbar_limit_input.getValue();
		var page = config.page || toolbar_page_input.getValue();
		var start = config.start || limit * page - limit;

		table.children().each(function(index) {
			if ($(this).is('tbody')) {
				$(this).children().each(function(index) {
					var config = $.cc.getConfig($(this));
					if (config.title != true) {
						$(this).remove();
					}
				});
			}
		});

		var data = config.params || {};
		data.start = start || 0;
		data.limit = limit || 0;
		data.page = page || 0;

		var load = function(result, config) {
			var columnList = config.column;
			var items = result.items;
			if ($.isArray(result)) {
				items = result;
				div.find('[xtype=toolbar]').hide();
			}
			if (items) {
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var tr_html = "<tr rowdata='yes' >";
					tr_html += "<td  width=30 style='padding:3px;text-align: center;'><input tablewidget='checkbox'  type='"
							+ (config.radio ? "radio" : "checkbox")
							+ "'  /></td></tr>";
					var $tr = $(tr_html);
					for (var j = 0; j < columnList.length; j++) {
						var column = columnList[j];
						var value = item[column.name];
						value = $.cc.renderValue(value, column.render, item);
						var $td = $('<td pagelisttd="'
								+ column.name
								+ '" style="word-break: keep-all;white-space:nowrap;" ></td>');
						if (column.align) {
							$td.css('text-align', column.align);
						} else {
							$td.css('text-align', 'center');
						}
						var tdtitle = '';
						var $value = null;
						if (column.width) {
							$td.css('width', column.width + 'px');
							$value = $('<div  pagelisttd="'
									+ column.name
									+ '" style="width:'
									+ column.width
									+ 'px;text-align:center;vertical-align:middle;overflow:hidden;text-overflow:ellipsis;"></div>');
							if($.type(value)=='object'){
								$value.append(value);
							}else{
								$td.attr('title',value);
								if (column.valueType == 'text') {
									$value.text(value);
								} else {
									$value.html(value);
								}
							}
							var divdd = $('<div   pagelisttd="'
									+ column.name
									+ '" style="width:'
									+ column.width
									+ 'px;word-break: keep-all;white-space:nowrap;"></div>');
							divdd.append($value);
							$value=divdd;
						} else {
							$value = value;
						}
						$td.append($value);
						if(column.widthAuto){
							$td.css({
								'word-break':'','white-space':''
							});
							$td.find('[pagelisttd]').css({
								'word-break':'','white-space':''
							});
						}
						$tr.append($td);
					}

					$tr.data('data', item);
					if (config.itemclick) {
						$tr
								.click(function(tr) {
									var checked = !$(this).hasClass(
											'hh_selected');
									var target = $(tr.target);
									if (target.is('td')) {
										target = target.find('input');
									}
									var itemclickparams = {
										checked : checked,
										rowdata : $.cc.pagelist
												.getRowDataByTr($(this)),
										clickDom : target.attr('tablewidget')
									};
									config.itemclick(itemclickparams);
								});
					}

					if (config.itemchange) {
						$tr
								.click(function(tr) {
									var checked = !$(this).hasClass(
											'hh_selected');
									var target = $(tr.target);
									if (target.is('td')) {
										target = target.find('input');
									}
									var itemclickparams = {
										checked : checked,
										rowdata : $.cc.pagelist
												.getRowDataByTr($(this)),
										clickDom : target.attr('tablewidget')
									};
									config.itemchange(itemclickparams);
								});
					}
					try {
						table.append($tr);
					} catch (e) {
					}
				}
			}
			toolbar_ms_span.find('font').eq(0).html(result.total);
			toolbar_ms_span.find('font').eq(2).html(result.total);
			toolbar_ms_span.find('font').eq(1).html(
					(parseInt(start) + 1) + " - "
							+ (parseInt(start) + items.length));
			toolbar_ms_span.find('font').eq(3).html(
					(parseInt(start) + 1) + " - "
							+ (parseInt(start) + items.length));
			table.render();
			if (config.dataLoad) {
				config.dataLoad(items);
			}
			var page = parseInt(toolbar_page_input.getValue());
			if (page == 1) {
				toolbar_sy_btn.find('button').button({
					disabled : true
				});
				toolbar_syy_btn.find('button').button({
					disabled : true
				});
			} else {
				toolbar_sy_btn.find('button').button({
					disabled : false
				});
				toolbar_syy_btn.find('button').button({
					disabled : false
				});
			}
			var total = toolbar_ms_span.find('font').eq(0).html();
			var limit = toolbar_limit_input.getValue();
			if (Math.ceil(total / limit) == page) {
				toolbar_xyy_btn.find('button').button({
					disabled : true
				});
				toolbar_wy_btn.find('button').button({
					disabled : true
				});
			} else {
				toolbar_xyy_btn.find('button').button({
					disabled : false
				});
				toolbar_wy_btn.find('button').button({
					disabled : false
				});
				if (total == '0') {
					toolbar_xyy_btn.find('button').button({
						disabled : true
					});
					toolbar_wy_btn.find('button').button({
						disabled : true
					});
				}
			}
		}

		if (config.url) {
			Request.request(config.url, {
				data : data,
				defaultMsg : false
			}, function(result) {
				div.data('data', result.items);
				load(result, config);
			});
		} else if (config.data) {
			if ($.isArray(config.data)) {
				div.data('data', config.data);
				load({
					items : config.data,
					total : config.data.length
				}, config);
			} else {
				div.data('data', config.data.items);
				load(config.data, config);
			}
		}
	},
	getWidget : function(span) {
		var object = {
			widget : span
		};
		object.selectRow = function(key, value) {
			span.find('[rowdata]').each(function() {
				var tr = $(this);
				if (typeof value == "string") {
					$.cc.pagelist.selectRow(tr, key, value);
				} else if (typeof value == "object") {
					if (value.sort) {
						for (var i = 0; i < value.length; i++) {
							$.cc.pagelist.selectRow(tr, key, value[i][key]);
						}
					} else {
						$.cc.pagelist.selectRow(tr, key, value[key]);
					}
				}
			});
		};
		object.unSelectRow = function(key, value) {
			span
					.find('[rowdata]')
					.each(
							function() {
								if ($.cc.pagelist.getRowDataByTr($(this))[key] == value) {
									$(this).find('[tablewidget=checkbox]')
											.prop("checked", false);
									$(this).removeClass("hh_selected");
								}
							});
		};
		object.getDataList = function() {
			return $.cc.pagelist.getDataList(span);
		};
		object.updateRow = function(rowdata) {
			var dataList = $.cc.pagelist.getDataList(span);
			var resultDataList = [];
			for (var i = 0; i < dataList.length; i++) {
				var data = dataList[i];
				if (data.id == rowdata.id) {
					resultDataList.push(rowdata);
				} else {
					resultDataList.push(data);
				}
			}
			this.widget.loadData({
				data : resultDataList
			});
		};
		object.deleteRow = function(rowdata) {
			var dataList = $.cc.pagelist.getDataList(span);
			var resultDataList = [];
			for (var i = 0; i < dataList.length; i++) {
				var data = dataList[i];
				if (data.id != rowdata.id) {
					resultDataList.push(data);
				}
			}
			this.widget.loadData({
				data : resultDataList
			});
		};
		return object;
	}
}

$.cc.gridView = {
	render : function(span, config) {
		span.empty();
		var span_id = span.attr('id');
		if (span_id == null || span_id == '') {
			span_id = $.cc.getUUID();
			span.attr('id', span_id);
		}
		var ul = $('<ul style="list-style-type: none;	margin: 0;padding: 0;width: 100%;"></ul>');
		var dataList = config.data || [];
		var width = 80;
		var height = 80;
		if (config.width) {
			width = config.width;
			height = config.width;
		}
		if (config.height) {
			height = config.height;
		}
		var margin = 3;
		if (config.margin) {
			margin = config.margin;
		}

		var menuul = $.cc.menu.renderMenu(config, config.rightMenu);
		span.append(menuul);
		if (menuul) {
			menuul.hide();
			menuul.css({
				'border' : '1px solid '
						+ $.cc.property.classObject.themeContent,
				'position' : 'absolute',
				'z-index' : 9999999999
			});
		}

		for (var i = 0; i < dataList.length; i++) {
			var data = dataList[i];
			var img = data.img || '';
			var text = data.text;
			var basetext = data.text || '';

			if (config.notext == true) {
				text = '';
			} else {
				text = '<div style="width:'
						+ width
						+ 'px;word-break: keep-all;white-space:nowrap;"><div  style="width:'
						+ width
						+ 'px;text-align:center;vertical-align:middle;overflow:hidden;text-overflow:ellipsis;">'
						+ (text || '') + '</div></div>';
			}
			var id = data.id || '';
			var li = null;
			// if (img) {
			li = $('<li title="'
					+ basetext
					+ '" id="'
					+ id
					+ '" class="float_left" style="'
					+ 'border:1px solid '
					+ $.cc.property.classObject.themeContent
					+ ';cursor: pointer;margin: '
					+ margin
					+ 'px;padding: 1px;width: '
					+ width
					+ 'px;height: '
					+ (height + (config.notext == true ? 0 : 15))
					+ 'px;text-align: center;"><img style="margin-top:5px;width: '
					+ (width - 10) + 'px;height: ' + (height - 10)
					+ 'px;" src="' + img + '" />' + (text || '') + '</li>');

			li.contextmenu(function(event) {
				menuul.data('dom', $(this));
				$(document).one("click", function() {
					menuul.hide();
				});
				menuul.show().css({
					left : event.clientX + 'px',
					top : event.clientY + 'px'
				});
				return false;
			});

			li
					.mouseover(
							function() {
								$(this).addClass("ui-state-focus");
								$(this)
										.css(
												'border',
												'1px solid '
														+ $.cc.property.classObject.themeHead);
							})
					.mouseout(
							function() {
								$(this).removeClass("ui-state-focus");
								$(this)
										.css(
												'border',
												'1px solid '
														+ $.cc.property.classObject.themeContent);
							});

			// }
			li.data({
				data : data
			});
			li.click(function() {
				config.onClick($(this).data('data'));
			});
			// li.tooltip();
			ul.append(li);
		}
		ul.sortable({
			helper : 'clone',
			cursor : "move",
			items : "li", // 只是li可以拖动
			opacity : 0.6, // 拖动时，透明度为0.6
			revert : true, // 释放时，增加动画
			update : function(event, ui) { // 更新排序之后
				if (config.update) {
					var idList = $(this).sortable("toArray");
					var idstr = '';
					for (var i = 0; i < idList.length; i++) {
						idstr += idList[i] + ',';
					}
					if (idstr) {
						idstr = idstr.substr(0, idstr.length - 1);
					}
					config.update(idstr);
				}
			}
		});
		ul.disableSelection();
		var lis = ul.find('li').removeClass("ui-sortable-handle").addClass(
				"ui-widget-content");
		if (dataList.length == 0) {
			span
					.append('<div style="font-weight: bold; font-size: 25px;">没有要查看的数据...</div>');
		} else {
			span.append(ul);
		}
	}
}

$.cc.menu = {
	render : function(span, config) {
		span.empty();
		var dataList = config.data;
		var ul = this.renderMenu(config, dataList);
		span.append(ul);
		return ul;
	},
	renderMenu : function(config, dataList) {
		var ul = $('<ul menuul=true  style="border: 0px; margin: 5px;">');

		if (config.id) {
			ul.attr('id', config.id)
		}
		this.rendreUl(config, ul, dataList);

		ul.menu({
			position : {
				at : 'left bottom' // 子菜单位置
			}
		});
		return ul;
	},
	rendreUl : function(config, ul, dataList) {
		if (config.width) {
			ul.width(config.width);
		}
		if (dataList && dataList.length > 0) {
			for (var i = 0; i < dataList.length; i++) {
				var data = dataList[i];

				var img = '';

				if (data.img) {
					img = '<img width="16" height="16" src="' + data.img
							+ '"	style="">';
				}

				var rightText = data.rightText || '';

				var li = $('<li style="font-weight:normal;margin:2px;padding:3px;'
						+ 'border :  1px solid '
						+ $.cc.property.classObject.themeContent
						+ '">'
						+ '<table style="width:100%;">'
						+ '<tr><td style="text-align:left;"><table><tr><td>&nbsp;'
						+ img
						+ '</td>'
						+ '<td>'
						+ data.text
						+ '</td></tr></table></td>'
						+ '<td style="text-align:right;">'
						+ rightText
						+ '</td>' + '</tr>' + '</table>' + '	</li>');
				li
						.mouseover(
								function() {
									$(this)
											.css(
													'border',
													'1px solid '
															+ $.cc.property.classObject.themeHead);
								})
						.mouseout(
								function() {
									$(this)
											.css(
													'border',
													'1px solid '
															+ $.cc.property.classObject.themeContent);
								});
				if (config.imgSize) {
					li.find('img').width(config.imgSize);
					li.find('img').height(config.imgSize);
				}
				li.data('data', data);
				li.click(function() {
					var data3 = $(this).data('data');
					var data2 = {};
					$.extend(data2, data3);
					data2.content = ul.data('dom');
					if (data2.content) {
						$.extend(data2, data2.content.data('data'));
					}
					var data4 = ul.data('data');
					$.extend(data2, data4);
					data2.li = $(this);
					if (data3.onClick) {
						data3.onClick(data2);
					} else if (config.onClick) {
						config.onClick(data2);
					}
				});
				ul.append(li);
				if (data.children && data.children.length > 0) {
					var ul2 = $('<ul></ul>');
					ul2.css('z-index', 999999);
					li.append(ul2);
					this.rendreUl(config, ul2, data.children);
				}
			}
		}
	}
}

$.cc.rightMenu = {
	render : function(span, config) {
		var dataList = config.data;
		var menuul = $.cc.menu.renderMenu(config, dataList);
		span.append(menuul);
		if (menuul) {
			menuul.hide();
			menuul.css({
				'border' : '1px solid '
						+ $.cc.property.classObject.themeContent,
				'position' : 'absolute',
				'z-index' : 9999999999
			});
			$(document).contextmenu(function(event) {
				$(document).one("click", function() {
					menuul.hide();
				});
				menuul.show().css({
					left : event.clientX + 'px',
					top : event.clientY + 'px'
				});
				return false;
			});
		}
	}
}

$.cc.getUser = function() {
	return $.cc.getRootFrame().$.cc.property.loginUser;
};

$.cc.addTab = function(data) {
	$.cc.setFrameParams(data.id + 'iframe', data.params);
	$.cc.getRootFrame().addTab(data);
}

$.cc.timeout = function(config) {
	var params = {
		jump : false
	};
	if (config) {
		$.extend(params, config);
	}
	Dialog.open({
		title : '登录',
		width : 440,
		height : 400,
		url : contextPath + '/loginwin.jsp',
		params : params
	});
}

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
		var parneframe = $.cc.getRootFrame();
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
								if (width > $.cc.browser.getWidth()) {
									width = $.cc.browser.getWidth();
								}
								param.width = width;
							}
							if (height) {
								if (height > $.cc.browser.getHeight()) {
									height = $.cc.browser.getHeight();
								}
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

$(function() {
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

	$("[xtype]").each(function() {
		$(this).render('initRender');
	});
	/*
	 * $("[title]").each(function() {
	 * if(!$(this).hasClass('ui-layout-resizer')){ $(this).tooltip(); } });
	 */
	HeightSet.triggerCustomHeightSet();
	if (HeightSet.cResizeTimer) {
		clearTimeout(HeightSet.cResizeTimer)
	}
	HeightSet.cResizeTimer = setTimeout("HeightSet.triggerCustomHeightSet()",
			500);
	window.onresize = function() {
		if (HeightSet.cResizeTimer) {
			clearTimeout(HeightSet.cResizeTimer)
		}
		HeightSet.cResizeTimer = setTimeout(
				"HeightSet.triggerCustomHeightSet()", 100)
	};
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
