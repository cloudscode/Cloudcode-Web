define(["jquery","Request"], function($,Request) {
	$.cc = $.cc || {};
	$.cc.combobox = {
			render : function(span, config) {
				span.empty();
				var name = config.name;
				var select = $('<select></select>');
				$.cc.fn.setAttr(span, select, config);
				select.addClass('cc_select');
				select.append('<option value ="">请选择</option>');
				var div = $('<div class="cc_select_div"></div>');
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
		};
	
	return $;
});	